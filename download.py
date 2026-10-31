import os
import csv
import requests
import yt_dlp
import argparse
import json
import sys
import time
import subprocess
import shutil
from mutagen.flac import FLAC, Picture

# Set up argument parser
parser = argparse.ArgumentParser(description='Download music from a Spotify playlist CSV.')
parser.add_argument('csv_path', help='Path to the playlist CSV file')
parser.add_argument('--output', '-o', default='Downloads', help='Output folder for downloaded music')
parser.add_argument('--session', help='Session ID for reporting progress')

args = parser.parse_args()

csv_path = args.csv_path
output_folder = args.output
session_id = args.session
os.makedirs(output_folder, exist_ok=True)

def report_progress(status, message, track_index=None, total_tracks=None):
    # Print to local console
    print(f"[{status.upper()}] {message}")

    # Report to Web UI via server callback
    if session_id:
        try:
            requests.post('http://localhost:3001/report-progress', json={
                "sessionId": session_id,
                "status": status,
                "message": message,
                "track_index": track_index,
                "total_tracks": total_tracks
            }, timeout=5)
        except Exception as e:
            print(f"Failed to report progress to server: {e}")

report_progress("processing", "🚀 Starting download script...")

# Проверяем, существует ли CSV-файл
if not os.path.exists(csv_path):
    report_progress("error", f"❌ File not found at: {csv_path}")
    exit(1)

def find_or_setup_js_runtime():
    """Find or setup JavaScript runtime for yt-dlp"""
    # Try deno first (simpler to install via uvx)
    deno_path = shutil.which('deno')
    if deno_path:
        report_progress("info", f"✅ Found Deno at: {deno_path}")
        return 'deno'
    
    # Try Node.js
    node_path = shutil.which('node')
    if node_path:
        report_progress("info", f"✅ Found Node.js at: {node_path}")
        return 'node'
    
    report_progress("info", "📦 Attempting to setup Deno runtime for yt-dlp...")
    
    try:
        # Try installing deno via pip/uvx
        report_progress("info", "📥 Installing Deno via uvx...")
        result = subprocess.run(['uvx', 'deno', '--version'], capture_output=True, text=True, timeout=60)
        if result.returncode == 0:
            report_progress("info", "✅ Deno setup complete!")
            return 'deno'
    except Exception as e:
        report_progress("warning", f"⚠️ Could not setup Deno: {str(e)}")
    
    report_progress("warning", "⚠️ No JS runtime found or could be installed")
    report_progress("info", "ℹ️ Attempting download without JS runtime (may have limited format availability)")
    return None

# Setup JS runtime
js_runtime = find_or_setup_js_runtime()

# Базовые настройки yt-dlp
ffmpeg_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lib', 'ffmpegWin64', 'bin')
cookies_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cookies.txt')

ydl_opts = {
    'format': 'bestaudio[ext=m4a]/bestaudio/best',
    'ffmpeg_location': ffmpeg_path,
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'flac',
        'preferredquality': '0',
    }],
    'writethumbnail': True,
    'nocheckcertificate': True,
    'no_warnings': False,
    'quiet': False,
    'socket_timeout': 60,
    'extractor_args': {
        'youtube': {
            'skip': ['dash', 'hls'],
            'lang': ['en'],
        }
    },
    'http_headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
    },
    'retries': 5,
    'fragment_retries': 5,
    'skip_unavailable_fragments': True,
    'continuedl': True,
    'buffersize': 1024,
    'ratelimit': 2000000,  # 2MB/s limit to avoid triggering rate limits
}

# Load cookies if cookies.txt exists in project root
if os.path.exists(cookies_path):
    ydl_opts['cookiefile'] = cookies_path
    report_progress("info", f"📝 Cookies loaded from: {cookies_path}")
else:
    report_progress("info", "ℹ️ No cookies.txt found, continuing without cookies")

# Add JavaScript runtime if available
if js_runtime:
    ydl_opts['js_runtimes'] = [js_runtime]
    report_progress("info", f"🔧 Configured yt-dlp to use JS runtime: {js_runtime}")

# Читаем CSV файл
try:
    with open(csv_path, mode='r', encoding='utf-8') as file:
        reader = list(csv.DictReader(file))
        total_tracks = len(reader)
        
        for index, row in enumerate(reader):
            track_name = row.get("Track Name")
            artist_name = row.get("Artist Name(s)")
            
            if not track_name:
                continue
                
            report_progress("processing", f"🔍 Searching and downloading: {artist_name} — {track_name}...", index + 1, total_tracks)
            
            search_query = f"ytsearch1:{artist_name} - {track_name}"
            safe_title = "".join([c for c in track_name if c.isalpha() or c.isdigit() or c in ' -_()']).strip()
            ydl_opts['outtmpl'] = f'{output_folder}/{safe_title}.%(ext)s'
            
            max_retries = 3
            retry_count = 0
            success = False
            
            while retry_count < max_retries and not success:
                try:
                    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                        info = ydl.extract_info(search_query, download=True)
                        if 'entries' in info and len(info['entries']) > 0:
                            video_info = info['entries'][0]
                        else:
                            video_info = info
                    
                    success = True
                
                except Exception as e:
                    retry_count += 1
                    error_str = str(e)
                    
                    if retry_count < max_retries:
                        wait_time = (2 ** retry_count) * 3  # 6, 12, 24 seconds
                        report_progress("warning", f"⚠️ Retry {retry_count}/{max_retries-1} for {track_name}. Waiting {wait_time}s...", index + 1, total_tracks)
                        time.sleep(wait_time)
                    else:
                        report_progress("error", f"❌ Error downloading track {track_name}: {error_str[:150]}", index + 1, total_tracks)
                        success = False
                        break
            
            if not success:
                continue
            
            filename = f"{output_folder}/{safe_title}.flac"
            thumbnail_url = video_info.get("thumbnail")
            
            if os.path.exists(filename):
                audio = FLAC(filename)
                audio["title"] = track_name
                audio["artist"] = artist_name
                audio["album"] = row.get("Album Name", "")
                audio["date"] = row.get("Album Release Date", "")

                if thumbnail_url:
                    try:
                        img_data = requests.get(thumbnail_url, timeout=10).content
                        picture = Picture()
                        picture.data = img_data
                        picture.type = 3
                        picture.mime = "image/jpeg"
                        audio.add_picture(picture)
                    except Exception as img_err:
                        pass

                audio.save()
                report_progress("success", f"✅ Successfully saved: {safe_title}.flac", index + 1, total_tracks)
            else:
                report_progress("warning", f"⚠️ File {filename} not found after conversion.", index + 1, total_tracks)
            
            # Add delay between tracks to avoid rate limiting
            if index < total_tracks - 1:
                time.sleep(5)  # 5 seconds between tracks

    report_progress("completed", "🎉 All available tracks from the list have been processed!")

except Exception as e:
    report_progress("error", f"❌ Error reading CSV: {str(e)}")
    exit(1)

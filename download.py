import os
import csv
import requests
import yt_dlp
import argparse
import json
import sys
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

# Базовые настройки yt-dlp
ffmpeg_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lib', 'ffmpegWin64', 'bin')
ydl_opts = {
    'format': 'bestaudio/best',
    'ffmpeg_location': ffmpeg_path,
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'flac',
        'preferredquality': '0',
    }],
    'writethumbnail': True,
    'nocheckcertificate': True,
    'no_warnings': False, # Show warnings in terminal
    'quiet': False       # Show progress in terminal
}

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
            
            try:
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(search_query, download=True)
                    if 'entries' in info and len(info['entries']) > 0:
                        video_info = info['entries'][0]
                    else:
                        video_info = info
                
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

            except Exception as e:
                report_progress("error", f"❌ Error downloading track {track_name}: {str(e)}", index + 1, total_tracks)

    report_progress("completed", "🎉 All available tracks from the list have been processed!")

except Exception as e:
    report_progress("error", f"❌ Error reading CSV: {str(e)}")
    exit(1)

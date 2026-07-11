@echo off
echo Installing Python libraries...
pip install mutagen yt-dlp requests
echo.
echo Installing Node.js dependencies...
call yarn install
echo.
echo Done!
pause
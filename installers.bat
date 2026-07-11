@echo off
echo This script will attempt to install Python and Node.js using winget.
echo.
echo Installing Python 3...
winget install -e --id Python.Python.3
echo.
echo Installing Node.js LTS...
winget install -e --id OpenJS.NodeJS.LTS
echo.
echo If you just installed these, you MUST restart your computer or this terminal before running the app.
pause
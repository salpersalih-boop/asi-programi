@echo off
chcp 65001 >nul
title Planova
cd /d "%~dp0"
echo Planova baslatiliyor...
start "" cmd /c "timeout /t 2 >nul & start http://127.0.0.1:3000"
node server.js
echo.
echo Sunucu durdu. Kapatmak icin bir tusa bas.
pause >nul

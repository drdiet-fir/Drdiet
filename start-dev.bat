@echo off
SETLOCAL
SET "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "d:\work\Dr Diet\Dr Diet Website"
echo.
echo  Starting Dr Diet dev server...
echo  Open http://localhost:3000 in your browser
echo.
"C:\Program Files\nodejs\node.exe" node_modules\vite\bin\vite.js
pause

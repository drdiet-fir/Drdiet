$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
Set-Location "d:\work\Dr Diet\Dr Diet Website"
$out = & "C:\Program Files\nodejs\node.exe" "node_modules\vite\bin\vite.js" 2>&1
$out | Out-File "C:\Users\ASUS\AppData\Local\Temp\vite-result.txt"
Write-Host "Exit done"

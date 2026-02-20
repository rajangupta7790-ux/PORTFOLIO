#!/usr/bin/env powershell
# Flask Portfolio Server Launcher

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Rajan's Portfolio - Flask Server" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$pythonPath = "C:/Mr.Rajan  Projects/Rajan's Portfolio/.venv/Scripts/python.exe"
$appPath = "c:\Mr.Rajan  Projects\Rajan's Portfolio\portfolio\backend\app.py"
$backendDir = "c:\Mr.Rajan  Projects\Rajan's Portfolio\portfolio\backend"

Write-Host "Starting Flask development server..." -ForegroundColor Yellow
Write-Host "Backend directory: $backendDir" -ForegroundColor Gray
Write-Host ""

Set-Location $backendDir
& $pythonPath $appPath

Write-Host ""
Write-Host "Server stopped." -ForegroundColor Yellow

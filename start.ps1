# ============================================
# IEDC Innovation Hub - One-Click Startup Script
# Usage:  .\start.ps1       (or right-click > Run with PowerShell)
# ============================================

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting IEDC Innovation Hub..." -ForegroundColor Cyan

# 1. Start the backend (port 5000) in a new window
Write-Host "[1/2] Starting backend API on port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-NoProfile",
    "-Command", "Set-Location '$projectRoot\backend'; Write-Host '=== IEDC BACKEND ===' -ForegroundColor Cyan; npm run dev"
) -WindowStyle Normal

# Give the backend a moment to boot
Start-Sleep -Seconds 4

# 2. Start the frontend (port 5173) in a new window
Write-Host "[2/2] Starting frontend on port 5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-NoProfile",
    "-Command", "Set-Location '$projectRoot\frontend'; Write-Host '=== IEDC FRONTEND ===' -ForegroundColor Cyan; npm run dev"
) -WindowStyle Normal

Start-Sleep -Seconds 4

# 3. Verify both are up
$backendUp  = (Test-NetConnection localhost -Port 5000 -InformationLevel Quiet -WarningAction SilentlyContinue)
$frontendUp = (Test-NetConnection localhost -Port 5173 -InformationLevel Quiet -WarningAction SilentlyContinue)

Write-Host ""
if ($backendUp)  { Write-Host "  Backend  (http://localhost:5000)  - RUNNING"  -ForegroundColor Green }
else             { Write-Host "  Backend  - FAILED (check the backend window)" -ForegroundColor Red }
if ($frontendUp) { Write-Host "  Frontend (http://localhost:5173)  - RUNNING"  -ForegroundColor Green }
else             { Write-Host "  Frontend - FAILED (check the frontend window)" -ForegroundColor Red }

Write-Host ""
Write-Host "Open http://localhost:5173 in your browser. Keep both windows open!" -ForegroundColor Cyan

if ($frontendUp) { Start-Process "http://localhost:5173" }

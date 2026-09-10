# ============================================
# IEDC Innovation Hub - Stop Script
# Usage:  .\stop.ps1
# Kills the node processes on ports 5000 and 5173.
# ============================================

foreach ($port in 5000, 5173) {
    $connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if ($connections) {
        $connections | ForEach-Object {
            Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
        }
        Write-Host "Stopped process on port $port" -ForegroundColor Green
    } else {
        Write-Host "Nothing running on port $port" -ForegroundColor Yellow
    }
}

# Basely Bot - Set Telegram Webhook
# PowerShell Script untuk Configure Webhook di Vercel Deployment

param(
    [Parameter(Mandatory=$true)]
    [string]$DeploymentUrl
)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   BASELY BOT - SET TELEGRAM WEBHOOK" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$BOT_TOKEN = "8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA"
$WEBHOOK_URL = "$DeploymentUrl/api/bot"

Write-Host "Bot Token: $BOT_TOKEN" -ForegroundColor Yellow
Write-Host "Webhook URL: $WEBHOOK_URL" -ForegroundColor Yellow
Write-Host ""

# Confirm
$confirm = Read-Host "Set webhook to this URL? (Y/N)"
if ($confirm -ne 'Y' -and $confirm -ne 'y') {
    Write-Host "Aborted." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Setting webhook..." -ForegroundColor Green

# Set webhook
try {
    $body = @{
        url = $WEBHOOK_URL
    } | ConvertTo-Json

    $response = Invoke-RestMethod `
        -Uri "https://api.telegram.org/bot$BOT_TOKEN/setWebhook" `
        -Method Post `
        -Body $body `
        -ContentType "application/json"

    if ($response.ok) {
        Write-Host ""
        Write-Host "[SUCCESS] Webhook set successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Response:" -ForegroundColor Cyan
        Write-Host ($response | ConvertTo-Json -Depth 3)
    } else {
        Write-Host ""
        Write-Host "[ERROR] Failed to set webhook!" -ForegroundColor Red
        Write-Host "Response:" -ForegroundColor Yellow
        Write-Host ($response | ConvertTo-Json -Depth 3)
        exit 1
    }
} catch {
    Write-Host ""
    Write-Host "[ERROR] Request failed!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Verifying webhook..." -ForegroundColor Green

# Get webhook info
try {
    $webhookInfo = Invoke-RestMethod `
        -Uri "https://api.telegram.org/bot$BOT_TOKEN/getWebhookInfo" `
        -Method Get

    Write-Host ""
    Write-Host "Webhook Info:" -ForegroundColor Cyan
    Write-Host "  URL: $($webhookInfo.result.url)" -ForegroundColor White
    Write-Host "  Pending Updates: $($webhookInfo.result.pending_update_count)" -ForegroundColor White
    Write-Host "  Max Connections: $($webhookInfo.result.max_connections)" -ForegroundColor White

    if ($webhookInfo.result.last_error_date) {
        Write-Host "  Last Error: $($webhookInfo.result.last_error_message)" -ForegroundColor Yellow
    } else {
        Write-Host "  Status: No errors" -ForegroundColor Green
    }
} catch {
    Write-Host "[WARNING] Could not get webhook info" -ForegroundColor Yellow
    Write-Host $_.Exception.Message -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   WEBHOOK CONFIGURED!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Open Telegram" -ForegroundColor White
Write-Host "2. Search for your bot" -ForegroundColor White
Write-Host "3. Send /start" -ForegroundColor White
Write-Host "4. Bot should respond instantly!" -ForegroundColor White
Write-Host ""
Write-Host "Troubleshooting:" -ForegroundColor Yellow
Write-Host "- Check Vercel logs: vercel logs --follow" -ForegroundColor White
Write-Host "- Verify env vars in Vercel Dashboard" -ForegroundColor White
Write-Host "- Ensure deployment is successful" -ForegroundColor White
Write-Host ""

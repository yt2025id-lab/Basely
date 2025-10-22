# Quick Webhook Setup untuk Bot Telegram
# Script ini akan setup webhook untuk bot yang sudah deployed di Vercel

param(
    [string]$DeploymentUrl = ""
)

$BOT_TOKEN = "8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TELEGRAM BOT WEBHOOK SETUP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# If no URL provided, ask user
if ([string]::IsNullOrEmpty($DeploymentUrl)) {
    Write-Host "Enter your Vercel deployment URL" -ForegroundColor Yellow
    Write-Host "Example: https://basely-xyz.vercel.app" -ForegroundColor Gray
    Write-Host ""
    $DeploymentUrl = Read-Host "Deployment URL"
}

# Remove trailing slash if exists
$DeploymentUrl = $DeploymentUrl.TrimEnd('/')

# Construct webhook URL
$WEBHOOK_URL = "$DeploymentUrl/api/bot"

Write-Host ""
Write-Host "Configuration:" -ForegroundColor Cyan
Write-Host "  Bot Token: $($BOT_TOKEN.Substring(0, 20))..." -ForegroundColor White
Write-Host "  Webhook URL: $WEBHOOK_URL" -ForegroundColor White
Write-Host ""

# Confirm
$confirm = Read-Host "Continue? (Y/N)"
if ($confirm -ne 'Y' -and $confirm -ne 'y') {
    Write-Host "Cancelled." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 1: Deleting old webhook (if any)..." -ForegroundColor Yellow

try {
    $deleteResponse = Invoke-RestMethod `
        -Uri "https://api.telegram.org/bot$BOT_TOKEN/deleteWebhook" `
        -Method Post

    if ($deleteResponse.ok) {
        Write-Host "[OK] Old webhook deleted" -ForegroundColor Green
    }
} catch {
    Write-Host "[WARNING] Could not delete old webhook (maybe none exists)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 2: Setting new webhook..." -ForegroundColor Yellow

try {
    $body = @{
        url = $WEBHOOK_URL
        drop_pending_updates = $true
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
        Write-Host "  Result: $($response.result)" -ForegroundColor White
        Write-Host "  Description: $($response.description)" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "[ERROR] Failed to set webhook!" -ForegroundColor Red
        Write-Host "Error: $($response.description)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host ""
    Write-Host "[ERROR] Request failed!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Verifying webhook..." -ForegroundColor Yellow

Start-Sleep -Seconds 2

try {
    $webhookInfo = Invoke-RestMethod `
        -Uri "https://api.telegram.org/bot$BOT_TOKEN/getWebhookInfo" `
        -Method Get

    Write-Host ""
    Write-Host "Webhook Status:" -ForegroundColor Cyan
    Write-Host "  URL: $($webhookInfo.result.url)" -ForegroundColor White
    Write-Host "  Has Custom Certificate: $($webhookInfo.result.has_custom_certificate)" -ForegroundColor White
    Write-Host "  Pending Updates: $($webhookInfo.result.pending_update_count)" -ForegroundColor White
    Write-Host "  Max Connections: $($webhookInfo.result.max_connections)" -ForegroundColor White

    if ($webhookInfo.result.last_error_date) {
        Write-Host ""
        Write-Host "  [WARNING] Last Error:" -ForegroundColor Yellow
        Write-Host "    Date: $(Get-Date -UnixTimeSeconds $webhookInfo.result.last_error_date)" -ForegroundColor Yellow
        Write-Host "    Message: $($webhookInfo.result.last_error_message)" -ForegroundColor Yellow
    } else {
        Write-Host "  Status: No errors - Webhook is healthy!" -ForegroundColor Green
    }

    # Check if URL matches
    if ($webhookInfo.result.url -eq $WEBHOOK_URL) {
        Write-Host ""
        Write-Host "[SUCCESS] Webhook URL matches!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "[WARNING] Webhook URL mismatch!" -ForegroundColor Yellow
        Write-Host "  Expected: $WEBHOOK_URL" -ForegroundColor White
        Write-Host "  Got: $($webhookInfo.result.url)" -ForegroundColor White
    }
} catch {
    Write-Host "[WARNING] Could not get webhook info" -ForegroundColor Yellow
    Write-Host $_.Exception.Message -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 4: Testing webhook endpoint..." -ForegroundColor Yellow

try {
    $testResponse = Invoke-WebRequest `
        -Uri $WEBHOOK_URL `
        -Method Get `
        -TimeoutSec 10 `
        -ErrorAction Stop

    Write-Host "[OK] Webhook endpoint is accessible (Status: $($testResponse.StatusCode))" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 405) {
        Write-Host "[OK] Webhook endpoint exists (405 = Method Not Allowed for GET, which is expected)" -ForegroundColor Green
    } else {
        Write-Host "[WARNING] Could not reach webhook endpoint" -ForegroundColor Yellow
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Yellow
        Write-Host "  This might be OK if Vercel only accepts POST requests" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  WEBHOOK SETUP COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Open Telegram app" -ForegroundColor White
Write-Host "2. Search for your bot" -ForegroundColor White
Write-Host "3. Send: /start" -ForegroundColor White
Write-Host "4. Bot should respond instantly!" -ForegroundColor White
Write-Host ""
Write-Host "Troubleshooting if bot doesn't respond:" -ForegroundColor Yellow
Write-Host "- Check Vercel logs: vercel logs --follow" -ForegroundColor White
Write-Host "- Verify environment variables in Vercel Dashboard" -ForegroundColor White
Write-Host "- Ensure deployment is successful (Status: Ready)" -ForegroundColor White
Write-Host "- Re-run this script to reset webhook" -ForegroundColor White
Write-Host ""
Write-Host "Commands to check status:" -ForegroundColor Cyan
Write-Host "  Get webhook info:" -ForegroundColor White
Write-Host "    Invoke-RestMethod -Uri `"https://api.telegram.org/bot$BOT_TOKEN/getWebhookInfo`"" -ForegroundColor Gray
Write-Host ""
Write-Host "  Delete webhook (switch back to polling):" -ForegroundColor White
Write-Host "    Invoke-RestMethod -Uri `"https://api.telegram.org/bot$BOT_TOKEN/deleteWebhook`" -Method Post" -ForegroundColor Gray
Write-Host ""
Write-Host "Webhook URL: $WEBHOOK_URL" -ForegroundColor Cyan
Write-Host ""

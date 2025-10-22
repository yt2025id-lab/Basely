#!/bin/bash

# Set Telegram Bot Webhook
# Usage: ./set-webhook.sh <DEPLOYMENT_URL>
# Example: ./set-webhook.sh https://basely.vercel.app

BOT_TOKEN="8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA"

echo ""
echo "========================================"
echo "  TELEGRAM WEBHOOK SETUP"
echo "========================================"
echo ""

# Check if deployment URL provided
if [ -z "$1" ]; then
    echo "Usage: $0 <DEPLOYMENT_URL>"
    echo ""
    echo "Example:"
    echo "  $0 https://basely.vercel.app"
    echo "  $0 https://basely-xyz.vercel.app"
    echo ""
    exit 1
fi

DEPLOYMENT_URL="$1"
# Remove trailing slash
DEPLOYMENT_URL="${DEPLOYMENT_URL%/}"

WEBHOOK_URL="$DEPLOYMENT_URL/api/bot"

echo "Configuration:"
echo "  Bot Token: ${BOT_TOKEN:0:20}..."
echo "  Webhook URL: $WEBHOOK_URL"
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "Step 1: Deleting old webhook..."

delete_response=$(curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/deleteWebhook")
delete_ok=$(echo "$delete_response" | grep -o '"ok":true')

if [ ! -z "$delete_ok" ]; then
    echo "[OK] Old webhook deleted"
else
    echo "[WARNING] Could not delete old webhook (maybe none exists)"
fi

echo ""
echo "Step 2: Setting new webhook..."

response=$(curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/setWebhook" \
    -H "Content-Type: application/json" \
    -d "{\"url\": \"$WEBHOOK_URL\", \"drop_pending_updates\": true}")

# Check if successful
ok=$(echo "$response" | grep -o '"ok":true')

if [ ! -z "$ok" ]; then
    echo "[SUCCESS] Webhook set successfully!"
    echo ""
    echo "Response:"
    if command -v jq &> /dev/null; then
        echo "$response" | jq '.'
    else
        echo "$response"
    fi
else
    echo "[ERROR] Failed to set webhook!"
    echo "Response:"
    echo "$response"
    exit 1
fi

echo ""
echo "Step 3: Verifying webhook..."
sleep 2

info_response=$(curl -s "https://api.telegram.org/bot$BOT_TOKEN/getWebhookInfo")

echo ""
echo "Webhook Status:"
if command -v jq &> /dev/null; then
    echo "$info_response" | jq '.result'

    # Extract and display key info
    webhook_url=$(echo "$info_response" | jq -r '.result.url')
    pending=$(echo "$info_response" | jq -r '.result.pending_update_count')

    echo ""
    if [ "$webhook_url" = "$WEBHOOK_URL" ]; then
        echo "[SUCCESS] Webhook URL matches!"
    else
        echo "[WARNING] Webhook URL mismatch!"
        echo "  Expected: $WEBHOOK_URL"
        echo "  Got: $webhook_url"
    fi

    echo "Pending Updates: $pending"
else
    echo "$info_response"
fi

echo ""
echo "Step 4: Testing webhook endpoint..."

# Test if endpoint is accessible
http_code=$(curl -s -o /dev/null -w "%{http_code}" "$WEBHOOK_URL")

if [ "$http_code" = "405" ] || [ "$http_code" = "200" ]; then
    echo "[OK] Webhook endpoint is accessible (HTTP $http_code)"
elif [ "$http_code" = "000" ]; then
    echo "[WARNING] Could not reach webhook endpoint (timeout or network error)"
else
    echo "[WARNING] Webhook endpoint returned HTTP $http_code"
fi

echo ""
echo "========================================"
echo "  WEBHOOK SETUP COMPLETE!"
echo "========================================"
echo ""
echo "Next Steps:"
echo "1. Open Telegram app"
echo "2. Search for your bot"
echo "3. Send: /start"
echo "4. Bot should respond instantly!"
echo ""
echo "Troubleshooting:"
echo "- Check Vercel logs: vercel logs --follow"
echo "- Verify env vars in Vercel Dashboard"
echo "- Re-run this script to reset webhook"
echo ""
echo "Webhook URL: $WEBHOOK_URL"
echo ""

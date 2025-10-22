#!/bin/bash

# Check Telegram Bot Webhook Status
# Quick script untuk verify webhook configuration

BOT_TOKEN="8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA"

echo ""
echo "========================================"
echo "  TELEGRAM WEBHOOK STATUS CHECKER"
echo "========================================"
echo ""

echo "Fetching webhook info..."
echo ""

# Get webhook info
response=$(curl -s "https://api.telegram.org/bot$BOT_TOKEN/getWebhookInfo")

# Check if curl succeeded
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to connect to Telegram API"
    exit 1
fi

# Pretty print JSON if jq is available, otherwise raw
if command -v jq &> /dev/null; then
    echo "$response" | jq '.'

    # Extract key info
    webhook_url=$(echo "$response" | jq -r '.result.url')
    pending_updates=$(echo "$response" | jq -r '.result.pending_update_count')
    last_error=$(echo "$response" | jq -r '.result.last_error_message // "None"')

    echo ""
    echo "========================================"
    echo "  SUMMARY"
    echo "========================================"
    echo ""

    if [ "$webhook_url" = "" ]; then
        echo "Status: No webhook configured (polling mode)"
        echo "Mode: POLLING"
    else
        echo "Status: Webhook configured"
        echo "Mode: WEBHOOK"
        echo "URL: $webhook_url"
    fi

    echo "Pending Updates: $pending_updates"
    echo "Last Error: $last_error"
else
    echo "$response"
fi

echo ""
echo "========================================"
echo ""

@echo off
REM Basely Bot - Quick Deploy to Vercel
REM Windows Batch Script for Hackathon Deployment

echo.
echo ========================================
echo   BASELY BOT - VERCEL DEPLOYMENT
echo ========================================
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Vercel CLI not found!
    echo.
    echo Installing Vercel CLI...
    npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install Vercel CLI
        pause
        exit /b 1
    )
)

echo [OK] Vercel CLI installed
echo.

REM Change to project directory
cd /d "C:\Users\T470\Documents\Basely"

echo ========================================
echo   STEP 1: LOGIN TO VERCEL
echo ========================================
echo.
echo Browser akan terbuka untuk login...
echo Silakan login dengan GitHub/GitLab/Email
echo.
pause

vercel login
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Login failed!
    pause
    exit /b 1
)

echo.
echo [OK] Login successful
echo.

echo ========================================
echo   STEP 2: DEPLOY TO PRODUCTION
echo ========================================
echo.
echo Deploying to Vercel...
echo This will take 2-3 minutes...
echo.

vercel --prod
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Deployment failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   DEPLOYMENT SUCCESSFUL!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Copy your deployment URL from above
echo 2. Set environment variables in Vercel Dashboard:
echo    - TELEGRAM_BOT_TOKEN
echo    - STAKING_POOL_ADDRESS
echo    - MOCK_ETH_ADDRESS
echo    - WALLET_ADDRESS
echo    - PRIVATE_KEY
echo    - RPC_URL
echo.
echo 3. Redeploy after setting env vars:
echo    vercel --prod
echo.
echo 4. Set Telegram webhook (PowerShell):
echo    $url = "https://YOUR-URL.vercel.app/api/bot"
echo    $token = "8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA"
echo    Invoke-WebRequest -Uri "https://api.telegram.org/bot$token/setWebhook" -Method Post -Body (@{url=$url} ^| ConvertTo-Json) -ContentType "application/json"
echo.
echo 5. Test bot on Telegram with /start
echo.
echo For detailed instructions, see:
echo - DEPLOY_TO_VERCEL.md
echo - DEPLOYMENT.md
echo.
echo ========================================
echo   BOT READY FOR HACKATHON!
echo ========================================
echo.

pause

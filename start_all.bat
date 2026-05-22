@echo off
TITLE MedSafe-Chain 一鍵啟動工具
COLOR 0B

echo ============================================================
echo      MedSafe-Chain 跨醫院用藥安全預警系統 - 啟動器
echo ============================================================
echo.

:: 取得目前腳本所在目錄
SET ROOT_DIR=%~dp0
cd /d %ROOT_DIR%

echo [步驟 1/2] 正在準備啟動後端伺服器 (FastAPI)...
echo ------------------------------------------------------------
:: 在新視窗啟動後端，並保持視窗開啟以查看 ngrok 網址
start "MedSafe-Backend" cmd /k "cd /d %ROOT_DIR%backend && echo 正在檢查 Python 套件... && pip install -r requirements.txt && echo 正在啟動 FastAPI... && python main.py"

timeout /t 3 >nul

echo [步驟 2/2] 正在準備啟動前端網頁 (Vue 3 + Vite)...
echo ------------------------------------------------------------
:: 在新視窗啟動前端
start "MedSafe-Frontend" cmd /k "cd /d %ROOT_DIR%frontend && echo 正在檢查 Node 套件 (可能需要一點時間)... && npm install && echo 正在啟動 Vite 開發伺服器... && npm run dev"

echo.
echo ============================================================
echo   系統啟動指令已送出！
echo.
echo   1. 後端視窗：請查看 ngrok 產生的公開網址 (https://xxxx.ngrok-free.app)
echo   2. 前端視窗：啟動完成後請造訪 http://localhost:5173
echo.
echo   ※ 注意：若是第一次執行，安裝套件可能需要數分鐘，請稍候。
echo ============================================================
echo.
pause

#!/bin/bash

echo "===================================================="
echo "   MedSafe-Chain 跨醫院用藥安全系統 - 後端啟動中"
echo "===================================================="

# 1. 進入 backend 資料夾
cd "$(dirname "$0")"

# 2. 檢查並安裝相依套件
echo "[1/2] 正在檢查 Python 相依套件..."
pip install -r requirements.txt --quiet

if [ $? -eq 0 ]; then
    echo "✓ 套件檢查完成"
else
    echo "✗ 套件安裝失敗，請手動執行 pip install -r requirements.txt"
    exit 1
fi

# 3. 啟動後端服務
echo "[2/2] 正在啟動 FastAPI 伺服器並建立 ngrok 隧道..."
echo "----------------------------------------------------"

python main.py

# 4. 顯示操作說明 (這部分通常在 main.py 運行時會被阻塞，但若 main.py 在背景運行則可顯示)
echo "----------------------------------------------------"
echo "✓ 後端已啟動於 http://localhost:8000"
echo "✓ ngrok 公開網址請查看上方輸出內容"
echo ""
echo "[下一步操作說明]"
echo "1. 請另開一個終端機視窗"
echo "2. 執行前端開發伺服器："
echo "   cd frontend && npm install && npm run dev"
echo "3. 前端網址：http://localhost:5173"
echo "===================================================="

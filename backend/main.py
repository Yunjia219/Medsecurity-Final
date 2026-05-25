import json
import os
import requests
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from pyngrok import ngrok
import uvicorn

# --- 1. 基本設定 ---

app = FastAPI(title="MedSafe-Chain API")

# 啟用 CORS，允許前端 Vue 3 本地開發跨域請求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 資料檔案路徑 - 使用絕對路徑確保穩定性
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
USERS_FILE = os.path.join(DATA_DIR, "users.json")
DDI_RULES_FILE = os.path.join(DATA_DIR, "ddi_rules.json")
MEDICATIONS_FILE = os.path.join(DATA_DIR, "medications.json")

# 輔助函式：讀取 JSON 檔案
def load_json(file_path):
    try:
        if not os.path.exists(file_path):
            print(f"[!] 找不到檔案: {file_path}")
            return []
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[!] 讀取 JSON 失敗 ({file_path}): {str(e)}")
        return []

# FHIR Server 設定
HAPI_FHIR_URL = "https://hapi.fhir.org/baseR4"

# --- 模型定義 ---

class LoginRequest(BaseModel):
    username: str
    password: str

class DDICheckRequest(BaseModel):
    medications: List[str]

# --- 2. 帳號驗證 API ---

@app.post("/api/login")
async def login(req: LoginRequest):
    """
    接收用戶名與密碼，比對 users.json 進行驗證
    """
    try:
        print(f"[*] 嘗試登入: {req.username}")
        users = load_json(USERS_FILE)
        print(f"[*] 已讀取到 {len(users)} 筆用戶資料")
        
        if not users:
            print("[!] 無法讀取用戶資料，請檢查路徑與權限")
            return {"success": False, "message": "伺服器資料讀取失敗"}

        for user in users:
            # 使用 str() 確保型別一致，避免 500 錯誤
            if str(user["username"]) == str(req.username) and str(user["password"]) == str(req.password):
                print(f"[+] 登入成功: {user['name']} ({user['role']})")
                return {
                    "success": True,
                    "role": user["role"],
                    "name": user["name"],
                    "username": user["username"],
                    "token": "medsafe_fake_token_for_demo_purposes"
                }
        
        print(f"[-] 登入失敗: 帳號或密碼錯誤 ({req.username})")
        return {"success": False, "message": "帳號或密碼錯誤"}
    except Exception as e:
        print(f"[ERROR] Login API 崩潰: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"內部伺服器錯誤: {str(e)}")

# --- 3. DDI 藥物衝突比對 API ---

@app.post("/api/check-ddi")
async def check_ddi(req: DDICheckRequest):
    """
    接收藥物清單，比對 ddi_rules.json 找出潛在衝突
    """
    rules = load_json(DDI_RULES_FILE)
    meds = req.medications
    conflicts = []
    involved_meds = set()

    for i in range(len(meds)):
        for j in range(i + 1, len(meds)):
            drug_a = meds[i].strip().lower()
            drug_b = meds[j].strip().lower()
            
            for rule in rules:
                rule_a = rule["drug_a"].lower()
                rule_b = rule["drug_b"].lower()
                
                if (drug_a == rule_a and drug_b == rule_b) or \
                   (drug_a == rule_b and drug_b == rule_a):
                    conflicts.append(rule)
                    involved_meds.add(meds[i])
                    involved_meds.add(meds[j])

    safe_medications = [m for m in meds if m not in involved_meds]

    return {
        "has_conflict": len(conflicts) > 0,
        "conflicts": conflicts,
        "safe_medications": safe_medications
    }

# --- 4. FHIR Bundle 上傳 API ---

@app.post("/api/fhir/upload")
async def upload_fhir_bundle(bundle: dict = Body(...)):
    try:
        response = requests.post(f"{HAPI_FHIR_URL}/Bundle", json=bundle)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FHIR Upload Failed: {str(e)}")

# --- 5. FHIR MedicationRequest 讀取 API ---

@app.get("/api/fhir/medications/{patient_id}")
async def get_fhir_medications(patient_id: str):
    try:
        params = {"subject": f"Patient/{patient_id}"}
        response = requests.get(f"{HAPI_FHIR_URL}/MedicationRequest", params=params)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FHIR Read Failed: {str(e)}")

# --- 6. 取得所有藥物清單 API ---

@app.get("/api/medications")
async def get_all_medications():
    return load_json(MEDICATIONS_FILE)

# --- 7. 取得保險統計資料 API ---

@app.get("/api/insurance/stats")
async def get_insurance_stats():
    return {
        "monthly_safe_rate": [85, 88, 82, 90, 87, 93, 91, 89, 94, 96, 92, 95],
        "months": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        "risk_distribution": [
            { "name": "低風險", "value": 342 },
            { "name": "中風險", "value": 128 },
            { "name": "高風險", "value": 43 }
        ],
        "total_patients": 513,
        "green_light_count": 342,
        "red_light_count": 171
    }

# --- 8. 啟動設定 ---

if __name__ == "__main__":
    # 嘗試啟動 ngrok，若失敗則僅啟動本地服務
    try:
        public_url = ngrok.connect(8000).public_url
        print(f"\n[*] MedSafe-Chain 公開網址: {public_url}")
        print(f"[*] API 文件地址: {public_url}/docs\n")
    except Exception as e:
        print(f"\n[!] ngrok 啟動失敗: {str(e)}")
        print("[*] 系統將僅在本地運行: http://localhost:8000\n")

    # 啟動 FastAPI 伺服器
    uvicorn.run(app, host="127.0.0.1", port=8000)

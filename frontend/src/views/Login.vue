<template>
  <!-- 
    設計理由：
    使用主色 med-primary 作為滿版背景，建立視覺權威感與醫療專業度。
    卡片強化陰影 (shadow-2xl) 與大圓角，使登入介面懸浮於背景之上，提升使用者焦點。
  -->
  <div class="min-h-screen bg-med-primary flex items-center justify-center p-4 font-sans relative overflow-hidden">
    <!-- 裝飾用背景元素 -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-med-primary-dark/20 rounded-full blur-3xl"></div>

    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-10 transform transition-all z-10 border border-white/20">
      
      <!-- 系統名稱與副標題 -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-med-primary-light rounded-2xl mb-4 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-med-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 2.944a11.955 11.955 0 01-8.618 3.04m17.236 0L21 21l-9-4-9 4L3 5.984m17.236 0L21 21l-9-4-9 4L3 5.984" />
          </svg>
        </div>
        <h1 class="text-med-primary text-4xl font-bold tracking-tight">MedSafe-Chain</h1>
        <p class="text-med-text-muted text-sm mt-3 font-medium">跨醫院多重用藥衝突預警系統</p>
      </div>

      <!-- 登入表單 -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-bold text-med-text ml-1">帳號 (User ID)</label>
          <input 
            v-model="username"
            type="text" 
            placeholder="請輸入帳號"
            class="w-full border border-med-border rounded-xl px-4 py-3.5 text-med-text text-sm bg-med-bg/50 focus:outline-none focus:ring-2 focus:ring-med-primary/20 focus:border-med-primary placeholder-gray-400 transition-all"
            required
          >
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-bold text-med-text ml-1">密碼 (Password)</label>
          <input 
            v-model="password"
            type="password" 
            placeholder="請輸入密碼"
            class="w-full border border-med-border rounded-xl px-4 py-3.5 text-med-text text-sm bg-med-bg/50 focus:outline-none focus:ring-2 focus:ring-med-primary/20 focus:border-med-primary placeholder-gray-400 transition-all"
            required
          >
        </div>

        <!-- 錯誤訊息提示 -->
        <transition name="fade">
          <div v-if="error" class="bg-med-danger-light text-med-danger rounded-xl p-4 text-xs flex items-center gap-3 border border-med-danger/20" role="alert">
            <span class="text-lg">⚠️</span> {{ error }}
          </div>
        </transition>

        <!-- 登入按鈕 -->
        <button 
          type="submit"
          class="w-full bg-med-primary hover:bg-med-primary-dark text-white font-bold py-4 rounded-xl text-sm shadow-xl shadow-med-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? '區塊鏈節點驗證中...' : '登入系統' }}
        </button>
      </form>

      <!-- 快速測試區塊 -->
      <div class="bg-med-bg rounded-2xl p-6 mt-10 border border-med-border border-dashed relative">
        <div class="absolute -top-3 left-6 bg-white px-3 text-[10px] font-black text-med-primary-dark uppercase tracking-widest">
          Developer Sandbox
        </div>
        <div class="grid grid-cols-2 gap-3 text-[11px] text-med-text-muted">
          <div class="bg-white p-2.5 rounded-lg border border-med-border shadow-sm cursor-pointer hover:bg-med-primary-light/20 transition-colors" @click="username='11'; password='1234'">
            <span class="font-bold text-med-primary">患者：</span>11 / 1234
          </div>
          <div class="bg-white p-2.5 rounded-lg border border-med-border shadow-sm cursor-pointer hover:bg-med-primary-light/20 transition-colors" @click="username='22'; password='1234'">
            <span class="font-bold text-med-primary">醫師：</span>22 / 1234
          </div>
          <div class="bg-white p-2.5 rounded-lg border border-med-border shadow-sm cursor-pointer hover:bg-med-primary-light/20 transition-colors" @click="username='33'; password='1234'">
            <span class="font-bold text-med-primary">管理：</span>33 / 1234
          </div>
          <div class="bg-white p-2.5 rounded-lg border border-med-border shadow-sm cursor-pointer hover:bg-med-primary-light/20 transition-colors" @click="username='44'; password='1234'">
            <span class="font-bold text-med-primary">保險：</span>44 / 1234
          </div>
        </div>
      </div>
    </div>

    <!-- 底部版權 -->
    <div class="absolute bottom-6 text-white/40 text-[10px] font-medium tracking-widest uppercase">
      &copy; 2024 MedSafe-Chain Protocol. All Rights Reserved.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (loading.value) return
  
  loading.value = true
  error.value = ''
  
  console.log('[Login] 開始登入程序, 帳號:', username.value)
  
  try {
    const requestData = {
      username: String(username.value),
      password: String(password.value)
    }
    
    console.log('[Login] 發送請求到 /api/login...', requestData)
    
    const response = await axios.post('/api/login', requestData, {
      timeout: 10000 // 10秒超時
    })
    
    console.log('[Login] 收到回應:', response.data)
    
    if (response.data.success) {
      console.log('[Login] 登入成功, 準備跳轉到:', `/${response.data.role}`)
      localStorage.setItem('medsafe_user', JSON.stringify(response.data))
      router.push(`/${response.data.role}`)
    } else {
      console.warn('[Login] 登入失敗:', response.data.message)
      error.value = response.data.message || '帳號或密碼錯誤'
    }
  } catch (err) {
    console.error('[Login] 請求異常:', err)
    if (err.code === 'ECONNABORTED') {
      error.value = '伺服器回應過久，請檢查後端是否正常啟動'
    } else if (err.response) {
      error.value = `伺服器錯誤 (${err.response.status}): ${err.response.data.detail || '未知錯誤'}`
    } else {
      error.value = '無法連接到區塊鏈節點，請確認 API 服務已啟動'
    }
  } finally {
    loading.value = false
    console.log('[Login] 登入程序結束')
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

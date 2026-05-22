<template>
  <nav class="bg-med-primary shadow-lg h-16 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50">
    <!-- Logo 區域 -->
    <router-link to="/" class="flex items-center gap-3 group">
      <div class="bg-white text-med-primary p-1.5 rounded-lg shadow-sm group-hover:rotate-3 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 2.944a11.955 11.955 0 01-8.618 3.04m17.236 0L21 21l-9-4-9 4L3 5.984m17.236 0L21 21l-9-4-9 4L3 5.984" />
        </svg>
      </div>
      <div class="flex flex-col">
        <span class="text-white font-bold text-lg md:text-xl tracking-tight">MedSafe-Chain</span>
        <span class="text-white/50 text-[10px] uppercase tracking-widest leading-none hidden md:block">Blockchain Drug Security</span>
      </div>
    </router-link>

    <!-- 右側選單與使用者資訊 -->
    <div class="flex items-center gap-3 md:gap-6" v-if="user">
      <!-- 使用者角色標籤 (Desktop) -->
      <div class="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
        <div class="w-2 h-2 rounded-full bg-med-success animate-pulse"></div>
        <span class="text-white text-xs font-medium">{{ roleName }} - {{ user?.name || user?.username || '未知用戶' }}</span>
      </div>

      <!-- 使用者角色標籤 (Mobile) -->
      <div class="md:hidden w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold border border-white/30">
        {{ (user?.name || user?.username || '?').charAt(0).toUpperCase() }}
      </div>

      <!-- 登出按鈕 -->
      <button 
        @click="logout"
        class="text-white border border-white/30 px-3 py-1.5 rounded-lg text-xs md:text-sm hover:bg-white/10 hover:border-white/60 transition-all font-medium flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span class="hidden md:inline">安全登出</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userData = localStorage.getItem('medsafe_user')
const user = userData ? JSON.parse(userData) : null

const roleName = computed(() => {
  if (!user) return ''
  const roles = {
    'patient': '患者',
    'doctor': '執業醫師',
    'admin': '系統管理員',
    'insurance': '保險機構'
  }
  return roles[user.role] || user.role
})

const logout = () => {
  localStorage.removeItem('medsafe_user')
  router.push('/login')
}
</script>

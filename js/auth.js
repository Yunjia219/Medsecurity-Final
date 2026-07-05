// 帳號登入用 Firebase Auth，前端不知道也不需要知道真實 email，
// 一律用「帳號 + 固定網域」組出一個內部使用的合成 email
const AUTH_EMAIL_DOMAIN = '@medsafe.local';
function toAuthEmail(username) {
  return String(username).trim().toLowerCase() + AUTH_EMAIL_DOMAIN;
}

// 檢查是否已登入
function requireAuth() {
  const user = JSON.parse(localStorage.getItem('demo_user') || 'null');
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  return user;
}

// 檢查是否已登入且角色相符，不符則導回登入頁（展示帳號切換仍走登入頁快速登入，不在頁面內互相跳轉）
function requireRole(role) {
  const user = requireAuth();
  if (!user) return null;
  if (user.role !== role) {
    window.location.href = 'login.html';
    return null;
  }
  return user;
}

// 登出：同時清除本地快取與 Firebase Auth 的登入狀態
function logout() {
  localStorage.removeItem('demo_user');
  if (window.auth) window.auth.signOut();
  window.location.href = 'login.html';
}

// 取得當前使用者
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('demo_user') || 'null');
}

// 等待 Firebase Auth 還原持久化的登入狀態後再繼續，
// 避免頁面重整時 Firestore 請求搶在 request.auth 就緒之前送出而被規則拒絕
function waitForAuthReady() {
  return new Promise(resolve => {
    const unsubscribe = window.auth.onAuthStateChanged(u => {
      unsubscribe();
      resolve(u);
    });
  });
}

// 用 Firebase Authentication 登入，並讀取 user_roles/{uid} 取得角色資料
async function loginWithFirebaseAuth(username, password) {
  let cred;
  try {
    cred = await window.auth.signInWithEmailAndPassword(toAuthEmail(username), password);
  } catch (e) {
    return null; // 帳號不存在或密碼錯誤
  }
  const profile = await DbService.getUserRole(cred.user.uid);
  if (!profile) {
    await window.auth.signOut();
    return null;
  }
  if (profile.status === 'disabled') {
    await window.auth.signOut();
    return { disabled: true };
  }
  return { username: profile.username, role: profile.role, name: profile.name };
}

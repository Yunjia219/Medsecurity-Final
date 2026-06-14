// 檢查是否已登入
function requireAuth() {
  const user = JSON.parse(localStorage.getItem('demo_user') || 'null');
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  return user;
}

// 登出
function logout() {
  localStorage.removeItem('demo_user');
  window.location.href = 'login.html';
}

// 取得當前使用者
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('demo_user') || 'null');
}

// Firestore 驗證登入（需先載入 firebase-config.js 與 db-service.js）
async function loginWithFirestore(username, password) {
  const hash = await DbService.hashPassword(password);
  const userData = await DbService.getUserByUsername(username);
  if (!userData || userData.passwordHash !== hash) return null;
  return { username, role: userData.role, name: userData.name };
}

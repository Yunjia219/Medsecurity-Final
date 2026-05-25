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

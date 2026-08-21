// 訊息通知輔助層：分頁標題未讀數、提示音、瀏覽器桌面通知
// 病患端與醫師端共用，所有能力都是「有就用、沒有就安靜跳過」，不影響原有流程
window.medNotify = {
  _baseTitle: null,
  _ctx: null,
  soundEnabled: true,

  init() {
    if (this._baseTitle === null) this._baseTitle = document.title;
  },

  // 在分頁標題前面掛上未讀數，讓使用者切到別的分頁時也看得到
  setUnread(count) {
    this.init();
    const n = Number(count) || 0;
    document.title = n > 0 ? '(' + (n > 99 ? '99+' : n) + ') ' + this._baseTitle : this._baseTitle;
  },

  // 用 WebAudio 合成兩聲提示音，不需要額外音檔
  beep() {
    if (!this.soundEnabled) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!this._ctx) this._ctx = new Ctx();
      if (this._ctx.state === 'suspended') this._ctx.resume();
      const start = this._ctx.currentTime;
      [880, 1174].forEach((freq, i) => {
        const at = start + i * 0.13;
        const osc = this._ctx.createOscillator();
        const gain = this._ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, at);
        gain.gain.exponentialRampToValueAtTime(0.16, at + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
        osc.connect(gain);
        gain.connect(this._ctx.destination);
        osc.start(at);
        osc.stop(at + 0.2);
      });
    } catch (e) { /* 瀏覽器不支援或尚未取得播放權限時忽略 */ }
  },

  // 桌面通知需要使用者授權，於第一次開啟對話（使用者手勢）時詢問
  requestPermission() {
    if (!('Notification' in window)) return;
    try {
      if (Notification.permission === 'default') Notification.requestPermission();
    } catch (e) { /* file:// 等情境可能直接丟錯，忽略 */ }
  },

  // 只有在分頁不在前景時才發桌面通知，避免和畫面上的 toast 重複打擾
  desktop(title, body, onClick) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    if (!document.hidden) return;
    try {
      const n = new Notification(title, { body, icon: 'images/LOGO.png', tag: 'medsafe-chat', renotify: true });
      n.onclick = () => { window.focus(); n.close(); if (onClick) onClick(); };
    } catch (e) { /* 部分瀏覽器在非 https 下會擋掉，忽略 */ }
  },

  // 收到新訊息時的統一入口：響一聲 + 視情況發桌面通知
  ping(title, body, onClick) {
    this.beep();
    this.desktop(title, body, onClick);
  }
};

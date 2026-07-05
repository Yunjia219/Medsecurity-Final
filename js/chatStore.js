// 病患端與醫師端共用的即時通訊模擬層
// 透過 localStorage + storage 事件，讓 patient.html 與 dashboard.html 開在不同分頁時可以互相收發訊息與通知
window.chatStore = {
  _msgKey(patientId) { return 'medsafe_chat_' + patientId; },
  _notifKey(role) { return 'medsafe_notif_' + role; },

  getMessages(patientId) {
    return JSON.parse(localStorage.getItem(this._msgKey(patientId)) || '[]');
  },
  addMessage(patientId, from, text) {
    const list = this.getMessages(patientId);
    const msg = { from, text, ts: Date.now() };
    list.push(msg);
    localStorage.setItem(this._msgKey(patientId), JSON.stringify(list));
    return msg;
  },
  clearMessages(patientId) {
    localStorage.removeItem(this._msgKey(patientId));
  },

  getNotifications(role) {
    return JSON.parse(localStorage.getItem(this._notifKey(role)) || '[]');
  },
  notify(role, notif) {
    const list = this.getNotifications(role);
    list.unshift({ id: Date.now() + '-' + Math.random().toString(36).slice(2, 7), read: false, ...notif });
    localStorage.setItem(this._notifKey(role), JSON.stringify(list.slice(0, 30)));
  },
  markAllRead(role) {
    const list = this.getNotifications(role).map(n => ({ ...n, read: true }));
    localStorage.setItem(this._notifKey(role), JSON.stringify(list));
  },
  markRead(role, id) {
    const list = this.getNotifications(role).map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(this._notifKey(role), JSON.stringify(list));
  },

  // 註冊跨分頁事件監聽：cb(event) 只會在「其他分頁」寫入 localStorage 時觸發
  onChange(cb) {
    window.addEventListener('storage', cb);
    return () => window.removeEventListener('storage', cb);
  }
};

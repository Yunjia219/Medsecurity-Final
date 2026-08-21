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

  // --- 未讀訊息追蹤 ---
  // 以「最後讀取時間戳」為基準，重新整理頁面後未讀數仍然正確
  _seenKey(role, patientId) { return 'medsafe_seen_' + role + '_' + patientId; },
  getSeen(role, patientId) {
    return Number(localStorage.getItem(this._seenKey(role, patientId)) || 0);
  },
  markChatRead(role, patientId) {
    const list = this.getMessages(patientId);
    const last = list.length ? list[list.length - 1].ts : Date.now();
    localStorage.setItem(this._seenKey(role, patientId), String(Math.max(last, this.getSeen(role, patientId))));
  },
  // 未讀 = 對方送出且時間晚於最後讀取時間的訊息（系統提示不計入）
  getUnreadCount(role, patientId) {
    const seen = this.getSeen(role, patientId);
    return this.getMessages(patientId).filter(m => m.from !== role && m.from !== 'system' && m.ts > seen).length;
  },

  // 掃出所有已存在的對話串，供醫師端訊息中心列出
  listConversations() {
    const prefix = 'medsafe_chat_';
    const out = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || key.indexOf(prefix) !== 0) continue;
      const patientId = key.slice(prefix.length);
      const messages = this.getMessages(patientId);
      if (!messages.length) continue;
      out.push({ patientId, messages, last: messages[messages.length - 1] });
    }
    return out.sort((a, b) => b.last.ts - a.last.ts);
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

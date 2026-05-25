window.utils = {
  // 狀態標籤對應樣式
  getStatusClass(status) {
    const map = {
      '完成': 'bg-success-light text-success-text',
      '進行中': 'bg-primary-light text-primary-dark',
      '待審核': 'bg-warning-light text-warning-text',
      '停用': 'bg-danger-light text-danger'
    };
    return map[status] || 'bg-gray-100 text-gray-600';
  },

  // 格式化日期
  formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  },

  // 格式化數字 (千分位)
  formatNumber(num) {
    return num ? num.toLocaleString('zh-TW') : '0';
  }
};

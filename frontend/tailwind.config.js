/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 品牌主色調 (MedSafe Blue) - 專業、信任、醫療
        'med-primary': '#1A5276',
        'med-primary-dark': '#154360',
        'med-primary-light': '#D6EAF8',
        
        // 內文色與背景色
        'med-text': '#212F3D',
        'med-text-muted': '#717D7E',
        'med-bg': '#F4F6F7',
        'med-border': '#D5D8DC',
        
        // 危險/錯誤 (Red)
        'med-danger': '#C0392B',
        'med-danger-light': '#FADBD8',
        
        // 警告/注意 (Yellow/Orange)
        'med-warning': '#F39C12',
        'med-warning-light': '#FDEBD0',
        'med-warning-text': '#7A4E06', // 用於黃色背景上的深色文字，確保對比度
        
        // 成功/安全 (Green)
        'med-success': '#27AE60',
        'med-success-light': '#D5F5E3',
        'med-success-text': '#1A7840',
        
        // 資訊/提示 (Blue)
        'med-info': '#3498DB',
        'med-info-light': '#EBF5FB',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      borderWidth: {
        '1.5': '1.5px',
      },
      boxShadow: {
        'med': '0 4px 6px -1px rgba(26, 82, 118, 0.1), 0 2px 4px -1px rgba(26, 82, 118, 0.06)',
      }
    },
  },
  plugins: [],
}

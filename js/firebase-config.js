const firebaseConfig = {
  apiKey: "AIzaSyCMPhyppaq4D3ba4yUUz-DmeGS9w8wgrN0",
  authDomain: "medsafe-554b7.firebaseapp.com",
  projectId: "medsafe-554b7",
  storageBucket: "medsafe-554b7.firebasestorage.app",
  messagingSenderId: "198938211918",
  appId: "1:198938211918:web:9d86ca5093a7e38fe9f51f"
};

firebase.initializeApp(firebaseConfig);
window.db = firebase.firestore();
window.auth = firebase.auth();

// 給管理員「新增帳號」使用的獨立 Auth instance，
// 避免 createUserWithEmailAndPassword 把目前登入的管理員自動切換登入成新帳號
window.secondaryAuth = firebase.initializeApp(firebaseConfig, 'Secondary').auth();

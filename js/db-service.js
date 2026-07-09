window.DbService = {

  // --- Auth ---
  // user_roles/{uid} 是給 Firestore 安全規則判斷身分用的索引，
  // 由 request.auth.uid 直接查詢，只有本人（或建立當下的管理員）能讀寫
  async getUserRole(uid) {
    const snap = await window.db.collection('user_roles').doc(uid).get();
    return snap.exists ? snap.data() : null;
  },

  // 自助註冊只能開 patient 角色的帳號（規則也會擋住其他角色），用主要的 window.auth
  // 建立帳號，讓使用者註冊後直接以該身分登入
  async registerPatient(username, password, name) {
    const email = username.trim().toLowerCase() + '@medsafe.local';
    const cred = await window.auth.createUserWithEmailAndPassword(email, password);
    const uid = cred.user.uid;
    try {
      await window.db.collection('user_roles').doc(uid).set({ username, name, role: 'patient', status: 'active' });
      await window.db.collection('users').doc(username).set({ uid, name, role: 'patient', status: 'active' });
      await window.db.collection('patient_data').doc(username).set({
        profile: {
          id: username, name, age: null, gender: '',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=24A15D&color=fff`,
          healthSummary: '尚無用藥紀錄，請於回診時請醫師建立您的用藥檔案。',
          nextAppointment: ''
        },
        stats: { safetyScore: 100, activeMeds: 0, aiChecksToday: 0, lastSync: '尚未同步' },
        medications: [],
        ddiAlerts: [],
        aiInsights: [],
        reminders: [],
        // 目前系統只有一位醫師，新註冊病患先預設指派給她；之後管理員可在後台改指派其他醫師
        assignedDoctor: 'doctor',
        assignedDoctorName: '李小美醫師'
      });
    } catch (e) {
      // users/{username} 已被其他人註冊走時，上面的寫入會被規則擋下（視為 update 而非 create）
      await cred.user.delete().catch(() => {});
      throw e;
    }
    return { username, role: 'patient', name };
  },

  // --- Admin ---
  async getAdminData() {
    const snap = await window.db.collection('admin_data').doc('main').get();
    return snap.exists ? snap.data() : null;
  },

  // --- Maintenance Mode ---
  async getMaintenanceMode() {
    const snap = await window.db.collection('admin_data').doc('main').get();
    return snap.exists ? (snap.data().maintenanceMode || false) : false;
  },

  async setMaintenanceMode(enabled) {
    await window.db.collection('admin_data').doc('main').set({ maintenanceMode: enabled }, { merge: true });
  },

  // 系統設置卡（FHIR URL、AI 敏感度門檻等），與 maintenanceMode 分開存但同一份文件，
  // 避免每次重整頁面後管理員的設定又被 mockData 預設值蓋掉
  async getSystemSettings() {
    const snap = await window.db.collection('admin_data').doc('main').get();
    return snap.exists ? (snap.data().systemSettings || null) : null;
  },

  async saveSystemSettings(settings) {
    await window.db.collection('admin_data').doc('main').set({ systemSettings: settings }, { merge: true });
  },

  // --- Doctor ---
  async getDoctorData() {
    const snap = await window.db.collection('doctor_data').doc('main').get();
    return snap.exists ? snap.data() : null;
  },

  // --- Patient ---
  async getPatientData(username) {
    const snap = await window.db.collection('patient_data').doc(username).get();
    return snap.exists ? snap.data() : null;
  },

  async updateReminders(username, remindersArray) {
    await window.db.collection('patient_data').doc(username).update({
      reminders: remindersArray
    });
  },

  async addMedicationToPatient(username, medication) {
    const snap = await window.db.collection('patient_data').doc(username).get();
    if (!snap.exists) return;
    const meds = snap.data().medications || [];
    meds.push(medication);
    await window.db.collection('patient_data').doc(username).update({ medications: meds });
  },

  // 病患目前指派的醫師（用查詢代替寫死名單），讓 demo 資料跟真實註冊的病患走同一套邏輯
  async getPatientsByDoctor(doctorUsername) {
    const snap = await window.db.collection('patient_data').where('assignedDoctor', '==', doctorUsername).get();
    return snap.docs.map(d => ({ username: d.id, ...d.data() }));
  },

  async assignDoctorToPatient(username, doctorUsername, doctorName) {
    await window.db.collection('patient_data').doc(username).set(
      { assignedDoctor: doctorUsername, assignedDoctorName: doctorName },
      { merge: true }
    );
  },

  // --- Insurance ---
  async getInsuranceData() {
    const snap = await window.db.collection('insurance_data').doc('main').get();
    return snap.exists ? snap.data() : null;
  },

  async addCareCase(record) {
    await window.db.collection('care_cases').add(record);
  },

  async getCareCases() {
    const snap = await window.db.collection('care_cases').orderBy('activatedAt', 'desc').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async updateCareCaseStatus(id, status) {
    await window.db.collection('care_cases').doc(id).update({ status });
  },

  // 保戶目錄改讀真實病患資料，讓新註冊的病患自動出現在核保員的名單裡
  async getAllPatients() {
    const snap = await window.db.collection('patient_data').get();
    return snap.docs.map(d => ({ username: d.id, ...d.data() }));
  },

  // --- Insurance Claims ---
  async getClaims() {
    const snap = await window.db.collection('insurance_claims').orderBy('submittedAt', 'desc').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async submitClaim(record) {
    const ref = await window.db.collection('insurance_claims').add(record);
    return ref.id;
  },

  async updateClaimStatus(id, status, progress) {
    await window.db.collection('insurance_claims').doc(id).update({ status, progress });
  },

  // --- Insurance Policies ---
  async getPolicies() {
    const snap = await window.db.collection('insurance_policies').orderBy('createdAt', 'desc').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async addPolicy(record) {
    const ref = await window.db.collection('insurance_policies').add(record);
    return ref.id;
  },

  // --- Shared ---
  async getGraphData() {
    const snap = await window.db.collection('graph_data').doc('main').get();
    return snap.exists ? snap.data() : null;
  },

  // --- DDI Rules ---
  async getDdiRules() {
    const snap = await window.db.collection('ddi_rules').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async addDdiRule(rule) {
    const ref = await window.db.collection('ddi_rules').add(rule);
    return ref.id;
  },

  async deleteDdiRule(id) {
    await window.db.collection('ddi_rules').doc(id).delete();
  },

  // --- User Management ---
  async getAllUsers() {
    const snap = await window.db.collection('users').get();
    return snap.docs.map(d => ({ username: d.id, ...d.data() }));
  },

  // 用獨立的 secondaryAuth 建立 Firebase Auth 帳號，不影響目前登入的管理員 session
  async createUser(username, password, name, role) {
    const email = username.trim().toLowerCase() + '@medsafe.local';
    const cred = await window.secondaryAuth.createUserWithEmailAndPassword(email, password);
    const uid = cred.user.uid;
    await window.secondaryAuth.signOut();
    await window.db.collection('user_roles').doc(uid).set({ username, name, role, status: 'active' });
    await window.db.collection('users').doc(username).set({ uid, name, role, status: 'active' });
    return uid;
  }
};

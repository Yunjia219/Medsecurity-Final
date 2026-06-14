window.DbService = {

  // Web Crypto API SHA-256，不需 CDN
  async hashPassword(plainText) {
    const data = new TextEncoder().encode(plainText);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },

  // --- Auth ---
  async getUserByUsername(username) {
    const snap = await window.db.collection('users').doc(username).get();
    return snap.exists ? snap.data() : null;
  },

  // --- Admin ---
  async getAdminData() {
    const snap = await window.db.collection('admin_data').doc('main').get();
    return snap.exists ? snap.data() : null;
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

  // --- Insurance ---
  async getInsuranceData() {
    const snap = await window.db.collection('insurance_data').doc('main').get();
    return snap.exists ? snap.data() : null;
  },

  // --- Shared ---
  async getGraphData() {
    const snap = await window.db.collection('graph_data').doc('main').get();
    return snap.exists ? snap.data() : null;
  },

  async getMedicationInventory() {
    const snap = await window.db.collection('medication_inventory').doc('main').get();
    return snap.exists ? (snap.data().items || []) : [];
  },

  // --- Patient medications (doctor writes) ---
  async addMedicationToPatient(username, medication) {
    const snap = await window.db.collection('patient_data').doc(username).get();
    if (!snap.exists) return;
    const meds = snap.data().medications || [];
    meds.push(medication);
    await window.db.collection('patient_data').doc(username).update({ medications: meds });
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

  // --- Maintenance Mode ---
  async getMaintenanceMode() {
    const snap = await window.db.collection('admin_data').doc('main').get();
    return snap.exists ? (snap.data().maintenanceMode || false) : false;
  },

  async setMaintenanceMode(enabled) {
    await window.db.collection('admin_data').doc('main').update({ maintenanceMode: enabled });
  },

  // --- Blockchain Records ---
  async addBlockchainRecord(record) {
    await window.db.collection('blockchain_records').add(record);
  },

  async getBlockchainHistory() {
    const snap = await window.db.collection('blockchain_records')
      .orderBy('timestamp', 'desc')
      .limit(10)
      .get();
    return snap.docs.map(d => d.data());
  }
};

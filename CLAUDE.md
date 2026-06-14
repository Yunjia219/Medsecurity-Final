# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MedSafe-Chain** — a cross-hospital drug interaction (DDI) warning system built for a FHIR competition. It is a **zero-build, standalone frontend** prototype; no Node.js, npm, or server is required.

- Team: 漂亮北極熊
- Core FHIR Resources modeled: `MedicationRequest`, `Bundle`, `Patient`
- Domain: Taiwan elderly polypharmacy / multi-hospital medication conflicts

## How to Run

Open `index.html` directly in any modern browser. No build step.

- `index.html` checks `localStorage` for a session and redirects to `login.html` or the appropriate dashboard.
- Login with any of the four demo accounts (password is always `123`):

| Role | Username |
|------|----------|
| Admin | `admin` |
| Doctor | `doctor` |
| Patient | `patient01` |
| Insurance | `insurance01` |

## Architecture

All app logic runs in the browser. Firebase Firestore is the backend (CDN compat SDK).

```
index.html (redirect/loading)
    └─→ login.html (Vue 3 auth)
            ├─→ admin.html      (system management)
            ├─→ dashboard.html  (clinical doctor view)
            ├─→ patient.html    (patient/family hub)
            └─→ insurance.html  (underwriting & claims)
```

**Shared JS modules** (loaded via `<script>` in every page):

| File | Purpose |
|------|---------|
| `js/firebase-config.js` | Firebase init — exposes `window.db`. **Fill in your project config here first.** |
| `js/db-service.js` | All Firestore reads/writes as `window.DbService.*` |
| `js/auth.js` | `requireAuth()`, `logout()`, `getCurrentUser()` (localStorage), `loginWithFirestore()` (async Firestore verify) |
| `js/utils.js` | `getStatusClass()`, `formatDate()`, `formatNumber()` |
| `js/mockData.js` | Legacy mock data — still used only by `seed.html` to populate Firestore |

**Session state** is kept entirely in `localStorage` (`demo_user` key stores the logged-in user object after Firestore auth succeeds).

## Tech Stack

All dependencies are loaded from CDN — no local node_modules:

- **Vue 3** — reactive UI in each HTML page
- **Tailwind CSS** — utility-first styling
- **ECharts 5.4.3** — charts (bar, line, radar, pie, graph)
- **Firebase JS SDK 10.12.0 (compat)** — `firebase-app-compat.js` + `firebase-firestore-compat.js`
- **Google Fonts** — Plus Jakarta Sans, Noto Sans TC

## Firebase Setup (one-time, manual)

1. Create a Firebase project → enable **Firestore** (Native mode, region `asia-east1`)
2. Copy the web app config into `js/firebase-config.js` (replace `YOUR_*` placeholders)
3. In Firestore → Rules, paste the rules from the plan (allow public read, restrict write to `patient_data` reminders only)
4. Open `seed.html` in browser → click "Seed Database" → confirm 7 collections appear in Firestore Console
5. Delete or protect `seed.html` after seeding

## Firestore Collections

```
users/{username}           { passwordHash (SHA-256), role, name }
admin_data/main            { stats, logs, systemStatus, aiTrendData, ... }
doctor_data/main           { stats, recentPatients, prescriptionsByMonth, ... }
patient_data/{username}    { profile, stats, medications, ddiAlerts, reminders, ... }
insurance_data/main        { stats, claimsTracking, coverageGaps, ... }
graph_data/main            { nodes, links, scenarios }
medication_inventory/main  { items: [...] }
ddi_rules/{auto-id}        { drugA, drugB, severity, effect, cssClass }  ← admin CRUD
```

- `users/{username}` uses username as doc ID → O(1) `getDoc()`, no query needed
- Each role page does 1–2 Firestore reads on `async created()` load

## Key Data Structures

All Firestore ops are in `window.DbService` (`js/db-service.js`):

**Read methods:**
- `getUserByUsername(username)` — auth lookup
- `getPatientData(username)` — patient hub data
- `getDoctorData()` — doctor dashboard + prescription charts
- `getAdminData()` — admin stats + logs
- `getInsuranceData()` — insurance dashboard + claims
- `getGraphData()` — DDI network nodes/links for D3
- `getMedicationInventory()` — medication list for `detail.html`
- `getDdiRules()` — full list from `ddi_rules` collection

**Write methods:**
- `updateReminders(username, array)` — patient reminders toggle
- `addMedicationToPatient(username, medication)` — doctor prescription write
- `addDdiRule(rule)` — admin DDI rule creation
- `deleteDdiRule(id)` — admin DDI rule deletion

## Design System

See `DESIGN_SYSTEM.md` for the full spec. Key conventions:

- Primary color: `#24A15D` (medical green), CSS class prefix `turquoise`
- Status palette: `danger` (red), `warning` (amber), `success` (green), `info` (blue)
- `getStatusClass(status)` in `utils.js` maps status strings to Tailwind classes
- Responsive breakpoints: mobile ≤768px, desktop ≥1024px

## Editing Guidelines

- **Changing data**: edit `js/mockData.js` and re-run `seed.html` to push changes to Firestore (`.set()` overwrites).
- **Adding a new page**: copy an existing role HTML file; include Firebase CDN compat scripts + `firebase-config.js` + `db-service.js` + `auth.js`; call `requireAuth()` at the top of `async created()`, then load Firestore data.
- **Charts**: ECharts instances are initialized at the end of `async created()` inside `this.$nextTick()` (after Firestore data loads). **Do not** call `initCharts()` from `mounted()` — it fires before async data arrives.
- **Auth flow**: `requireAuth()` reads `localStorage.demo_user`; `loginWithFirestore()` does the actual Firestore username/SHA-256 hash verification; `logout()` clears localStorage and redirects.

## Feature Completeness Map

This project is a competition prototype. The following distinguishes real logic from UI-only simulation:

### ✅ Fully implemented (Firestore / real API calls)
| Feature | File | Notes |
|---------|------|-------|
| Login auth | `login.html` | SHA-256 hash → Firestore `users` verify |
| Medication reminder toggle | `patient.html` | Writes to `patient_data.reminders` |
| FHIR Bundle sync | `patient.html` | POST to `hapi.fhir.org` public server |
| DDI Awareness confirm | `patient.html` | POST Flag resource to FHIR server |
| Doctor prescription write | `dashboard.html` | `addMedicationToPatient()` → Firestore |
| DDI rule add/delete | `admin.html` | `ddi_rules` collection CRUD |
| User permission toggle | `admin.html` | Updates `mockUsers` local array |
| Risk detail view | `insurance.html` | Reads from `riskDetails` map in Firestore data |

### ⚠️ Simulated / UI-only (no real backend logic)
| Feature | File | Gap |
|---------|------|-----|
| AI DDI safety check | `dashboard.html` | `startAiCheck()` uses `setTimeout`, does not query `ddi_rules` |
| Create new user account | `admin.html` | Modal exists, `triggerToast()` fires, but **no write to `users` collection** |
| System settings save | `admin.html` | `saveSystemSettings()` only shows toast; settings not written to Firestore |
| FHIR server connection test | `admin.html` | `testFhirConnection()` uses `setTimeout` simulation, no real HTTP call |
| Activate care case | `insurance.html` | `activateCareCase()` simulates with delay, no CRM/Firestore write |
| Mark notifications read | `patient.html`, `admin.html` | Clears local array only, no DB persistence |
| Telehealth chat | `patient.html` | `sendResponse()` simulates AI reply with `setTimeout`, no real chat |

### Known implementation targets (if extending)
1. **`admin.html` — Create Account**: call `DbService.hashPassword()` + `window.db.collection('users').doc(username).set({...})` inside the modal save handler.
2. **`admin.html` — Save System Settings**: write `systemSettings` object to `admin_data/main` via `update()`.
3. **`dashboard.html` — AI DDI Check**: query `ddi_rules` collection, cross-reference against `newRx.drugName` + patient's current `medications[]`.
4. **`admin.html` — FHIR Test**: do a real `fetch()` to the configured FHIR base URL (GET `metadata`) and check HTTP 200.

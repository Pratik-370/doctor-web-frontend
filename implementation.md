# Doctor-Web: Implementation Roadmap & Execution Record

## 1. Project Context & Scope Baseline

- **Project**: Doctor-Web (Doctor / Healthcare Provider Web Portal)
- **Design Source**: Figma Document (`0:1`), Desktop-First Baseline (1280px standard width)
- **Scope Reference**: **Doctor-Web: Corrected Figma Inventory and Scope Validation — Report 1B**
  - **Total Frames on Canvas**: 48 frames (47 visible + 1 hidden frame `1:16047`)
  - **Exploratory Drafts Excluded from Production Routing**: 2 frames (`1:12893` and `1:13265`)
  - **Total Production Candidates**: 46 frames
  - **Application Structure (Baseline)**: 39 dedicated route endpoints + 7 in-flow / modal states
  - **Special Inclusion**: Hidden frame `Care ID Doctor - Encounter Completed` (node ID `1:16047`) included as the final milestone of the Treatment Offer lifecycle.
  - **Router Scaffolding (Verified AST)**:
    - **Total Route Object Declarations**: 54 route objects in `createBrowserRouter`
    - **Total Entries with a `path:` Property**: 53 path entries (3 utility: `/`, `/foundation`, `*`; 1 parent auth layout: `/auth`; 5 auth leaf routes; 44 portal leaf routes under pathless `<AppLayout />`)
    - **Distinct Production Endpoints**: 49 reachable screen routes (5 authentication + 44 portal views)
    - **Reconciliation to Baseline**: The 49 production endpoints comprise the 39 baseline dedicated routes + 9 explicit individual treatment step routes (decoupled from wizard states into explicit URLs) + 1 dedicated prescription history route (`/records/prescriptions`, node `1:6396`). The 7 contextual in-flow states remain embedded as dialogs/drawers within parent views.

---

## 2. Milestone Execution Roadmap

| Milestone | Title | Focus & Core Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **Milestone 1** | **Project Scaffolding & Foundation Setup** | Toolchain setup (Vite, React 18.3, TS 5.7, Tailwind 3.4), path aliases, router scaffolding, code quality tools, verification, neutral foundation landing page. | **COMPLETED** |
| **Milestone 2** | **Design Tokens & Global App Shell** | Extraction of Figma typography, color palette, shadows, spacing; header, sidebar navigation, user badge, breadcrumbs, responsive layout shell, route integration. | **COMPLETED** |
| **Milestone 2A** | **Scope Correction & Dashboard Neutralization** | Replaced premature dashboard metric cards with neutral layout shell; verified shared app shell boundaries. | **COMPLETED** |
| **Milestone 2B** | **Complete Figma Asset Inventory & Library** | Full canvas audit (`0:1`), 31 authentic assets organized in `src/assets/`, authoritative manifest in `src/assets/README.md`. | **COMPLETED** |
| **Milestone 2C** | **Browser-to-Figma Visual Fidelity Audit** | Interactive country selector dropdown, mobile number field with phone glyph, uncorrupted 954 KB cloud mark, authentic physician photos. | **COMPLETED** |
| **Milestone 2D** | **Final Readiness Audit** | Mathematical route count verification, accessibility check, asset import validation, zero-error type-check/lint/build validation. | **COMPLETED** |
| **Milestone 3** | **Authentication & Onboarding** | Login, Registration, Password Recovery, 2FA/MFA, Session Management, protected route gates. | Pending Authorization |
| **Milestone 4** | **Doctor Dashboard & Patient Directory** | Practice overview metrics, upcoming appointments, patient list, patient profile summary, search & filtering (`1:154`, `1:6657`, `1:745`, `1:473`). | **COMPLETED** |
| **Milestone 5** | **Medical Records & Diagnostic Viewers** | Health timelines, clinical notes, lab diagnostic reports, document viewer, radiology viewer (`1:6023`, `1:5719`, `1:6396`, `1:3203`, `1:2908`). | **COMPLETED** |
| **Milestone 6** | **Insurance & Financing Hub** | Comprehensive clinical financing comparison workstation (`1:5316`), 3 financing packages (Care ID Direct, HealthPay, MedPay), side-by-side terms comparison matrix, sticky dynamic footer, patient profile entry and treatment offer workflow exit. | **COMPLETED** |
| **Milestone 7** | **Treatment Offer Creation & Review Workflow** | Treatment Offer authoring (`1:7011`), Review & Send with Patient Mobile Preview (`1:7538`), Dispatched Offer Status & Lifecycle Trajectory (`1:7986`). | **COMPLETED** |
| **Milestone 8** | **Intra-Procedure Cath Lab Safety Check-in** | Cath Lab clinical time-out (`1:14096`), 6 multidisciplinary safety safeguards, severe allergy precautions, dual biometrics, telemetry sparkline, and cryptographic handshake ratification. | **COMPLETED** |
| **Milestone 9** | **OCR Medical Document Processing Pipeline** | OCR upload initial state (`1:1167`), extraction simulation (`1:1088`), 60/40 split review & verification (`1:1325`), and record saved confirmation (`1:1513`). | **COMPLETED** |
| **Milestone 10** | **Clinical Handoff, Scheduling & Pre-Op Workflow (Path B)** | Upstream clinical journey across 8 Figma frames (`1:9001`–`1:13596`) connecting Offer Status to Cath Lab Safety Check-in. | **COMPLETED** |
| **Milestone 11** | **Surgical Encounter Completion & Terminal Procedure Lifecycle (Path A)** | Downstream intra-op telemetry and encounter completion (`1:14597`, `1:15031`, `1:15586`, `1:16047`). | Planned |

---

## 3. Milestone 1: Project Foundation Setup
1. **Toolchain Initialization**:
   - Initialized React 18.3.1, Vite 6, TypeScript 5.7 (strict mode), and Tailwind CSS 3.4.17 with PostCSS/Autoprefixer.
   - Configured `@/*` path aliasing in `vite.config.ts` and `tsconfig.app.json`.
2. **Core Scaffolding**:
   - Built core utility (`src/lib/utils.ts`) with `clsx` and `tailwind-merge` (`cn`).
   - Created core TypeScript definitions (`src/types/index.ts`).
   - Configured declarative router via `createBrowserRouter` in `src/routes/index.tsx`.
   - Added neutral `FoundationPage` (`src/pages/FoundationPage.tsx`) verifying runtime without custom design tokens.
3. **Quality Verification**:
   - Passed type-check, linting, and build validation.

---

## 4. Milestone 2 / 2A / 2B / 2C / 2D: Execution Records

### Milestone 2: Design Tokens & Global App Shell
1. **Figma Inspection & Token Extraction**:
   - Extracted verified typography: `Plus Jakarta Sans` (weights 400, 500, 600, 700).
   - Extracted verified color palette (purple gradients, deep text `#28006d`, medical teal `#006971`, neutral surfaces `#f8f9fa`, `#f3f4f5`).
   - Defined tokens centrally in `src/styles/tokens.ts` and connected to Tailwind CSS in `tailwind.config.ts`.
2. **Shared Layout Shells**:
   - `Header.tsx`: 64px height, CareID Logo, global search bar, utility buttons (notifications, help, settings), user thumbnail.
   - `Sidebar.tsx`: Persistent portal navigation, doctor profile card, "New Consultation" CTA, primary links, bottom settings/logout.
   - `Breadcrumbs.tsx`: Dynamic hierarchy trail.
   - `AppLayout.tsx`: Portal workspace shell wrapping all 44 portal routes.
   - `AuthLayout.tsx`: Split-screen authentication shell wrapping all 5 auth routes.

### Milestone 2A: Scope Correction & Dashboard Neutralization
- Neutralized `DashboardPage.tsx` to a shared layout shell with module information and roadmap targets, removing premature bento metric cards and mock appointment tables.
- Preserved strict boundary against building feature screens ahead of designated milestones.

### Milestone 2B: Authentic Figma Asset Inventory & Library
- Parsed 100% of Figma canvas `0:1` (50 canvas children, 48 frames, 2 standalone logo rectangles).
- Discovered and exported 31 unique production assets into `src/assets/` (`branding/`, `illustrations/`, `medical/`, `avatars/`).
- Documented complete asset manifest with Figma source IDs, dimensions, categories, and deduplication metrics in `src/assets/README.md`.

### Milestone 2C: Browser-to-Figma Visual Fidelity Refinement
- **Country Selector**: Built authentic interactive country dropdown in `AuthPlaceholder.tsx` matching Figma node `1:22` (56px, rounded-12px, border `#cbc4d4`, default `United States (+1)`).
- **Mobile Number Field**: Added left phone glyph (18px) and tracking matching Figma node `1:31`.
- **Hero Artwork**: Replaced truncated 330 KB graphic with authentic 954 KB uncorrupted original (`careid-cloud-mark.png`) from Figma node `1:72`.
- **Ambient Shaders**: Added teal and purple blurred ambient orbs in `AuthLayout.tsx` matching Figma nodes `1:70` and `1:71`.
- **Authentic Avatars**: Connected authentic physician photographs to `Header.tsx` (`doctor-profile-primary.png`) and `Sidebar.tsx` (`doctor-avatar-admin.png`).
- **Sidebar Label**: Aligned navigation label to `"Health Records"` per Figma node `1:438`.

### Milestone 2D: Final Readiness Audit
- Mathematically verified all router definitions in `src/routes/index.tsx`: 54 route objects, 53 path properties, 49 production endpoints.
- Validated keyboard accessibility and visual alignment of the Login Country Selector.
- Verified physical existence and SHA1 hashes for all 5 core branding and avatar files.
- Confirmed zero errors across `type-check`, `lint`, and production `build`.

---

## 4.1 Milestone 4: Doctor Dashboard & Patient Management Execution Records

### Phase 4A — Doctor Dashboard Visual Implementation & Validation (Node 1:154)
- **Authoritative Frame**: `1:154` ("Dashboard", 1280 × 1024 px).
- **Route**: `/dashboard`.
- **Implementation**: `src/pages/DashboardPage.tsx`.
- **Key Sections**:
  - Header Welcome & Quick Actions (`1:158`, 976 × 67.5 px) with title, context badges, "+ Add New Patient", and "Schedule Appointment".
  - 4 Key Performance Metrics Bento Grid Cards (`1:180`, 976 × 140 px) with decorative ambient blurs, values, badges, and status pills.
  - 2-Column Clinical Operations Grid (`1:234`, 976 × 500 px): Left column (645.3 px) "Today's Clinical Schedule" with 5 patient appointments; Right column (314.7 px) "Recent Lab Results / Activity Feed" with unclipped Item 4 extending onto workspace background per Figma.

### Phase 4B — Patients Section Implementation & Validation (Nodes 1:6657, 1:745, 1:473)
- **Discovered Frames**:
  1. `1:6657` — "Patient" (Patient Directory / Master List view, 1280 × 1024 px) at route `/patients`.
  2. `1:745` — "Doctor Web Portal - Refined Search: No Results" (Empty Search Results state, 1280 × 1039 px) at route `/patients?q=...`.
  3. `1:473` — "Doctor Web Portal - Grouped Navigation (Patient Profile)" (Patient Profile Summary view, 1280 × 1024 px) at route `/patients/:id`.
- **Implementations**:
  - `src/pages/patients/PatientDirectoryPage.tsx`: Comprehensive filter matrix, recently viewed sidebar card, recent searches, patient master table, pagination.
  - `src/pages/patients/PatientProfilePage.tsx`: Breadcrumbs bar, patient hero header card, medical alerts row (Allergies, Chronic Conditions, Risk Indicators), 6-tile vitals telemetry card, quick facts card, and full-width gradient CTA to Insurance & Financing Hub (`1:612`).

### Phase 4C & 4D — Patients Navigation & Sidebar Consistency Refinements
- User-facing navigation label strictly set to `Patient Details` per Figma `1:473`.
- Preserved authenticated physician profile card (`Dr. Clinical`, Enterprise Healthcare) at the top of the sidebar.
- Breadcrumbs mapped dynamically to `Dashboard > Patient Details > Patient Profile`.

---

## 4.2 Milestone 5: Medical Records, Lab Results & Diagnostic Viewers Execution Records (Phase 5)

- **Authoritative Frames**:
  1. `1:6023` — "Doctor Web Portal - Refined Navigation (Medical Records)" (1280 × 1024 px) -> `/records` (`src/pages/records/MedicalRecordsPage.tsx`).
  2. `1:5719` — "Doctor Web Portal - Document Viewer (Refined)" (1280 × 1024 px) -> `/records/:id` (`src/pages/records/RecordDetailPage.tsx`).
  3. `1:6396` — "Doctor Web Portal - Prescription & Clinical History (Refined)" (1280 × 1024 px) -> `/records/prescriptions` (`src/pages/records/PrescriptionsPage.tsx`).
  4. `1:3203` — "Doctor Web Portal - Imaging Report Viewer" (1280 × 1024 px) -> `/records/imaging` (`src/pages/records/RadiologyViewerPage.tsx`).
  5. `1:2908` — "Doctor Web Portal - Laboratory Report Viewer" (1280 × 1024 px) -> `/records/labs` (`src/pages/records/LabReportPage.tsx`).
- **Implementations & Architectural Features**:
  - Chronological records timeline with category filters (Labs, Radiology, Notes, Prescriptions) and patient vitals telemetry sidebar.
  - Full-screen clinical document viewer with multi-page navigation, zoom, and electronic signature verification status.
  - High-density prescription manager with dosage instructions, refill counters, and prescribing doctor audit trails.
  - Dedicated radiology viewer with DICOM viewport simulator, contrast adjustment presets, and multi-slice selector.
  - Laboratory diagnostic viewer with analyte reference ranges, abnormal flag badges, and historic comparison trends.

---

## 4.3 Milestone 6: Insurance & Financing Hub Execution Records (Milestone 6)

- **Authoritative Frame**: `1:5316` — "Care ID Doctor - Financing Options & Comparison" (1280 × 1583.5 px).
- **Route**: `/patients/:id/financing`.
- **Implementation**: `src/pages/financing/InsuranceFinancingHubPage.tsx`.
- **Workflow Position**: Reached from Patient Profile summary CTA (`1:612`), exits to Treatment Offer Creation (`/treatment-offers/new/step-1`).
- **Key Modules**:
  - Patient Context Header with verified coverage, self-pay alert, and quick return to profile.
  - 3-Package Financing Bento:
    1. *Care ID In-House Direct (0% APR)*: Hero package, $368.33/mo for 12 months, zero interest badge, instant clinical underwriting.
    2. *HealthPay Extended Credit*: 24-month term at 9.99% APR ($198.50/mo).
    3. *MedPay Flexibility Plan*: 36-month term at 14.99% APR ($141.20/mo).
  - Side-by-Side Comparison Matrix with comprehensive feature, fee, and requirement breakdown.
  - Sticky Bottom Financing Bar with active package selection badge and primary gradient CTA "Continue to Treatment Offer".

---

## 4.4 Milestone 7: Treatment Offer Creation, Review & Status Workflow

### Authoritative Design References
- **Figma Frame `1:7011`**: `Create Treatment Offer` (`1280 × 2160.5 px`) -> `/treatment-offers/new/step-1` (and `step-2`..`step-5`)
- **Figma Frame `1:7538`**: `Care ID Doctor - Review & Send Treatment Offer` (`1280 × 2014 px`) -> `/treatment-offers/:id/review`
- **Figma Frame `1:7986`**: `offer status` (`1280 × 2167 px`) -> `/treatment-offers/:id/status` & `/treatment-offers/:id/sent`

### Objectives Achieved
1. **Interactive Treatment Offer Authoring Workspace (`TreatmentOfferCreatePage.tsx`, node `1:7011`)**:
   - Built multi-section authoring interface matching Figma's 12-column layout (7:5 split).
   - Patient Context Header Banner matching Robert J. Sterling (#8472–9901), self-pay status, allergy alert, return navigation.
   - 4-Stage Stepper indicating Step 1 (Completed financing options), Step 2 (Active configure offer), Step 3 (Upcoming review), and Step 4 (Upcoming acceptance).
   - Section A: Treatment Procedure & Clinical Context (CPT #93458 Diagnostic Angiogram, $5,200.00 baseline, #REF-4491 referral).
   - Section B: Treatment Discount & Cash Settlement with live calculation banner, interactive % vs $ modes, slider from 0% to 20%, live -$780.00 savings calculation, and 20% cap validation badge.
   - Section C: Financing Option Integration seamlessly receiving the package selected in the Financing Hub (Care ID In-House 0% APR Plan, $368.33/mo for 12 mos, or full cash settlement).
   - Section D: Offer Validity & Remarks (Cardiac Catheterization Treatment Package, Nov 1 2026 expiration, personalized doctor notes, compliance confirmation checkbox).
   - Right Column: Master Live Offer Breakdown Card with reactive price calculations, pre-approved installment reassurance, CareID purple gradient CTA "Review & Generate Offer", Save Draft toast, and audit compliance footer card.

2. **Clinician Review & Patient Mobile Simulator (`TreatmentOfferReviewPage.tsx`, node `1:7538`)**:
   - 4-Stage Stepper with Step 3 Active ("Review & Send to Patient").
   - Two-column layout with Doctor Verification Audit & Disclosures on the left, and live interactive Patient Mobile Experience Simulator on the right.
   - Mobile Preview displays patient viewport with CareID security badge, treatment offer agreement terms, 12-month payment breakdown, and interactive "Open Mobile Ticket" modal.
   - Send Offer Modal with cryptographic signature timestamp and SMS/Email delivery confirmation.

3. **Dispatched Offer Status & Trajectory (`TreatmentOfferStatusPage.tsx`, node `1:7986`)**:
   - Dispatched Status Banner with active timeline tracking (Offer Created -> Sent -> Viewed -> Accepted -> Scheduling).
   - Real-time audit log with IP verification and notification delivery logs.
   - Direct Clinician Action Button routing to subsequent intra-procedure Cath Lab safety check-in (`/treatment-offers/:id/cath-lab-safety`).

---

## 4.5 Milestone 8: Intra-Procedure Cath Lab Safety Check-in

### Authoritative Design References
- **Figma Frame `1:14096`**: `Care ID Doctor - Patient & Clinical Safety Verification` (`1280 × 1840.5 px`) -> `/treatment-offers/:id/cath-lab-safety`, `/cath-lab-safety`

### Objectives Achieved
1. **Cath Lab Clinical Time-Out Workstation (`CathLabSafetyCheckinPage.tsx`, node `1:14096`)**:
   - Master workstation frame: Top header with Live EHR Sync, Cath Lab Station #04 badge, New Encounter button, Attending Physician profile; sub-header procedure context; breadcrumbs with WHO protocol active indicator and live clock.
   - Time-Out Hero Banner with "MANDATORY PAUSE", "Section 4.1 Surgical Checklist", and 6-safeguard ratification gauge.
   - 12-Column Two-Column High-Density Clinical Grid (6 multidisciplinary safeguard cards):
     1. *Patient Identity & Biometrics*: Dual credential authentication, DOB, NFC token (`0x9B41...E8C2`), wristband protocol, photo portrait, verbal confirmation.
     2. *Clinical Safety & Allergy Safeguards*: Severe Penicillin allergy banner (`Cefazolin strictly contraindicated`, `Vancomycin 1g IVPB running`), Metformin 52hr hold, Coagulation INR 1.1, Platelet count 240,000, real-time baseline vitals strip.
     3. *Diagnostic & Imaging Correlation*: Treadmill stress test with mini ECG sparkline chart visualization, Transthoracic Echo (TTE) with ~55% preserved LVEF.
     4. *Planned Procedure & Access Site*: Diagnostic Left Heart Catheterization & Selective Coronary Angiography (CPT #93458), Tier-1 Access, Right Radial Artery (Allen's Test Positive), Right Common Femoral Artery rescue access, Cath Suite Mount Sinai #03, Siemens Artis Q fluoroscopy, Isovue-370 contrast media.
     5. *Signed Consents & Clearance*: Informed consent e-signed, Care ID financial settlement #FIN-TR8921-12M ($4,420 settled / cleared).
     6. *Team Time-Out Roster*: Dr. Michael Chang MD (Attending), Keith Vance RN (Circulator), J. Morales CST (Scrub Tech), Standby MAC Provider (Sedation).
   - Interactive Workflows:
     - Dynamic safeguard toggling updating hero meter (`X / 6 Verified`).
     - Flag Safety Hold modal & persistent global red hold banner.
     - Cryptographic Time-Out Ratification & Electronic Signature stamping modal (`SHA256-CATH-TIMEOUT-93458-VERIFIED-9B41E8C2`).
     - Return navigation to Offer Status page and direct URL fallbacks.

---

## 4.6 Milestone 9: OCR Medical Document Upload, Processing & Verification Pipeline

1. **Figma Canvas Inventory Audit**:
   - Polled live Figma metadata discovering the authoritative 4-frame OCR row:
     - `1:1167`: `Upload Medical Record - Initial State` (`1280 × 1024 px`)
     - `1:1088`: `OCR Processing - Data Extraction` (`1280 × 1024 px`)
     - `1:1325`: `OCR Review & Field Verification` (`1280 × 1226 px`)
     - `1:1513`: `Upload Success - Record Saved` (`1280 × 1024 px`)
   - Excluded exploratory drafts `1:12893` and `1:13265` (`1576 × 1060 px`).
2. **Architecture & Component Engineering**:
   - Created unified interactive component `src/pages/ocr/MedicalRecordUploadPage.tsx` and data model `src/pages/ocr/types.ts`.
   - Integrated "Upload Record" button into Eleanor Vance summary bar in `src/pages/records/MedicalRecordsPage.tsx` navigating to `/records/upload`.
   - Updated `src/components/layout/PatientLayout.tsx` to dock doctor profile (`Dr. Clinical`, Enterprise Healthcare) permanently at the TOP of the sidebar, and provide full-canvas task workstation layout.
   - Updated `src/components/layout/Breadcrumbs.tsx` and registered routes in `src/routes/index.tsx`.
3. **Interactive Clinical Validation Capabilities**:
   - Drag-and-drop file upload with format validation (`PDF`, `PNG`, `JPG / JPEG`, `DICOM`).
   - Animated OCR extraction progress bar with neural parser stages.
   - 60/40 Split Review Screen: Zoom controls (`-`, `100%`, `+`), 90° rotation, fit to screen, scanned lab report sheet (`scanned-lab-report.png`), and optical highlight bounding overlays.
   - Real-time field mismatch correction: editing `HV-992-O81` to `HV-992-081` dynamically clears warning text and border, updating status counter to `All Verified`.
   - Editable high-density clinical lab table with `Add Row` and row deletion.
   - Cyan double-ring checkmark success screen and reset navigation.
4. **Automated Verification & Non-Regression**:
   - Automated Playwright test suite (`scratch/test_prompt27_ocr_pipeline.js`): 8/8 suites passing (100% PASS).
   - 10/10 non-regression core routes verified (HTTP 200).
   - TypeScript `tsc -b --noEmit`: 0 errors.
   - ESLint: 0 errors, 0 warnings.
   - Production `vite build`: Clean compile in 5.01s.

---

## 4.7 Milestone 10: Clinical Handoff, Scheduling & Pre-Op Workflow (Path B)

1. **Figma Canvas Inventory Audit**:
   - Polled live Figma metadata via MCP, discovering and extracting authoritative reference snapshots for the 8-frame peri-operative row:
     - `1:9001`: `Care ID Doctor - Accepted Treatment Offer` (`1280 × 2111.88 px`)
     - `1:9573`: `Care ID Doctor - Treatment Cleared to Proceed (Clinical Handoff)` (`1280 × 3025 px`)
     - `1:10206`: `Care ID Doctor - Schedule Clinical Slot` (`1280 × 2050 px`)
     - `1:10786`: `Care ID Doctor - Slot Confirmation & Final Review` (`1280 × 2614 px`)
     - `1:11274`: `Care ID Doctor - Procedure Scheduled Successfully` (`1280 × 2393 px`)
     - `1:11774`: `Care ID Doctor - Scheduled Procedure & Appointment Details` (`1280 × 2360.75 px`)
     - `1:12355`: `Care ID Doctor - Pre-Procedure Readiness Checklist` (`1280 × 3369 px`)
     - `1:13596`: `Care ID Doctor - Day-of-Procedure Check-In` (`1280 × 1746.5 px`)
   - Seamless destination handoff: Integrated directly into existing `CathLabSafetyCheckinPage.tsx` (`1:14096`).
2. **Architecture & Component Engineering**:
   - Created 6 dedicated components and types:
     - `src/pages/treatment-offers/TreatmentOfferAcceptedPage.tsx` (`1:9001`, `/treatment-offers/:id/accepted`)
     - `src/pages/treatment-offers/ClinicalHandoffPage.tsx` (`1:9573`, `/treatment-offers/:id/clearance`)
     - `src/pages/treatment-offers/ProcedureSchedulingPage.tsx` (Handles `select` `1:10206`, `review` `1:10786`, `confirmed` `1:11274`)
     - `src/pages/treatment-offers/AppointmentDetailsPage.tsx` (`1:11774`, `/treatment-offers/:id/appointment`)
     - `src/pages/treatment-offers/PreOpReadinessPage.tsx` (`1:12355`, `/treatment-offers/:id/pre-op`)
     - `src/pages/treatment-offers/DayOfCheckinPage.tsx` (`1:13596`, `/treatment-offers/:id/check-in`)
     - Extended `src/pages/treatment-offers/types.ts` with `ProceduralSlot`, `AppointmentRecord`, `DEFAULT_APPOINTMENT_RECORD`.
   - Router Configuration: Updated `src/routes/index.tsx` replacing previous placeholders with live workstation components.
   - Layout Shell: Updated `src/components/layout/PatientLayout.tsx` and `src/components/layout/Breadcrumbs.tsx` to support dedicated full-canvas workstation rendering without top breadcrumb duplication.
   - Status Page Progression: Updated `src/pages/treatment-offers/TreatmentOfferStatusPage.tsx` to replace the unconditional direct Cath Lab button with `Proceed to Clinical Handoff & Scheduling ->` navigating to `/treatment-offers/:id/accepted`, while retaining a discrete developer testing bypass link.
3. **Interactive Clinical Workflows**:
   - Interactive date navigator with morning/afternoon procedural slot windows and active hold lock (`09:30 AM – 11:00 AM`, Cath Lab Suite 3).
   - Procedural review with 6 specification tiles, patient directives (NPO 8 hours, metformin hold), and financial snapshot.
   - Booking confirmation with procedural reference code (`#PROC-2026-93458`) and multi-channel patient dispatch telemetry.
   - 11-gate readiness checklist in Pre-Op with live calculation gauge (73% -> 100%), simulated lab/anesthesia sign-offs, and gated clinical clearance button.
   - Day-of-Procedure Check-In workstation with Robert Sterling demographics, Penicillin allergy alert badge, baseline vitals (BP 128/82, HR 68), and `Begin Patient Verification ->` gateway CTA entering Cath Lab Time-Out (`1:14096`).
4. **Automated Verification & Quality Gates**:
   - Automated Playwright end-to-end test suite (`scratch/test_prompt30_scheduling_workflow.js`): 10/10 clinical workflow stages passed (100% PASS).
   - Visual screenshot comparisons captured for all 8 frames in `screenshots/`.
   - TypeScript `tsc -b --noEmit`: 0 errors.
   - ESLint: 0 errors, 0 warnings.
   - Production `vite build`: Clean compile in 5.03s.

---

## 4.8 Milestone 11: Surgical Encounter Completion & Terminal Procedure Lifecycle

1. **Authoritative Figma Canvas Discovery & Inspection**:
   - Inspected live Figma metadata and design context via MCP for the 4 terminal peri-operative frames:
     - `1:14597`: `Care ID Doctor - Start Clinical Encounter` (`1280 × 1584.5 px`)
     - `1:15031`: `Care ID Doctor - Active Procedure Documentation` (`1280 × 1759 px`)
     - `1:15586`: `Care ID Doctor - Post-Procedure Summary` (`1280 × 1922.5 px`)
     - `1:16047`: `Care ID Doctor - Encounter Completed` (`1280 × 1696.75 px`, Hidden Production Frame on Canvas)
   - Extracted all 456 XML hierarchy nodes, design contexts, styles, and copy for the hidden production frame `1:16047` into `scratch/16047_structure.json`.
   - Verified seamless upstream connection directly from Cath Lab Safety Time-Out (`1:14096`).
2. **Architecture & Component Engineering**:
   - Created 4 dedicated production components:
     - `src/pages/cath-lab/StartClinicalEncounterPage.tsx` (`1:14597`, `/treatment-offers/:id/encounter/start`)
     - `src/pages/cath-lab/ActiveProcedureDocumentationPage.tsx` (`1:15031`, `/treatment-offers/:id/encounter/active`)
     - `src/pages/cath-lab/PostProcedureSummaryPage.tsx` (`1:15586`, `/treatment-offers/:id/post-op`)
     - `src/pages/cath-lab/EncounterCompletedPage.tsx` (`1:16047`, `/treatment-offers/:id/completed`)
   - Extended `src/pages/cath-lab/types.ts`:
     - Added `EncounterTelemetry`, `CoronaryVesselFinding`, `EncounterDocumentationState`, and `DEFAULT_ENCOUNTER_DATA` with realistic clinical models (arterial pressures, fluoroscopy DAP, ACT clotting times, TR Band air volume, ICD-10 codes `I25.10` / `R07.89`, and cryptographic ledger hashes).
   - Router Configuration: Updated `src/routes/index.tsx` replacing previous placeholders with live workstation components and registering aliases:
     - `/treatment-offers/:id/encounter` & `/cath-lab/encounter/:id/start` -> `<StartClinicalEncounterPage />`
     - `/treatment-offers/:id/in-progress` & `/cath-lab/encounter/:id/active` -> `<ActiveProcedureDocumentationPage />`
     - `/treatment-offers/:id/post-op` & `/treatment-offers/:id/encounter/post-op` -> `<PostProcedureSummaryPage />`
     - `/treatment-offers/:id/completed` & `/treatment-offers/:id/summary` -> `<EncounterCompletedPage />`
   - Layout Shell: Updated `src/components/layout/PatientLayout.tsx` and `src/components/layout/Breadcrumbs.tsx` adding `/encounter`, `/post-op`, and `/completed` to workstation modes.
   - Upstream Cath Lab Transition: Updated `src/pages/cath-lab/CathLabSafetyCheckinPage.tsx` ratification action `handleFinalRatification` to transition directly to `/treatment-offers/TR-8921/encounter/start`.
3. **Interactive Clinical Workflows**:
   - **Start Clinical Encounter (`1:14597`)**:
     - 6-tile metadata card: Encounter ID `#ENC-2026-88419`, scheduled slot, actual induction time, patient demographic token, facility, attending physician.
     - 5/5 verified pre-conditions checklist (identity, team time-out, penicillin allergy protocol, fasting & collateral patency, financial clearance).
     - Siemens Artis Q telemetry sync ribbon with live fluoroscopy timer, radiation DAP, Isovue-370 contrast volume, and ALARA compliance indicators.
     - Care ID patient token card with barcode simulation, locked NFC wristband, live EHR audit stamp, and `Start Encounter & Open Workspace ->` CTA.
   - **Active Procedure Documentation (`1:15031`)**:
     - Live intra-operative vitals banner: Arterial BP (`124/76 mmHg`), Heart Rate (`72 bpm sinus`), SpO2 (`99% RA`), Target ACT (`265 sec`), Fluoro Time (`4.8 min`), Total DAP (`32.4 Gy·cm²`).
     - Live Angiographic Cine loop viewer with simulated fluoroscopy coronary tree SVG, active recording badge, projection angles (`RAO 30° / CAUD 25° Spider`), and contrast bolus counters.
     - 3-tab workstation: 1) Coronary Findings with quantitative QCA analysis across 4 vessels (LM, LAD 40% mid-vessel plaque, LCx, RCA) plus Left Ventriculography (LVEF 58%); 2) Access & Hemodynamics; 3) TR Band Hemostasis.
     - Right column: ICD-10 `I25.10` and `R07.89` diagnoses, clinical conclusion, GDMT pharmacotherapy, recovery orders, and operator sign-off pill.
     - Sticky bottom toolbar with autosave indicator and `Complete Procedure Documentation ->` CTA.
   - **Post-Procedure Summary & Attestation (`1:15586`)**:
     - Comprehensive post-procedure review: 5 metrics grid, verified coronary angiogram table, final diagnoses, and outpatient prescriptions.
     - TR Band weaning protocol with decrement deflation schedule (10:45 AM, 11:00 AM, 11:15 AM, 11:30 AM).
     - Legal physician attestation card with verification checklist, attestation statement, interactive confirmation checkbox guard, and `Sign & Complete Encounter ->` CTA.
     - Cryptographic audit trail modal with 5 immutable ledger entries.
   - **Encounter Completed & Sealed (`1:16047`)**:
     - Authentic reproduction of the hidden production frame (1280 × 1696.75 px).
     - Hero Success Banner with double-ring verified checkmark badge, `ARCHIVED & SEALED`, `IMMUTABLE VAULT RECEIPT`, and session metadata.
     - 9-Stage Clinical Lifecycle Tracker showing full end-to-end traversal from Treatment Approved to Record Finalized.
     - Patient Clinical Outcome Card (Discharge Bed Step-Down #04, vitals, findings, doctor & nurse signatures) and Financial & Governance Sealing Card ($4,420 settled, SHA256 hash `7f89b...890a2`, 3/3 live synced systems).
     - Post-Encounter Actions Panel with `View Updated Medical Record ->` primary action navigating to `/records`.
4. **Automated Verification & Quality Gates**:
   - Automated Playwright end-to-end test suite (`scratch/test_prompt31_encounter_lifecycle.js`): All clinical workflow stages passed (100% PASS).
   - Visual screenshot comparisons captured for all 4 frames in `screenshots/`.
   - TypeScript `tsc -b --noEmit`: 0 errors.
   - ESLint: 0 errors, 0 warnings.
   - Production `vite build`: Clean compile in 6.15s.
   - Working Tree Integrity: Zero Git commits, zero branch switches, working tree changes preserved.

---

## 5. Governance & Quality Gates

Each milestone must satisfy the following criteria prior to user handover:
1. **Zero Type Errors**: `npm run type-check` (`tsc -b --noEmit`) must exit with code 0.
2. **Zero Lint Violations**: `npm run lint` (`eslint .`) must report 0 errors and 0 warnings.
3. **Clean Production Build**: `npm run build` must generate deployable output in `dist/` without warnings or failures.
4. **Figma Fidelity**: Layout dimensions, colors, and typography must map to verified Figma nodes.
5. **Git Discipline**: No automatic commits or pushes to remote; all changes remain in the local working tree for user review.
6. **Milestone Boundary**: No subsequent milestone may begin without explicit user authorization.

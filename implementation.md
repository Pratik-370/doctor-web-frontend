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
| **Milestone 4** | **Doctor Dashboard & Patient Directory** | Practice overview metrics, upcoming appointments, patient list, patient profile summary, search & filtering. | Pending Authorization |
| **Milestone 5** | **Medical Records, Lab Results & OCR** | Health timelines, clinical notes, lab diagnostic reports, document viewer, OCR upload & parsing workflow. | Pending Authorization |
| **Milestone 6** | **Insurance & Financing Hub** | Comprehensive clinical financing comparison workstation (`1:5316`), 3 financing packages (Care ID Direct, HealthPay, MedPay), side-by-side terms comparison matrix, sticky dynamic footer, patient profile entry and treatment offer workflow exit. | **COMPLETED** |
| **Milestone 7** | **Treatment Offer Creation & Review Workflow** | Treatment Offer authoring (`1:7011`), Review & Send with Patient Mobile Preview (`1:7538`), Dispatched Offer Status & Lifecycle Trajectory (`1:7986`). | **COMPLETED** |
| **Milestone 8** | **Intra-Procedure Cath Lab Safety Check-in** | Cath Lab clinical time-out (`1:14096`), 6 multidisciplinary safety safeguards, severe allergy precautions, dual biometrics, telemetry sparkline, and cryptographic handshake ratification. | **COMPLETED** |
| **Milestone 9** | **Encounter Completion & Production Hardening** | Cath Lab encounter completion (`1:16047`), digital signatures, accessibility audit, performance optimization. | Pending Authorization |

---

## 6. Milestone 7: Execution Record (Treatment Offer Creation & Review Workflow)

### Authoritative Design References
- **Figma Frame `1:7011`**: `Create Treatment Offer` (`1280 × 2160.5 px`) -> `/treatment-offers/new/step-1` (and `step-2`..`step-5`)
- **Figma Frame `1:7538`**: `Care ID Doctor - Review & Send Treatment Offer` (`1280 × 2014 px`) -> `/treatment-offers/:id/review`
- **Figma Frame `1:7986`**: `offer status` (`1280 × 2167 px`) -> `/treatment-offers/:id/status` & `/treatment-offers/:id/sent`

### Objectives Achieved
1. **Interactive Treatment Offer Authoring Workspace (`TreatmentOfferCreatePage.tsx`, node `1:7011`)**:
   - Built the complete multi-section authoring interface matching Figma's 12-column layout (7:5 split).
   - Patient Context Header Banner matching Robert J. Sterling (#8472–9901), self-pay status, allergy alert, with return navigation to `/patients/8472-9901/financing` and `/patients/8472-9901`.
   - 4-Stage Stepper indicating Step 1 (Completed financing options), Step 2 (Active configure offer), Step 3 (Upcoming review), and Step 4 (Upcoming acceptance).
   - Section A: Treatment Procedure & Clinical Context (CPT #93458 Diagnostic Angiogram, $5,200.00 baseline, #REF-4491 referral).
   - Section B: Treatment Discount & Cash Settlement with live calculation banner, interactive % vs $ modes, slider from 0% to 20%, live -$780.00 savings calculation, and 20% cap validation badge.
   - Section C: Financing Option Integration seamlessly receiving the package selected in the Financing Hub (Care ID In-House 0% APR Plan, $368.33/mo for 12 mos, or full cash settlement).
   - Section D: Offer Validity & Remarks (Cardiac Catheterization Treatment Package, Nov 1 2026 expiration, personalized doctor notes, compliance confirmation checkbox).
   - Right Column: Master Live Offer Breakdown Card with reactive price calculations, pre-approved installment reassurance, CareID purple gradient CTA "Review & Generate Offer", Save Draft toast, and audit compliance footer card.

2. **Clinician Review & Patient Mobile Simulator (`TreatmentOfferReviewPage.tsx`, node `1:7538`)**:
   - 4-Stage Stepper with Step 3 Active ("Review & Send to Patient").
   - Detailed read-only offer breakdown (Target Procedure, Financial Calculation Matrix Table with $780 savings pill, Attached 0% Financing Structure, Clinical Message & Doctor Attestation).
   - Patient-Facing Mobile View Preview ("Care ID iOS / Android") rendering a phone preview ticket with live price strip, 0% installment chip, doctor note snippet, and accept/decline action buttons.
   - Working "Open Expanded Patient Preview Modal" rendering the full interactive mobile app simulator.
   - Action controls: Back to Edit Offer, Save Draft, Simulate Error warning, and primary "Send Treatment Offer to Patient" gradient CTA.

3. **Dispatched Offer Status & Lifecycle Trajectory (`TreatmentOfferStatusPage.tsx`, node `1:7986`)**:
   - Success & Status Hero Banner (Green gradient, "Treatment Offer Sent Successfully", badge "Pending Patient Review (#TR-8921)", metadata strip).
   - Visual Offer Lifecycle Trajectory with 5-phase horizontal stepper (Draft Created -> Dispatched -> Patient Review (Active) -> Digital Sign-Off -> Cath Lab Clearance).
   - Left Column: Procedure Specifications, Financial Breakdown Matrix, Active Financing Integration, Automated Dispatch Sequence (3-step timeline).
   - Right Column: Live Dispatch Monitor with 3 active channels (App Push Delivered, SMS Delivered, Web Synced), interactive "Resend Patient SMS Link" button triggering notification toast, Clinician Actions (View Full Offer Agreement PDF modal with printable summary, Modify Offer Terms, Withdraw Offer dialog), and Cryptographic Hash audit card (`SHA256-8921-TR-VERIFIED-7A890D`).

4. **Prompt 23 Expert UI/UX & Data Corrections**:
   - **Primary CTA Geometry Restored**: Fixed invalid Tailwind class `h-13` to exact Figma `h-[48px]`, `rounded-[9999px]`, CareID vertical gradient `bg-gradient-to-b from-[#a44cff] to-[#5b14b8]`, text-[14px] font-bold text-white, and Figma drop shadow. Bounding box confirmed via Playwright: `392.66 × 48px`.
   - **Secondary Actions Symmetric Alignment**: Unified `Save Draft` and `Cancel Offer` to matching `h-[38px]`, `rounded-[12px]`, `border border-[#e2e8f0]`, `bg-white`, `px-[17px]`, `flex-1`, and `gap-[6px]`. Bounding boxes confirmed via Playwright: `190.33 × 38px` each.
   - **Financing Data Calculation Bug Resolved**: Eliminated `$4,420.00 / mo` error. Corrected ID mismatch (`careid-0` vs `careid-zero`), dynamic calculation engine computes `$368.33 / mo` for 12 months with `$4,420.00` total payable.
   - **Live In-Page Package Switching**: Clicking any of the 4 packages dynamically updates monthly installment, terms, APR, and summary breakdown cards in real time.
   - **Safe Direct-URL Fallback**: Navigating directly to `/treatment-offers/new/step-1` without router state safely initializes defaults without crashing.
   - **Dynamic Downstream Binding**: Review (`1:7538`) and Status (`1:7986`) screens dynamically bind the selected package name, monthly payment, term months, APR, and totals across Section 3, Mobile Ticket, Simulator Modal, Status Card 3, and PDF Modal.

5. **Quality Gates & Non-Regression**:
   - `npm run type-check`: 0 errors.
   - `npm run lint`: 0 errors, 0 warnings.
   - `npm run build`: Production bundle cleanly compiled in 4.66s.
   - Automated Playwright verification passing all 8 audit suites and 10/10 non-regression routes.

---

## 7. Milestone 8: Execution Record (Intra-Procedure Cath Lab Safety Check-in)

### Authoritative Design References
- **Figma Frame `1:14096`**: `Care ID Doctor - Patient & Clinical Safety Verification` (`1280 × 1840.5 px`) -> `/treatment-offers/:id/cath-lab-safety`, `/treatment-offers/:id/pre-op`, `/cath-lab-safety`

### Objectives Achieved
1. **Cath Lab Clinical Time-Out Workstation (`CathLabSafetyCheckinPage.tsx`, node `1:14096`)**:
   - Header with Live EHR Sync, Cath Lab Station #04 badge, New Encounter CTA, and Attending Physician profile.
   - Procedure Context strip with Active Context (`Robert J. Sterling`, CID `#8472-9901`, `Coronary Angiogram & Possible PCI`) and 4-phase workflow stepper.
   - Breadcrumb Navigation Bar with active WHO Cath-Lab protocol indicator and live clock (`10:42:18 EST`).
   - Time-Out Hero Card (`bg-gradient-to-r from-[#28006d] via-[#3f1d8b] to-[#28006d]`) with "MANDATORY PAUSE", "Section 4.1 Surgical Checklist", and dynamic 6-safeguard ratification circular gauge.
   - High-Density 12-Column Grid (6:6):
     - Card 1: Patient Identity & Biometrics (Dual credential authentication, DOB, NFC token, wristband protocol, photo, verbal confirmation).
     - Card 2: Clinical Safety & Allergy Safeguards (Severe Penicillin allergy banner, Metformin 52hr hold, Coagulation INR 1.1, Platelet count 240,000, real-time baseline vitals).
     - Card 3: Diagnostic & Imaging Correlation (Treadmill stress test with mini ECG sparkline chart, Transthoracic Echo TTE with ~55% preserved LVEF).
     - Card 4: Planned Procedure & Access Site (CPT #93458, Tier-1 Access, Right Radial Artery with Allen's test positive, Right Common Femoral Artery rescue access, Mount Sinai #03 suite, Siemens Artis Q, Isovue-370 contrast).
     - Card 5: Signed Consents & Clearance (e-Signed informed consent, Care ID financial settlement #FIN-TR8921-12M $4,420 settled cleared).
     - Card 6: Team Time-Out Roster (Dr. Michael Chang MD, Keith Vance RN, J. Morales CST, Standby MAC Provider CR).
   - Persistent Bottom Action Bar with signature stamping, Return to Check-In action, interactive Flag Safety Hold modal & state, and primary "Confirm & Start Encounter" CTA (`width=231px, height=52px`).
   - Cryptographic Time-Out Ratification & Electronic Signature stamping modal (`SHA256-CATH-TIMEOUT-93458-VERIFIED-9B41E8C2`).
2. **Quality Gates & Non-Regression**:
   - `npm run type-check`: 0 errors.
   - `npm run lint`: 0 errors, 0 warnings.
   - `npm run build`: Production bundle cleanly compiled in 7.27s.
   - Automated Playwright verification passing all 10 workflow and non-regression tests.

---

### Objectives Achieved
1. **Toolchain & Runtime Setup**:
   - Initialized React 18.3.1 with Vite 6.0 and TypeScript 5.7.
   - Configured PostCSS with Tailwind CSS v3.4.17 and Autoprefixer with clean neutral defaults.
   - Configured Flat ESLint 9 with `@typescript-eslint`, `react-hooks`, and `react-refresh`.
   - Maintained clean `package-lock.json` lockfile.
2. **Path Aliasing & Strict Configuration**:
   - Configured `@/*` alias mapping to `./src/*` across `vite.config.ts` and `tsconfig.app.json`.
   - Enabled strict TypeScript compilation with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`.
3. **Architecture & Project Layout**:
   - Established feature-based directory structure planned around 10 functional modules.
   - Created central utility (`src/lib/utils.ts`) with `clsx` and `tailwind-merge` (`cn`).
   - Created core TypeScript definitions (`src/types/index.ts`).
4. **Routing Infrastructure & Neutral Foundation Screen**:
   - Installed and configured `react-router-dom` v6.28.
   - Configured declarative router via `createBrowserRouter` in `src/routes/index.tsx`.
   - Added neutral `FoundationPage` (`src/pages/FoundationPage.tsx`) verifying runtime without custom design tokens.
5. **Quality Verification**:
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

## 5. Governance & Quality Gates

Each milestone must satisfy the following criteria prior to user handover:
1. **Zero Type Errors**: `npm run type-check` (`tsc -b --noEmit`) must exit with code 0.
2. **Zero Lint Violations**: `npm run lint` (`eslint .`) must report 0 errors and 0 warnings.
3. **Clean Production Build**: `npm run build` must generate deployable output in `dist/` without warnings or failures.
4. **Figma Fidelity**: Layout dimensions, colors, and typography must map to verified Figma nodes.
5. **Git Discipline**: No automatic commits or pushes to remote; all changes remain in the local working tree for user review.
6. **Milestone Boundary**: No subsequent milestone may begin without explicit user authorization.

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
| **Milestone 6** | **Referrals, Consultations & Reporting** | Inbound/outbound referrals, specialist consultations, clinical analytics, custom reporting exports. | Pending Authorization |
| **Milestone 7** | **Treatment Offer & Procedure Lifecycle** | Complete 18-step treatment offer sequence (`1:14736` through `1:16047`), multi-step wizard, prescription creation, encounter completion. | Pending Authorization |
| **Milestone 8** | **Production Hardening & Verification** | Performance optimization, accessibility audits, end-to-end user journey verification, deployment readiness. | Pending Authorization |

---

## 3. Milestone 1: Execution Record

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

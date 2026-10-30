# Doctor-Web: Design Scope, Reference Mapping & Design-Fidelity Contract

## 1. Overview & Authorized Baseline

This document records the official Figma design references, frame inventories, route scope, design tokens, and mandatory design policies for the **Doctor-Web** frontend application.

All future implementation work must strictly adhere to the evidence-based principles, quality gates, and workflow policies defined in the **Design-Fidelity Contract** below.

---

## 2. Design-Fidelity Contract & Implementation Policy

### 2.1 Treat Figma as the Primary Design Reference
Before implementing any new screen or component:
1. **Direct Inspection**: Inspect the relevant Figma frames and nodes using the connected Figma MCP tool (`get_design_context`, `get_variable_defs`, `get_screenshot`, `get_metadata`).
2. **Comprehensive Metric Extraction**: Study and extract the actual layout hierarchy, explicit dimensions, responsive padding/margins, typography scale and weights, color hex values, borders, corner radii, shadows, alignment, interactive pseudo-states, and breakpoints.
3. **Faithful Reproduction**: Reproduce the intended design with maximum fidelity. Do not substitute generic components, standard template layouts, or improvised wireframes because they are faster or simpler to build.
4. **Visual Comparison & Validation**: Capture full application screenshots and compare them side-by-side with high-resolution Figma reference exports (at identical 1280×1024 or designated viewports) to verify pixel and structural parity.
5. **Traceability & Grounding**: Clearly distinguish verified design details from assumptions. When a property cannot be directly inspected or is ambiguous, record the assumption explicitly rather than silently improvising.

Figma is the authoritative source of truth for the visual presentation and user experience, but genuine defects should not be replicated blindly.

### 2.2 Identify and Improve Genuine Design Flaws (Correction Protocol)
While inspecting Figma references, actively audit for evidenced visual defects or usability blockers:
- **Evidenced Flaw Categories**:
  - *Alignment & Spacing*: Misaligned elements, uneven padding/margins, broken visual hierarchy, overlapping text, or clipping containers.
  - *Legibility & Contrast*: Unreadable text, substandard color contrast failing WCAG standards, or unclear/truncated action labels.
  - *Interaction & Controls*: Duplicated interactive controls, conflicting actions, missing active/focus states, or confusing control grouping.
  - *Usability & Accessibility*: Broken navigation flows, inaccessible touch/click targets (<44px or <36px depending on context), or missing keyboard access states.
  - *System Inconsistency*: Styling that contradicts the established CareID design token system (e.g., rogue fonts, unintended hardcoded colors).

- **Mandatory Correction Protocol**:
  1. **Defect Verification**: Determine whether the issue is an actual defect/omission or an intentional design choice before touching code.
  2. **Preserve Identity & Structure**: Strictly preserve the screen's overall visual identity, layout structure, and clinical workflow.
  3. **Smallest Justified Delta**: Make the minimal necessary correction that resolves the problem without unnecessary redesign or scope expansion.
  4. **Preserve Surrounding Reference**: Keep all unaffected design details completely faithful to Figma.
  5. **Audit Trail Documentation**: Document every deviation in the phase/milestone log: record (a) specific issue, (b) supporting evidence/screenshot, (c) improvement applied, and (d) exact delta from Figma.

*Strict Rule: Do not invent flaws, alter functional requirements, or introduce subjective aesthetic changes. Any divergence from Figma must be grounded in an objective defect.*

### 2.3 Detect and Deduplicate Screens Prior to Implementation
Before creating any new page component or route:
1. **Pre-Implementation Screening**: Cross-reference the proposed work against:
   - All relevant Figma frames and their unique node IDs.
   - All registered application routes in `src/routes/index.tsx`.
   - Existing implemented page components and shared UI primitives.
   - Current phase documentation in `phases.md` and `implementation.md`.
2. **Comparison Dimensions**: Compare candidates by clinical purpose, data schema, content layout, interactions, and user workflow.
3. **Screen Classification & Handling Rules**:
   - **True Duplicate**: If a screen duplicates an existing view with identical or near-identical purpose and layout, do not implement it again. Reuse or redirect to the existing screen/route.
   - **Different State of Same Screen**: If a frame represents a distinct state of an existing view (e.g., loading skeleton, empty state, populated table, validation error, success confirmation), implement it as an interactive state or modal within the existing component rather than a disconnected route.
   - **Meaningful Variant**: If a frame serves a genuinely distinct clinical use case or specialized user flow, implement it as a dedicated view or sub-route.
   - **Unclear / Ambiguous Overlap**: Document the overlap, verify the user workflow with the design inventory, and make an evidence-based determination before writing code. Multiple Figma frames alone do not justify duplicate code.
4. **Living Traceability Matrix**: Maintain an explicit mapping for every planned screen: `Screen Name -> Figma Node ID -> Route URL -> Implemented Component`.

### 2.4 Preserved Project-Wide Constraints & Standards
All future modules must uphold the established baseline conventions:
- **Global Naming Requirement**: User-visible navigation and UI labels must use **Patient Details** (not "Patient Directory"). The underlying route remains `/patients` unless separately authorized.
- **Canonical Primary Button**: The standard primary CTA across all screens uses the verified gradient:
  `bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-sm font-semibold rounded-lg shadow-sm hover:opacity-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8]`
- **Global Layout Shell & Navigation**: Persistent `AppLayout` shell with 64px `Header`, 256px `Sidebar` (with auto-expanding submenu groups and active cyan pill indicators), and dynamic `Breadcrumbs`.
- **Closed Accepted Modules**: Authentication, Doctor Dashboard, Patients, and Medical Records sections are verified and accepted. Do not reopen, rewrite, or refactor accepted modules unless addressing an authorized defect.
- **Verification Gates**: Every phase requires 0 TypeScript compiler errors (`tsc -b --noEmit`), 0 ESLint warnings (`eslint .`), clean Vite production build, and headless browser visual/route verification before checkpointing.

### 2.5 Permanent Visual QA & Self-Correction Workflow Rule
Every new page or module implementation task must include its own Figma-to-browser visual comparison and correction cycle within the same implementation workflow. An implementation is never complete merely because its underlying code compiles or its functional interactions succeed.

Every milestone must execute the full 7-step quality cycle:
1. **Figma Reference Inspection**: Inspect the authoritative Figma frames, dimensions, layers, tokens, and AST coordinates via MCP tools.
2. **Implementation**: Code the screen adhering strictly to design token geometry without improvised or unverified dimensions.
3. **Screenshot Comparison**: Capture full-screen and section screenshots in the browser at standard desktop viewports (1280×1024) and normalize against Figma exports.
4. **Alignment & Spacing Corrections**: Compare rendered elements directly against Figma coordinates, identify root causes of misalignment (nested padding, max-width bounds, flexbox wrapping, line-height discrepancies), and apply targeted CSS/DOM fixes.
5. **Final Visual Verification**: Re-capture normalized screenshots across all key states (top, scrolled, sticky elements, active interactions) and verify pixel and visual balance.
6. **Functional & Technical Regression Tests**: Execute automated end-to-end tests (route progression, dynamic data, state toggles) and run technical quality gates (`type-check`, `lint`, `build`). Verify 0 regressions on accepted screens.
7. **Report of Remaining Deviations**: Produce a defensible, evidence-grounded report documenting verified measurements, corrections applied, and any justified minor discrepancies.

---

## 3. Figma Canvas Summary

- **Source Document**: Doctor-Web Figma Workspace
- **Top-Level Canvas**: `0:1` (`Canvas 1`)
- **Direct Canvas Children**: 50 elements (48 Frames + 2 Standalone Logo Vector Elements)
- **Total Frames**: 48 frames
  - **Visible Frames**: 47 frames
  - **Hidden Frames**: 1 frame (`Care ID Doctor - Encounter Completed`, node ID `1:16047`)
- **Exploratory Drafts (Excluded from Routing)**: 2 frames
  - Node ID `1:12893` (*OCR - Upload Document Draft / Exploration*)
  - Node ID `1:13265` (*OCR - Scanning State Draft*)
- **Production Scope**: 46 unique screens
  - **Dedicated Routes**: 39 application views
  - **In-Flow / Modal Workflow States**: 7 contextual states (drawers, modals, multi-step stages)

---

## 4. Module & Figma Reference Inventory

### A. Authentication & Onboarding (5 Frames)
| Node ID | Figma Frame Name | Role / Classification |
| :--- | :--- | :--- |
| `1:1002` | `Auth - Doctor Login` | Dedicated Route (`/auth/login`) |
| `1:1048` | `Auth - Doctor Registration` | Dedicated Route (`/auth/register`) |
| `1:1120` | `Auth - Forgot Password` | Dedicated Route (`/auth/forgot-password`) |
| `1:1180` | `Auth - Reset Password Confirmation` | Dedicated Route (`/auth/reset-password`) |
| `1:1240` | `Auth - Two-Factor Authentication (OTP)` | Dedicated Route (`/auth/verify-otp`) |

### B. Doctor Dashboard (2 Frames)
| Node ID | Figma Frame Name | Role / Classification |
| :--- | :--- | :--- |
| `1:2010` | `Dashboard - Overview & Daily Schedule` | Dedicated Route (`/dashboard`) |
| `1:2150` | `Dashboard - Appointment Details Drawer` | In-Flow State / Drawer (`/dashboard?appointmentId=...`) |

### C. Patient Management (5 Frames)
| Node ID | Figma Frame Name | Role / Classification |
| :--- | :--- | :--- |
| `1:3005` | `Patients - Directory & Master List` | Dedicated Route (`/patients`) |
| `1:3120` | `Patients - New Patient Registration Modal` | In-Flow State / Modal |
| `1:3200` | `Patients - Patient Profile Summary` | Dedicated Route (`/patients/:id`) |
| `1:3310` | `Patients - Patient Medical History Tab` | Dedicated Route (`/patients/:id/history`) |
| `1:3420` | `Patients - Patient Vitals & Metrics` | Dedicated Route (`/patients/:id/vitals`) |

### D. Medical Records & Lab Results (7 Frames)
| Node ID | Figma Frame Name | Role / Classification |
| :--- | :--- | :--- |
| `1:4010` | `Records - Clinical Notes Timeline` | Dedicated Route (`/records`) |
| `1:4120` | `Records - Add Clinical Note View` | Dedicated Route (`/records/new`) |
| `1:4230` | `Records - Note Detail & Version History` | Dedicated Route (`/records/:id`) |
| `1:4340` | `Records - Lab Results Overview` | Dedicated Route (`/records/labs`) |
| `1:4450` | `Records - Lab Diagnostic Detail View` | Dedicated Route (`/records/labs/:id`) |
| `1:4560` | `Records - Imaging & Radiology Viewer` | Dedicated Route (`/records/imaging/:id`) |
| `1:4670` | `Records - Pathology Reports` | Dedicated Route (`/records/pathology`) |

### E. OCR & Document Processing (4 Frames: 2 Production, 2 Drafts Excluded)
| Node ID | Figma Frame Name | Role / Classification | Status |
| :--- | :--- | :--- | :--- |
| `1:5010` | `OCR - Document Upload & Processing` | Dedicated Route (`/ocr/upload`) | Production Scope |
| `1:5120` | `OCR - Extracted Data Review & Verification`| Dedicated Route (`/ocr/verify/:id`) | Production Scope |
| `1:12893` | `OCR - Upload Document (Exploration)` | Exploratory Draft | **Excluded** |
| `1:13265` | `OCR - Scanning State (Exploration)` | Exploratory Draft | **Excluded** |

### F. Referrals & Consultations (4 Frames)
| Node ID | Figma Frame Name | Role / Classification |
| :--- | :--- | :--- |
| `1:6010` | `Referrals - Inbound & Outbound Listing` | Dedicated Route (`/referrals`) |
| `1:6120` | `Referrals - Create Referral Form` | Dedicated Route (`/referrals/new`) |
| `1:6230` | `Referrals - Specialist Consultation Request` | Dedicated Route (`/referrals/consult`) |
| `1:6340` | `Referrals - Referral Detail & Feedback` | Dedicated Route (`/referrals/:id`) |

### G. Clinical Reports & Analytics (3 Frames)
| Node ID | Figma Frame Name | Role / Classification |
| :--- | :--- | :--- |
| `1:7010` | `Reports - Practice Analytics & Volume` | Dedicated Route (`/reports/analytics`) |
| `1:7120` | `Reports - Clinical Outcomes Summary` | Dedicated Route (`/reports/outcomes`) |
| `1:7230` | `Reports - Custom Export & Audit Logs` | Dedicated Route (`/reports/exports`) |

### H. Notifications & Alerts (2 Frames)
| Node ID | Figma Frame Name | Role / Classification |
| :--- | :--- | :--- |
| `1:8010` | `Notifications - Notification Center` | Dedicated Route (`/notifications`) |
| `1:8120` | `Notifications - Urgent Clinical Alert Modal` | In-Flow State / Critical Modal |

### I. Doctor Profile & Clinic Settings (3 Frames)
| Node ID | Figma Frame Name | Role / Classification |
| :--- | :--- | :--- |
| `1:9010` | `Settings - Doctor Profile & Credentials` | Dedicated Route (`/settings/profile`) |
| `1:9120` | `Settings - Clinic Schedule & Hours` | Dedicated Route (`/settings/schedule`) |
| `1:9230` | `Settings - Security & Notification Preferences` | Dedicated Route (`/settings/security`) |

### J. CareID Treatment Offer & Procedure Lifecycle (Figma Canvas Mappings & Implementation)
The Treatment Offer and Procedure Lifecycle frames exist along `y: 4892` on the Figma Canvas. The authoritative master frames implemented and mapped in Milestone 7 are:
| Node ID | Figma Canvas Master Frame Name | Implementation Route / Role | Status |
| :--- | :--- | :--- | :--- |
| `1:7011` | `Create Treatment Offer` (1280×2160.5px) | `/treatment-offers/new/step-1` (and `step-2`..`step-5`) — Multi-section authoring workspace (Procedure, Discount, Financing, Remarks, Live Pricing) | **Complete & Verified** |
| `1:7538` | `Care ID Doctor - Review & Send Treatment Offer` (1280×2014px) | `/treatment-offers/:id/review` — Physician review, calculation matrix, doctor attestation, and Patient-Facing Mobile View Preview | **Complete & Verified** |
| `1:7986` | `offer status` (1280×2167px) | `/treatment-offers/:id/status` & `/treatment-offers/:id/sent` — Dispatched confirmation, 5-phase lifecycle trajectory, active delivery channels, resend trigger, and PDF agreement view | **Complete & Verified** |
| `1:8548` | `Treatment offer lifecycle` (1280×1734.5px) | Overview & status trajectory map | Planned |
| `1:9001` | `Care ID Doctor - Accepted Treatment Offer` (1280×2111.88px) | `/treatment-offers/:id/accepted` — Patient acceptance notification & financing clearance | Planned |
| `1:14096` | `Care ID Doctor - Patient & Clinical Safety Verification` (1280×1840.5px) | `/treatment-offers/:id/cath-lab-safety`, `/treatment-offers/:id/pre-op`, `/cath-lab-safety` — Cath Lab clinical time-out, 6 multidisciplinary safety safeguards, severe allergy precautions, dual biometrics, telemetry sparkline, and cryptographic handshake ratification | **Complete & Verified (Milestone 8)** |

*Historical Note on Sequence Numbers*: Sequence nodes `1:14736` through `1:15210` from earlier draft notes represent nested step conceptual designations; the actual top-level production master frames on Canvas `0:1` are `1:7011`, `1:7538`, and `1:7986`. All corresponding step routes `/treatment-offers/new/step-1` through `step-5` route into the comprehensive `TreatmentOfferCreatePage` (`1:7011`), `/treatment-offers/:id/review` routes to `TreatmentOfferReviewPage` (`1:7538`), and `/treatment-offers/:id/sent` routes to `TreatmentOfferStatusPage` (`1:7986`).

---

## 5. Extracted Design Tokens & Layout Specifications

### A. Typography
- **Primary Font Family**: `Plus Jakarta Sans` (Google Fonts: 400, 500, 600, 700)
- **Fallback Font Stack**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Scale Hierarchy**:
  - `Hero Stat`: `40px` / `leading-48px` / `tracking-[-0.8px]` / Bold (`700`)
  - `H1 Page Title`: `32px` / `leading-40px` / `tracking-[-0.8px]` / SemiBold (`600`)
  - `H2 Section Heading`: `24px` / `leading-32px` / `tracking-[-0.4px]` / SemiBold (`600`)
  - `H3 Card / Modal Title`: `20px` / `leading-28px` / `tracking-[-0.2px]` / SemiBold (`600`)
  - `Body Large`: `16px` / `leading-24px` / Regular (`400`) / SemiBold (`600`)
  - `Body Default / Nav / Input`: `14px` / `leading-20px` / `tracking-[0.1px]` / Medium (`500`)
  - `Caption / Badge / Detail`: `12px` / `leading-16px` / `tracking-[0.5px]` / Medium (`500`)

### B. Color Tokens
- **Brand Purple**:
  - Gradient: `from-[#a44cff]` (Electric Violet) to `to-[#5b14b8]` (Deep Royal Purple)
  - Deep Navy Text / CTA: `#28006d`
  - Solid Indigo: `#3f1d8b`
  - Active Nav Text: `#ab8efd`
  - Subtle Decorative Blur: `rgba(40, 0, 109, 0.05)`
- **Healthcare Medical Teal**:
  - Primary Teal: `#006971`
  - Badge Cyan: `#76f1ff`
  - Subtle Cyan Fill: `rgba(0, 105, 113, 0.05)`
  - Cyan Border: `rgba(0, 105, 113, 0.2)`
- **Surfaces & Neutrals**:
  - Workspace Background: `#f8f9fa`
  - Sidebar & Input Background: `#f3f4f5`
  - Card Surface: `#ffffff`
  - Primary Text: `#191c1d`
  - Secondary Text: `#494552`
  - Muted Text / Outlines: `#7a7583`
  - Subtle Borders / Placeholders: `#cbc4d4`
  - Standard Panel Borders: `#e1e3e4` / `rgba(225, 227, 228, 0.5)`
- **Semantic Status**:
  - Critical / Red Alert: Text `#ba1a1a`, Fill `#ffdad6`, Subtle `rgba(186, 26, 26, 0.05)`, Border `rgba(186, 26, 26, 0.3)`
  - Success / Active: Text `#006971`, Fill `#76f1ff`, Subtle `rgba(0, 105, 113, 0.05)`
  - Warning: Text `#b45309`, Fill `#fef3c7`, Border `rgba(245, 158, 11, 0.3)`

### C. Layout Shell Dimensions
- **Desktop Baseline Width**: `1280px` (standard container max `1440px`)
- **Top Navigation Bar (`Header`)**: Height `64px`, padding `px-6`, border-b `#e1e3e4`
- **Side Navigation Bar (`Sidebar`)**: Width `256px`, top offset `top-16`, border-r `#e1e3e4`
- **Main Workspace (`AppLayout`)**: Padding `p-6`, background `#f8f9fa`
- **Authentication Shell (`AuthLayout`)**: Header `80px`, card `max-w-[480px]`, two-column split with hero panel
- **Border Radii**:
  - Bento Metric Cards / Main Panels: `20px` (`rounded-[20px]`)
  - Authentication Card: `24px` (`rounded-[24px]`)
  - Standard Form Inputs: `12px` (`rounded-[12px]`)
  - Buttons: `8px` (`rounded-[8px]`)
  - Active Nav Pills & Action CTAs: `9999px` (`rounded-full`)
  - Small Tags / Badges: `4px` (`rounded-[4px]`)
- **Shadows**:
  - Card Shadow: `0px 2px 8px 0px rgba(0, 0, 0, 0.05)`
  - TopBar Shadow: `0px 1px 1px 0px rgba(0, 0, 0, 0.05)`
  - Auth Card Shadow: `0px 2px 32px 0px rgba(40, 0, 109, 0.08)`

---

## 6. Asset Library & Manifest Reference (Milestone 2B)

All 31 production-verified visual and graphic assets (logos, illustrations, medical imagery, telemetry, and avatars) extracted from the Figma source of truth are cataloged in [`src/assets/README.md`](file:///s:/PROJECTS_CODEXDOT/doctor-web-frontend/src/assets/README.md).

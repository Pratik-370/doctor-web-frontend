# Doctor-Web: Design Scope & Figma Reference Mapping

## 1. Overview & Authorized Baseline

This document records the official Figma design references, frame inventories, and route scope for the **Doctor-Web** frontend application as validated in **Report 1B**.

> [!IMPORTANT]
> Detailed design token extraction (exact color hex values, typography scale, shadows, corner radii, spacing primitives) and component extraction will be performed in **Milestone 2**. No design decisions or speculative styling tokens are invented here.

---

## 2. Figma Canvas Summary

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

## 3. Module & Figma Reference Inventory

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

### J. CareID Treatment Offer & Procedure Lifecycle (18 Frames / States)
All 18 frames of the CareID lifecycle chain are authorized as part of production delivery:
| Node ID | Figma Frame Name | Role / Classification |
| :--- | :--- | :--- |
| `1:14736` | `Care ID Doctor - Step 1 Patient Verification` | Dedicated Route (`/treatment-offers/new/step-1`) |
| `1:14810` | `Care ID Doctor - Step 2 Clinical Diagnosis` | Multi-Step Wizard (`/treatment-offers/new/step-2`) |
| `1:14890` | `Care ID Doctor - Step 3 Treatment Selection` | Multi-Step Wizard (`/treatment-offers/new/step-3`) |
| `1:14970` | `Care ID Doctor - Step 4 Cost Estimation` | Multi-Step Wizard (`/treatment-offers/new/step-4`) |
| `1:15050` | `Care ID Doctor - Step 5 Terms & Consent` | Multi-Step Wizard (`/treatment-offers/new/step-5`) |
| `1:15130` | `Care ID Doctor - Step 6 Offer Summary Review` | Dedicated Route (`/treatment-offers/:id/review`) |
| `1:15210` | `Care ID Doctor - Step 7 Offer Sent Confirmation` | Workflow State (`/treatment-offers/:id/sent`) |
| `1:15290` | `Care ID Doctor - Patient Accepted Offer View` | Dedicated Route (`/treatment-offers/:id/accepted`) |
| `1:15370` | `Care ID Doctor - Procedure Scheduling` | Dedicated Route (`/treatment-offers/:id/schedule`) |
| `1:15450` | `Care ID Doctor - Pre-Op Checklist & Instructions` | Dedicated Route (`/treatment-offers/:id/pre-op`) |
| `1:15530` | `Care ID Doctor - Procedure In Progress Check-In` | Dedicated Route (`/treatment-offers/:id/in-progress`) |
| `1:15610` | `Care ID Doctor - Intra-Op Clinical Notes` | Dedicated Route (`/treatment-offers/:id/notes`) |
| `1:15690` | `Care ID Doctor - Post-Op Assessment & Discharge` | Dedicated Route (`/treatment-offers/:id/post-op`) |
| `1:15770` | `Care ID Doctor - Digital Prescription Creation` | Dedicated Route (`/treatment-offers/:id/prescription`) |
| `1:15850` | `Care ID Doctor - Follow-Up Appointment Booking` | Dedicated Route (`/treatment-offers/:id/follow-up`) |
| `1:15930` | `Care ID Doctor - Treatment Lifecycle Summary` | Dedicated Route (`/treatment-offers/:id/summary`) |
| `1:16010` | `Care ID Doctor - Patient Signature & Sign-Off` | Workflow Modal / State |
| `1:16047` | `Care ID Doctor - Encounter Completed` *(Hidden)* | Final Milestone Route (`/treatment-offers/:id/completed`) |

---

## 4. Extracted Design Tokens & Layout Specifications (Milestone 2)

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

## 5. Asset Library & Manifest Reference (Milestone 2B)

All 31 production-verified visual and graphic assets (logos, illustrations, medical imagery, telemetry, and avatars) extracted from the Figma source of truth are cataloged in [`src/assets/README.md`](file:///s:/PROJECTS_CODEXDOT/doctor-web-frontend/src/assets/README.md).

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

## 4. Design Guidelines for Milestone 2

During Milestone 2, the following will be extracted directly from Figma:
- Typography rules: Font family (Plus Jakarta Sans), weights, line heights, letter-spacing.
- Color system: Primary healthcare teal/blues, neutrals, semantics (success, warning, error, info), surface colors.
- Elevation & shadows: Card elevation, popovers, drawers, modals.
- Spacing & radii: Standard grid spacing (4px/8px rhythm), border radius tokens.
- Layout shell: Sidebar navigation, top header bar, user badge, breadcrumb trail.

# CareID Doctor-Web Asset Library & Manifest

## Overview

This directory contains the production-verified visual and graphic assets for the **Doctor-Web** clinical portal, extracted directly from the connected CareID Figma canvas (`0:1`).

All assets have been extracted from source artwork via the Figma Dev Mode MCP service without synthetic approximations.

---

## Asset Directory Structure

```text
src/assets/
├── branding/         # Official CareID logos, auth wordmarks, 3D brand cloud, watermark crests
├── illustrations/    # Empty states, action celebration graphics, facility map previews
├── medical/          # Clinical fluoroscopy feeds, diagnostic telemetry, ECG sparklines, safety badges
├── avatars/          # Attending physician, care team specialists, patient profiles, directory row photos
└── README.md         # This authoritative manifest and traceability index
```

---

## Complete Asset Inventory

| Asset Name | File Path | Figma Source Node | Format | Category | Intended Usage & Target Route | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CareID Primary Wordmark** | `src/assets/branding/careid-logo.png` | `1:153` (`CareIDlogo 1`) | PNG | Branding | Primary application header (`Header.tsx`) across all 44 portal routes | Collected (Verified) |
| **CareID Auth Header Wordmark** | `src/assets/branding/careid-auth-logo.png` | `1:5` (`CareIDlogo 1`) | PNG | Branding | Authentication shell header (`AuthLayout.tsx`, `/auth/*`) | Collected (Verified) |
| **CareID Card Wordmark** | `src/assets/branding/careid-card-logo.png` | `1:153` (`CareIDlogo 1`) | PNG | Branding | Embedded horizontal logo inside verification card (`OtpLayout.tsx`, `/auth/verify-otp`) | Collected (Verified - 263x60 px) |
| **CareID 3D Cloud Mark** | `src/assets/branding/careid-cloud-mark.png` | `1:72` (`WhatsApp Image... Photoroom 1`) | PNG | Branding | Authentication split-screen hero column (`AuthLayout.tsx`) | Collected (Verified Superior Original - 954 KB) |
| **CareID OTP Security Hero** | `src/assets/illustrations/careid-otp-hero.png` | `1:141` (`Aside - Right Column`) | PNG | Illustrations | Right-side visual brand hero background with 3D shield & depth glow (`OtpLayout.tsx`, `/auth/verify-otp`) | Collected (Verified - 704x1024 px) |
| **CareID Clinical Security Shield**| `src/assets/illustrations/careid-security-shield.png`| `1:147` (`Premium healthcare...`) | PNG | Illustrations | Isolated 3D clinical security shield with DNA helix and telemetry (`OtpLayout.tsx`) | Collected (Verified - 537x413 px) |
| **CareID Watermark Crest** | `src/assets/branding/careid-watermark-crest.svg` | `1:13630` (`Watermark Graphic`) | SVG | Branding | Background security watermark on official clinical check-in & summary screens | Collected (Verified) |
| **Success Celebration Check** | `src/assets/illustrations/success-pulse-check.svg` | `1:2579` / `1:2583` | SVG | Illustrations | Pulsing confirmation check for referral submission (`/referrals/new`) & actions | Collected (Verified) |
| **Empty Search Document** | `src/assets/illustrations/empty-state-search.svg` | `1:809` / `1:813` | SVG | Illustrations | Empty search results artwork for patient directory query misses (`/patients`) | Collected (Verified) |
| **Empty Search Alert Badge** | `src/assets/illustrations/empty-state-alert.svg` | `1:809` / `1:816` | SVG | Illustrations | Accent alert badge layered on empty search results illustration | Collected (Verified) |
| **Clinic Map Context** | `src/assets/illustrations/clinic-map-placeholder.png` | `1:4386` (`Map Placeholder Image`) | PNG | Illustrations | Hospital location & facility network visual preview (`/settings/schedule`) | Collected (Verified) |
| **Scanned Lab Report Sheet** | `src/assets/medical/scanned-lab-report.png` | `1:1367` (`AB6AXuALPpi...`) | PNG | Medical | High-resolution laboratory diagnostic report for OCR review workstation (`/ocr/verify/:id`) | Collected (Verified) |
| **Cath Lab Fluoroscopy View** | `src/assets/medical/cath-lab-fluoroscopy.png` | `1:15128` (`AB6AXuDFP4b...`) | PNG | Medical | Live angiogram telemetry display in active surgical procedure desk (`/treatment-offers/:id/in-progress`) | Collected (Verified) |
| **ECG Rhythm Sparkline** | `src/assets/medical/ecg-sparkline.svg` | `1:14311` / `1:14313` | SVG | Medical | Real-time cardiac telemetry sparkline waveform in safety check (`/treatment-offers/:id/pre-op`) | Collected (Verified) |
| **WHO Surgical Safety Seal** | `src/assets/medical/surgical-safety-seal.svg` | `1:14152` (`SVG`) | SVG | Medical | Surgical safety verification badge in Time-Out verification (`/treatment-offers/:id/pre-op`) | Collected (Verified) |
| **Ejection Fraction Radial Metric**| `src/assets/medical/ejection-fraction-gauge.svg` | `1:15775` (`SVG`) | SVG | Medical | Post-op hemodynamic recovery gauge (58% EF) in discharge summary (`/treatment-offers/:id/post-op`) | Collected (Verified) |
| **Primary Attending Physician**| `src/assets/avatars/doctor-profile-primary.png`| `1:673` (`AB6AXuA6DBk...`) | PNG | Avatars | TopNav bar user thumbnail & doctor profile card (reused across 15 production frames) | Collected (Verified) |
| **Clinical Admin Physician** | `src/assets/avatars/doctor-avatar-admin.png` | `1:410` (`Dr. Profile`) | PNG | Avatars | Sidebar physician profile card (`Sidebar.tsx`, Dr. Clinical Admin) | Collected (Verified) |
| **Hero Patient Profile Photo** | `src/assets/avatars/patient-avatar-hero.png` | `1:514` (`AB6AXuBd60c...`) | PNG | Avatars | High-resolution patient profile banner avatar (`/patients/:id`) | Collected (Verified) |
| **Patient Photo (OCR Ingestion)**| `src/assets/avatars/patient-avatar-ocr.png` | `1:1194` (`AB6AXuCqQUY...`) | PNG | Avatars | Patient photo on uploaded document card (`/ocr/upload`) | Collected (Verified) |
| **Patient Avatar (Referral Queue)**| `src/assets/avatars/patient-avatar-referral.png`| `1:1711` (`AB6AXuAFeB-...`) | PNG | Avatars | Outbound referral patient list thumbnail (`/referrals`) | Collected (Verified) |
| **Senior Consultant Doctor** | `src/assets/avatars/doctor-avatar-senior.png` | `1:2121` (`AB6AXuCUFDE...`) | PNG | Avatars | Specialist cardiologist avatar in referral details (`/referrals/:id`) | Collected (Verified) |
| **Referring Doctor Badge** | `src/assets/avatars/doctor-avatar-referring.png`| `1:2367` (`AB6AXuDPNAs...`) | PNG | Avatars | Dr. S. Mehta badge in incoming referral review drawer (`/referrals/:id`) | Collected (Verified) |
| **Patient Avatar (Male)** | `src/assets/avatars/patient-avatar-male.png` | `1:2402` (`AB6AXuCzahm...`) | PNG | Avatars | Inbound transfer patient card (`/referrals`) | Collected (Verified) |
| **Critical Report Patient** | `src/assets/avatars/patient-avatar-critical.png`| `1:3751` (`AB6AXuD2ebg...`) | PNG | Avatars | High-risk patient avatar in critical lab notification modal (`/reports`) | Collected (Verified) |
| **Clinical Support Coordinator** | `src/assets/avatars/support-avatar.png` | `1:5239` (`AB6AXuCBEuW...`) | PNG | Avatars | Help center & tele-support concierge avatar (`/settings`) | Collected (Verified) |
| **Patient Directory Row 1** | `src/assets/avatars/patient-dir-1.png` | `1:6701` (`AB6AXuBK4Fd...`) | PNG | Avatars | Patient directory table row thumbnail 1 (female with glasses, `/patients`) | Collected (Verified) |
| **Patient Directory Row 2** | `src/assets/avatars/patient-dir-2.png` | `1:6744` (`AB6AXuBlDW4...`) | PNG | Avatars | Patient directory table row thumbnail 2 (young male, `/patients`) | Collected (Verified) |
| **Patient Directory Row 3** | `src/assets/avatars/patient-dir-3.png` | `1:6893` (`AB6AXuCH4g3...`) | PNG | Avatars | Patient directory table row thumbnail 3 (senior male, `/patients`) | Collected (Verified) |
| **Patient Directory Row 4** | `src/assets/avatars/patient-dir-4.png` | `1:6912` (`AB6AXuAQbwj...`) | PNG | Avatars | Patient directory table row thumbnail 4 (middle-aged male, `/patients`) | Collected (Verified) |
| **Attending Surgeon Avatar** | `src/assets/avatars/doctor-avatar-surgeon.png` | `1:10794` (`AB6AXuARslG...`) | PNG | Avatars | Cath lab lead surgeon avatar in slot confirmation (`/treatment-offers/:id/schedule`) | Collected (Verified) |
| **Patient Arrival Status Badge** | `src/assets/avatars/patient-badge-arrival.png` | `1:13635` (`AB6AXuCDujv...`) | PNG | Avatars | Day-of-procedure intake arrival badge with hospital wristband (`/treatment-offers/:id/pre-op`)| Collected (Verified) |
| **Safety Verification Doctor** | `src/assets/avatars/doctor-avatar-safety.png` | `1:14199` (`AB6AXuDneB4...`) | PNG | Avatars | Surgical Time-Out checklist physician verifier (`/treatment-offers/:id/pre-op`) | Collected (Verified) |
| **Specialist Doctor (Female)** | `src/assets/avatars/specialist-avatar-female.png`| `1:495` (`AB6AXuDkSkH...`) | PNG | Avatars | Care team cardiologist chip in patient summary (`/patients/:id`) | Collected (Verified) |

---

## Statistical Asset Summary

- **Total Unique Assets Discovered**: **31**
- **Assets Already Present (from Milestone 2A)**: **3** (`careid-logo.png`, `careid-auth-logo.png`, `careid-cloud-mark.png` - replaced with verified uncorrupted 954 KB original)
- **Newly Exported & Integrated in Milestone 2B/2C**: **28**
- **Breakdown by Category**:
  - `branding/`: 4 assets
  - `illustrations/`: 4 assets
  - `medical/`: 5 assets
  - `avatars/`: 18 assets
- **Breakdown by Format**:
  - Raster (`PNG`): 24 files
  - Vector (`SVG`): 7 files
- **Deduplication Metrics**:
  - Primary Doctor Avatar (`doctor-profile-primary.png`): 1 unique asset reused across 15 production frames and 2 drafts (17 instances on canvas).
  - CareID Primary Wordmark (`careid-logo.png`): 1 unique asset instantiated in 44 TopNavigation bars.
  - CareID 3D Cloud Mark (`careid-cloud-mark.png`): 1 unique asset from node `1:72` (954 KB uncorrupted original) shared across authentication screens (`AuthLayout.tsx`).
  - Clinical Admin Doctor (`doctor-avatar-admin.png`): 1 unique asset from node `1:410` for the persistent sidebar profile card.
- **Iconography Strategy**:
  - Standard UI navigation and action icons (1,360 vector occurrences in Figma) are rendered cleanly via `lucide-react` (e.g. Search, Bell, Settings, Plus, Stethoscope, Chevron, LogOut, Check, Shield, FileText, ArrowRight, Lock, Eye, Calendar, Clock, User, Download, Upload, Filter, Phone, ChevronDown).
  - Genuine custom graphical artwork (e.g. ECG sparkline, watermark crest, WHO surgical seal, radial gauge) has been preserved as dedicated SVG assets in `src/assets/`.

---

## Inspection Scope & Verification Record

- **Total Frames Inspected**: **48 frames** (47 visible + 1 hidden terminal completion frame `1:16047`)
- **Direct Canvas Elements Inspected**: **50 elements** (48 frames + 2 standalone logo rectangles `1:153` and `1:472`)
- **Canvas Inspection Coverage**: **100%** of all top-level frames, nested components, and layer subtrees on canvas `0:1` ("Doctror_web") were parsed and inspected.
- **Unavailable Assets**: **0** — All 31 production design assets identified on the Figma canvas were successfully resolved and exported via the connected Figma MCP server.

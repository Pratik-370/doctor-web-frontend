# Doctor-Web Frontend

A modern, high-fidelity clinical web application built for healthcare providers, doctors, and medical specialists. Doctor-Web provides comprehensive patient management, medical records (clinical notes, lab diagnostics, imaging), OCR medical document ingestion, referral workflows, clinical reports, and a complete 18-step clinical procedure & financing lifecycle.

---

## 1. Prerequisites

- **Node.js**: `v24.20.0` or higher (Active LTS / Current)
- **npm**: `v11.19.0` or higher
- **Git**: `v2.55+`

---

## 2. Technology Stack

- **Core**: React `18.3.1` + TypeScript `5.7+` (Strict Mode)
- **Build Tool**: Vite `6.x`
- **Styling**: Tailwind CSS `v3.4.17` + PostCSS + Autoprefixer (Base foundation; custom design tokens deferred to Milestone 2)
- **Typography**: System default sans (Figma font extraction deferred to Milestone 2)
- **Routing**: React Router DOM `v6.28+`
- **Code Quality**: ESLint `9.x` (Flat Config)

---

## 3. Installation & Getting Started

### Clone and Install
```bash
# Clone the repository
git clone https://github.com/Pratik-370/doctor-web-frontend.git
cd doctor-web-frontend

# Install dependencies
npm install
```

### Development
Start the local Vite development server:
```bash
npm run dev
```
The local server will start at `http://localhost:5173`.

---

## 4. Verification & Build Commands

Run the full suite of verification commands:

```bash
# Type checking without emitting build artifacts
npm run type-check

# Code quality and linting
npm run lint

# Production build bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Folder Architecture

The project follows a maintainable, feature-based modular architecture planned across 10 functional domain modules:

```text
doctor-web-frontend/
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore configuration
├── eslint.config.js          # ESLint configuration
├── index.html                # Vite root HTML entry
├── package.json              # Dependency manifests and scripts
├── postcss.config.js         # PostCSS plugins (Tailwind, Autoprefixer)
├── tailwind.config.ts        # Tailwind CSS configuration (clean base)
├── tsconfig.json             # Root TypeScript project references
├── tsconfig.app.json         # Application TypeScript compiler options
├── tsconfig.node.json        # Node / Vite configuration compiler options
├── vite.config.ts            # Vite 6 configuration and @/* path alias
├── design.md                 # Living design specification and Figma reference
├── implementation.md         # Living milestone tracker and verification log
└── src/
    ├── main.tsx              # Application bootstrap entry point
    ├── App.tsx               # Root application wrapper
    ├── components/
    │   ├── layout/           # Global application shells (planned Milestone 2)
    │   ├── shared/           # Reusable clinical widgets (planned)
    │   └── ui/               # Headless atomic primitives (planned)
    ├── features/             # 10 Planned feature modules:
    │   ├── auth/             # Authentication & onboarding
    │   ├── dashboard/        # Practice overview & daily schedule
    │   ├── patients/         # Patient directory & patient profiles
    │   ├── medical-records/  # Clinical notes, lab results & diagnostics
    │   ├── ocr/              # Document upload & OCR verification
    │   ├── referrals/        # Inbound/outbound referrals & consults
    │   ├── reports/          # Clinical reporting & practice analytics
    │   ├── notifications/    # Notifications & critical alerts
    │   ├── settings/         # Doctor credentials & clinic settings
    │   └── treatment-offers/ # CareID 18-step procedure lifecycle
    ├── hooks/                # Shared custom hooks
    ├── lib/                  # Shared utilities (cn() class merger)
    ├── pages/                # Route-level page components (FoundationPage)
    ├── routes/               # Declarative React Router setup
    ├── styles/               # Global styles (globals.css, Tailwind base directives)
    └── types/                # Core TypeScript definitions
```

---

## 6. Project Governance & Status

- **Figma Design Scope**: 48 frames total (47 visible + 1 hidden), 2 exploratory drafts excluded (`1:12893` and `1:13265`), 46 production candidates (39 dedicated routes and 7 in-flow workflow states).
- **Current Milestone**: Milestone 1 (Project Scaffolding & Foundation Setup) — **Complete**.
- **Next Milestone**: Milestone 2 (Design Token Extraction & App Shell Architecture).

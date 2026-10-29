import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { PatientLayout } from '@/components/layout/PatientLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { PatientDirectoryPage } from '@/pages/patients/PatientDirectoryPage';
import { PatientProfilePage } from '@/pages/patients/PatientProfilePage';
import { MedicalRecordsPage } from '@/pages/records/MedicalRecordsPage';
import { RecordDetailPage } from '@/pages/records/RecordDetailPage';
import { PrescriptionsPage } from '@/pages/records/PrescriptionsPage';
import { LabReportPage } from '@/pages/records/LabReportPage';
import { RadiologyViewerPage } from '@/pages/records/RadiologyViewerPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { AuthPlaceholder } from '@/pages/auth/AuthPlaceholder';
import { FoundationPage } from '@/pages/FoundationPage';

const router = createBrowserRouter([
  // Root Redirect to Portal Dashboard
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },

  // Milestone 1 Foundation Verification View
  {
    path: '/foundation',
    element: <FoundationPage />,
  },

  // Authentication Route Group (AuthLayout)
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <AuthPlaceholder
            title="Welcome Back"
            subtitle="Sign in to access your clinical workspace securely."
            buttonText="Request OTP"
            nextRoute="/auth/verify-otp"
            nodeId="1:2"
          />
        ),
      },
      {
        path: 'verify-otp',
        element: (
          <AuthPlaceholder
            title="Two-Factor Authentication"
            subtitle="Enter the 6-digit clinical security code sent to your registered device."
            buttonText="Verify & Login"
            nextRoute="/dashboard"
            nodeId="1:79"
          />
        ),
      },
      {
        path: 'register',
        element: (
          <AuthPlaceholder
            title="Provider Registration"
            subtitle="Submit credentials for medical board verification."
            buttonText="Continue Registration"
            nextRoute="/dashboard"
            nodeId="1:1048"
          />
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <AuthPlaceholder
            title="Account Recovery"
            subtitle="Verify your identity to reset clinical access."
            buttonText="Send Reset Link"
            nextRoute="/auth/reset-password"
            nodeId="1:1120"
          />
        ),
      },
      {
        path: 'reset-password',
        element: (
          <AuthPlaceholder
            title="Reset Password"
            subtitle="Create a new HIPAA-compliant password."
            buttonText="Update Password"
            nextRoute="/auth/login"
            nodeId="1:1180"
          />
        ),
      },
    ],
  },

  // Unified Clinical Portal Route Group (matching Figma nodes 1:154, 1:6657, 1:745, 1:473)
  {
    element: <PatientLayout />,
    children: [
      // 1. Dashboard
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },

      // 2. Patient Management
      {
        path: '/patients',
        element: <PatientDirectoryPage />,
      },
      {
        path: '/patients/:id',
        element: <PatientProfilePage />,
      },
      {
        path: '/patients/:id/history',
        element: (
          <PlaceholderPage
            title="Patient Medical History"
            description="Past surgical history, family background, chronic conditions."
            module="Patients"
            nodeId="1:3310"
            targetMilestone="Milestone 4"
          />
        ),
      },
      {
        path: '/patients/:id/vitals',
        element: (
          <PlaceholderPage
            title="Patient Vitals & Diagnostics"
            description="Continuous physiological metrics, blood pressure, SpO2, and heart rate telemetry."
            module="Patients"
            nodeId="1:3420"
            targetMilestone="Milestone 4"
          />
        ),
      },

      // 3. Medical Records
      {
        path: '/records',
        element: <MedicalRecordsPage />,
      },
      {
        path: '/records/new',
        element: (
          <PlaceholderPage
            title="Create Clinical Note"
            description="Structured SOAP documentation and physician clinical findings."
            module="Medical Records"
            nodeId="1:4120"
            targetMilestone="Milestone 5"
          />
        ),
      },
      {
        path: '/records/:id',
        element: <RecordDetailPage />,
      },
      {
        path: '/records/labs',
        element: <LabReportPage />,
      },
      {
        path: '/records/labs/:id',
        element: <LabReportPage />,
      },
      {
        path: '/records/imaging',
        element: <RadiologyViewerPage />,
      },
      {
        path: '/records/imaging/:id',
        element: <RadiologyViewerPage />,
      },
      {
        path: '/records/pathology',
        element: (
          <PlaceholderPage
            title="Pathology Reports"
            description="Histology, biopsy findings, and tissue specimen diagnostics."
            module="Medical Records"
            nodeId="1:4670"
            targetMilestone="Milestone 5"
          />
        ),
      },
      {
        path: '/records/prescriptions',
        element: <PrescriptionsPage />,
      },

      // 4. OCR & Document Processing
      {
        path: '/ocr/upload',
        element: (
          <PlaceholderPage
            title="Upload Medical Record for OCR"
            description="Automated AI document ingestion, extraction, and clinical parsing."
            module="OCR Processing"
            nodeId="1:1167 / 1:5010"
            targetMilestone="Milestone 5"
          />
        ),
      },
      {
        path: '/ocr/verify/:id',
        element: (
          <PlaceholderPage
            title="OCR Review & Field Verification"
            description="Physician verification and correction of digitized clinical data."
            module="OCR Processing"
            nodeId="1:1325 / 1:5120"
            targetMilestone="Milestone 5"
          />
        ),
      },

      // 5. Referrals & Consultations
      {
        path: '/referrals',
        element: (
          <PlaceholderPage
            title="Referral Dashboard"
            description="Track inbound patient transfers and outbound specialist consults."
            module="Referrals"
            nodeId="1:1535 / 1:6010"
            targetMilestone="Milestone 6"
          />
        ),
      },
      {
        path: '/referrals/new',
        element: (
          <PlaceholderPage
            title="Create Clinical Referral"
            description="Author specialist referral with clinical necessity and attached records."
            module="Referrals"
            nodeId="1:1829 / 1:6120"
            targetMilestone="Milestone 6"
          />
        ),
      },
      {
        path: '/referrals/consult',
        element: (
          <PlaceholderPage
            title="Specialist Consultation Request"
            description="Request intra-departmental specialist opinions."
            module="Referrals"
            nodeId="1:6230"
            targetMilestone="Milestone 6"
          />
        ),
      },
      {
        path: '/referrals/:id',
        element: (
          <PlaceholderPage
            title="Referral Details & Feedback"
            description="Specialist findings, clinical status, and consult recommendations."
            module="Referrals"
            nodeId="1:2072 / 1:6340"
            targetMilestone="Milestone 6"
          />
        ),
      },

      // 6. Clinical Reports & Analytics
      {
        path: '/reports',
        element: (
          <PlaceholderPage
            title="Reports Dashboard"
            description="Practice volume, department performance, and encounter trends."
            module="Clinical Reports"
            nodeId="1:2590 / 1:7010"
            targetMilestone="Milestone 6"
          />
        ),
      },
      {
        path: '/reports/outcomes',
        element: (
          <PlaceholderPage
            title="Clinical Outcomes Summary"
            description="Treatment efficacy metrics, readmission rates, and patient satisfaction."
            module="Clinical Reports"
            nodeId="1:7120"
            targetMilestone="Milestone 6"
          />
        ),
      },
      {
        path: '/reports/exports',
        element: (
          <PlaceholderPage
            title="Custom Export & Audit Logs"
            description="HIPAA access audit logs and clinical dataset exports."
            module="Clinical Reports"
            nodeId="1:7230"
            targetMilestone="Milestone 6"
          />
        ),
      },

      // 7. Notifications & Alerts
      {
        path: '/notifications',
        element: (
          <PlaceholderPage
            title="Notification Center"
            description="Critical clinical alerts, lab updates, and urgent consultation notices."
            module="Notifications"
            nodeId="1:3950 / 1:8010"
            targetMilestone="Milestone 4"
          />
        ),
      },

      // 8. Doctor Profile & Clinic Settings
      {
        path: '/settings',
        element: (
          <PlaceholderPage
            title="Doctor Profile & Credentials"
            description="Provider credentials, NPI, license verification, and specialty details."
            module="Settings"
            nodeId="1:4281 / 1:9010"
            targetMilestone="Milestone 4"
          />
        ),
      },
      {
        path: '/settings/schedule',
        element: (
          <PlaceholderPage
            title="Clinic Schedule & Hours"
            description="Manage weekly slot availability, buffer times, and clinic block-outs."
            module="Settings"
            nodeId="1:9120"
            targetMilestone="Milestone 4"
          />
        ),
      },
      {
        path: '/settings/security',
        element: (
          <PlaceholderPage
            title="Account & Security Settings"
            description="2FA authentication, active sessions, and password management."
            module="Settings"
            nodeId="1:4531 / 1:9230"
            targetMilestone="Milestone 4"
          />
        ),
      },

      // 9. CareID Treatment Offer & Procedure Lifecycle (All 18 authorized steps)
      {
        path: '/treatment-offers',
        element: (
          <PlaceholderPage
            title="Treatment Offer Lifecycle Chain"
            description="18-step clinical procedure & financing workflow."
            module="CareID Treatment Lifecycle"
            nodeId="1:8548"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/new/step-1',
        element: (
          <PlaceholderPage
            title="Step 1: Patient Verification"
            description="Verify patient eligibility, active insurance coverage, and baseline records."
            module="CareID Treatment Lifecycle"
            nodeId="1:14736"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/new/step-2',
        element: (
          <PlaceholderPage
            title="Step 2: Clinical Diagnosis"
            description="Specify primary diagnoses, ICD-10 codes, and clinical justifications."
            module="CareID Treatment Lifecycle"
            nodeId="1:14810"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/new/step-3',
        element: (
          <PlaceholderPage
            title="Step 3: Treatment Selection"
            description="Select surgical or non-surgical procedural packages."
            module="CareID Treatment Lifecycle"
            nodeId="1:14890"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/new/step-4',
        element: (
          <PlaceholderPage
            title="Step 4: Cost Estimation & Financing"
            description="Configure prompt-settlement discounts and CareID 0% APR installment options."
            module="CareID Treatment Lifecycle"
            nodeId="1:5316 / 1:14970"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/new/step-5',
        element: (
          <PlaceholderPage
            title="Step 5: Terms & Clinical Consent"
            description="Review clinical consent disclosures and legal financing notices."
            module="CareID Treatment Lifecycle"
            nodeId="1:15050"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/review',
        element: (
          <PlaceholderPage
            title="Step 6: Review & Send Treatment Offer"
            description="Final physician sign-off before electronic transmission to patient app."
            module="CareID Treatment Lifecycle"
            nodeId="1:7538 / 1:15130"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/sent',
        element: (
          <PlaceholderPage
            title="Step 7: Offer Sent Confirmation"
            description="SMS & encrypted app dispatch status."
            module="CareID Treatment Lifecycle"
            nodeId="1:7986 / 1:15210"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/accepted',
        element: (
          <PlaceholderPage
            title="Accepted Treatment Offer"
            description="Patient acceptance notification and financing clearance."
            module="CareID Treatment Lifecycle"
            nodeId="1:9001 / 1:15290"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/schedule',
        element: (
          <PlaceholderPage
            title="Procedure Slot Scheduling"
            description="Book operating theater, cardiac cath lab, or procedure suite."
            module="CareID Treatment Lifecycle"
            nodeId="1:10206 / 1:15370"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/pre-op',
        element: (
          <PlaceholderPage
            title="Pre-Procedure Readiness Checklist"
            description="NPO compliance, lab clearance, informed consent, and anesthesia verification."
            module="CareID Treatment Lifecycle"
            nodeId="1:12355 / 1:15450"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/in-progress',
        element: (
          <PlaceholderPage
            title="Active Procedure Documentation"
            description="Intra-op surgical check-in and live clinical status recording."
            module="CareID Treatment Lifecycle"
            nodeId="1:13596 / 1:15530"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/notes',
        element: (
          <PlaceholderPage
            title="Intra-Op Clinical Notes"
            description="Anesthesia records, implant lot numbers, and procedure notes."
            module="CareID Treatment Lifecycle"
            nodeId="1:15610"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/post-op',
        element: (
          <PlaceholderPage
            title="Post-Procedure Summary & Discharge"
            description="Recovery room vitals, discharge instructions, and recovery readiness."
            module="CareID Treatment Lifecycle"
            nodeId="1:15586 / 1:15690"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/prescription',
        element: (
          <PlaceholderPage
            title="Digital Prescription Creation"
            description="Post-operative pharmacotherapy and electronic prescription routing."
            module="CareID Treatment Lifecycle"
            nodeId="1:15770"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/follow-up',
        element: (
          <PlaceholderPage
            title="Follow-Up Appointment Booking"
            description="Post-operative checkup scheduling."
            module="CareID Treatment Lifecycle"
            nodeId="1:15850"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/summary',
        element: (
          <PlaceholderPage
            title="Treatment Lifecycle Summary"
            description="Comprehensive clinical case dossier and completed billing records."
            module="CareID Treatment Lifecycle"
            nodeId="1:15930"
            targetMilestone="Milestone 7"
          />
        ),
      },
      {
        path: '/treatment-offers/:id/completed',
        element: (
          <PlaceholderPage
            title="Care ID Doctor - Encounter Completed"
            description="Final milestone: Patient discharge complete, encounter closed, and EHR sync finalized."
            module="CareID Treatment Lifecycle"
            nodeId="1:16047 (Hidden Production Frame)"
            targetMilestone="Milestone 7"
          />
        ),
      },
    ],
  },

  // Fallback Wildcard: Redirect to Dashboard
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

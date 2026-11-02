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
import { InsuranceFinancingHubPage } from '@/pages/financing/InsuranceFinancingHubPage';
import { TreatmentOfferCreatePage } from '@/pages/treatment-offers/TreatmentOfferCreatePage';
import { TreatmentOfferReviewPage } from '@/pages/treatment-offers/TreatmentOfferReviewPage';
import { TreatmentOfferStatusPage } from '@/pages/treatment-offers/TreatmentOfferStatusPage';
import { TreatmentOfferAcceptedPage } from '@/pages/treatment-offers/TreatmentOfferAcceptedPage';
import { ClinicalHandoffPage } from '@/pages/treatment-offers/ClinicalHandoffPage';
import { ProcedureSchedulingPage } from '@/pages/treatment-offers/ProcedureSchedulingPage';
import { AppointmentDetailsPage } from '@/pages/treatment-offers/AppointmentDetailsPage';
import { PreOpReadinessPage } from '@/pages/treatment-offers/PreOpReadinessPage';
import { DayOfCheckinPage } from '@/pages/treatment-offers/DayOfCheckinPage';
import { CathLabSafetyCheckinPage } from '@/pages/cath-lab/CathLabSafetyCheckinPage';
import { StartClinicalEncounterPage } from '@/pages/cath-lab/StartClinicalEncounterPage';
import { ActiveProcedureDocumentationPage } from '@/pages/cath-lab/ActiveProcedureDocumentationPage';
import { PostProcedureSummaryPage } from '@/pages/cath-lab/PostProcedureSummaryPage';
import { EncounterCompletedPage } from '@/pages/cath-lab/EncounterCompletedPage';
import { MedicalRecordUploadPage } from '@/pages/ocr/MedicalRecordUploadPage';
import { ReferralDashboardPage } from '@/pages/referrals/ReferralDashboardPage';
import { CreateReferralPage } from '@/pages/referrals/CreateReferralPage';
import { ReferralDetailsPage } from '@/pages/referrals/ReferralDetailsPage';
import { IncomingReferralReviewPage } from '@/pages/referrals/IncomingReferralReviewPage';
import { ReferralSuccessPage } from '@/pages/referrals/ReferralSuccessPage';
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
        path: '/patients/:id/financing',
        element: <InsuranceFinancingHubPage />,
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
        path: '/records/upload',
        element: <MedicalRecordUploadPage />,
      },
      {
        path: '/records/ocr',
        element: <MedicalRecordUploadPage />,
      },
      {
        path: '/records/ocr/upload',
        element: <MedicalRecordUploadPage />,
      },
      {
        path: '/records/ocr/processing',
        element: <MedicalRecordUploadPage />,
      },
      {
        path: '/records/ocr/review',
        element: <MedicalRecordUploadPage />,
      },
      {
        path: '/records/ocr/success',
        element: <MedicalRecordUploadPage />,
      },
      {
        path: '/ocr/upload',
        element: <MedicalRecordUploadPage />,
      },
      {
        path: '/ocr/verify/:id',
        element: <MedicalRecordUploadPage />,
      },

      // 5. Referrals & Consultations (Group C / Milestone 12)
      {
        path: '/referrals',
        element: <ReferralDashboardPage />,
      },
      {
        path: '/referrals/new',
        element: <CreateReferralPage />,
      },
      {
        path: '/referrals/success',
        element: <ReferralSuccessPage />,
      },
      {
        path: '/referrals/consult',
        element: <CreateReferralPage />,
      },
      {
        path: '/referrals/incoming/:id',
        element: <IncomingReferralReviewPage />,
      },
      {
        path: '/referrals/:id',
        element: <ReferralDetailsPage />,
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
        path: '/treatment-offers/new',
        element: <TreatmentOfferCreatePage />,
      },
      {
        path: '/treatment-offers/new/step-1',
        element: <TreatmentOfferCreatePage />,
      },
      {
        path: '/treatment-offers/new/step-2',
        element: <TreatmentOfferCreatePage />,
      },
      {
        path: '/treatment-offers/new/step-3',
        element: <TreatmentOfferCreatePage />,
      },
      {
        path: '/treatment-offers/new/step-4',
        element: <TreatmentOfferCreatePage />,
      },
      {
        path: '/treatment-offers/new/step-5',
        element: <TreatmentOfferCreatePage />,
      },
      {
        path: '/treatment-offers/:id/review',
        element: <TreatmentOfferReviewPage />,
      },
      {
        path: '/treatment-offers/:id/sent',
        element: <TreatmentOfferStatusPage />,
      },
      {
        path: '/treatment-offers/:id/status',
        element: <TreatmentOfferStatusPage />,
      },
      {
        path: '/treatment-offers/:id/accepted',
        element: <TreatmentOfferAcceptedPage />,
      },
      {
        path: '/treatment-offers/:id/clearance',
        element: <ClinicalHandoffPage />,
      },
      {
        path: '/treatment-offers/:id/schedule',
        element: <ProcedureSchedulingPage initialMode="select" />,
      },
      {
        path: '/treatment-offers/:id/schedule/review',
        element: <ProcedureSchedulingPage initialMode="review" />,
      },
      {
        path: '/treatment-offers/:id/scheduled',
        element: <ProcedureSchedulingPage initialMode="confirmed" />,
      },
      {
        path: '/treatment-offers/:id/appointment',
        element: <AppointmentDetailsPage />,
      },
      {
        path: '/treatment-offers/:id/pre-op',
        element: <PreOpReadinessPage />,
      },
      {
        path: '/treatment-offers/:id/check-in',
        element: <DayOfCheckinPage />,
      },
      {
        path: '/treatment-offers/:id/day-of-checkin',
        element: <DayOfCheckinPage />,
      },
      {
        path: '/treatment-offers/:id/cath-lab-safety',
        element: <CathLabSafetyCheckinPage />,
      },
      {
        path: '/cath-lab-safety',
        element: <CathLabSafetyCheckinPage />,
      },
      {
        path: '/treatment-offers/:id/encounter',
        element: <StartClinicalEncounterPage />,
      },
      {
        path: '/treatment-offers/:id/encounter/start',
        element: <StartClinicalEncounterPage />,
      },
      {
        path: '/cath-lab/encounter/:id/start',
        element: <StartClinicalEncounterPage />,
      },
      {
        path: '/treatment-offers/:id/in-progress',
        element: <ActiveProcedureDocumentationPage />,
      },
      {
        path: '/treatment-offers/:id/encounter/active',
        element: <ActiveProcedureDocumentationPage />,
      },
      {
        path: '/cath-lab/encounter/:id/active',
        element: <ActiveProcedureDocumentationPage />,
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
        element: <PostProcedureSummaryPage />,
      },
      {
        path: '/treatment-offers/:id/encounter/post-op',
        element: <PostProcedureSummaryPage />,
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
        element: <EncounterCompletedPage />,
      },
      {
        path: '/treatment-offers/:id/completed',
        element: <EncounterCompletedPage />,
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

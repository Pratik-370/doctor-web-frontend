export type NotificationCategory =
  | 'critical'
  | 'patient'
  | 'referral'
  | 'ocr'
  | 'prescription'
  | 'system';

export type NotificationSeverity = 'critical' | 'high' | 'medium' | 'info' | 'system';

export interface NotificationItem {
  id: string;
  category: NotificationCategory;
  severity: NotificationSeverity;
  title: string;
  badge?: string;
  time: string;
  body: string;
  patientName?: string;
  patientId?: string;
  actionLabel?: string;
  actionUrl?: string;
  secondaryActionLabel?: string;
  isRead: boolean;
  isStarred?: boolean;
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'critical',
    severity: 'critical',
    title: 'Critical Laboratory Result',
    badge: 'CRITICAL',
    time: '10:42 AM',
    body: 'Abnormal lab findings for patient James Robertson (HV-84920). Potassium 6.2 mEq/L and Creatinine 2.8 mg/dL. Immediate review required.',
    patientName: 'James Robertson',
    patientId: 'PT-84920',
    actionLabel: 'Open Patient Record',
    actionUrl: '/reports/critical/PT-84920',
    secondaryActionLabel: 'Dismiss',
    isRead: false,
    isStarred: true,
  },
  {
    id: 'notif-2',
    category: 'referral',
    severity: 'high',
    title: 'Incoming Referral Request',
    badge: 'URGENT',
    time: '09:15 AM',
    body: 'Incoming referral received from Dr. Sarah Jenkins for cardiology consult regarding atypical chest pain.',
    patientName: 'Robert Chen',
    patientId: 'REF-8924-A',
    actionLabel: 'Review Referral',
    actionUrl: '/referrals/incoming/REF-8924-A',
    secondaryActionLabel: 'Dismiss',
    isRead: false,
  },
  {
    id: 'notif-3',
    category: 'ocr',
    severity: 'medium',
    title: 'OCR Extraction Completed',
    badge: 'FLAGGED',
    time: '08:30 AM',
    body: 'Lab_Results_041123.pdf processed successfully with 1 mismatch flag (HV-992-O81) requiring physician verification.',
    patientName: 'Eleanor Vance',
    patientId: 'HV-884-291',
    actionLabel: 'Review Document',
    actionUrl: '/records/upload',
    secondaryActionLabel: 'Dismiss',
    isRead: false,
  },
  {
    id: 'notif-4',
    category: 'prescription',
    severity: 'info',
    title: 'Electronic Signature Required',
    badge: 'TREATMENT',
    time: 'Yesterday',
    body: 'Procedural treatment plan and hemodynamic attestation awaiting digital physician signature for patient Robert Sterling.',
    patientName: 'Robert Sterling',
    patientId: 'TR-8921',
    actionLabel: 'View Treatment Plan',
    actionUrl: '/treatment-offers/TR-8921/status',
    secondaryActionLabel: 'Dismiss',
    isRead: true,
  },
  {
    id: 'notif-5',
    category: 'system',
    severity: 'system',
    title: 'Scheduled System Maintenance',
    time: '2 days ago',
    body: 'Scheduled downtime for CareID Enterprise Healthcare portal tonight at 12:00 AM EST (Estimated duration: 2 hours).',
    isRead: true,
  },
  {
    id: 'notif-6',
    category: 'patient',
    severity: 'info',
    title: 'Patient Arrived at Cath Lab Station #04',
    badge: 'PERI-OP',
    time: '3 days ago',
    body: 'Robert Sterling (#8472–9901) checked in for elective coronary angiography. Allergy precautions flagged.',
    patientName: 'Robert Sterling',
    patientId: '8472-9901',
    actionLabel: 'Open Safety Check-In',
    actionUrl: '/cath-lab-safety',
    secondaryActionLabel: 'Dismiss',
    isRead: true,
  },
];


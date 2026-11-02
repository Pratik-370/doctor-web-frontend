import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Eye,
  FileText,
  ShieldCheck,
  Stethoscope,
  X,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { DEFAULT_REFERRALS_DATA, ReferralRecord } from './types';
import doctorAvatarPrimary from '@/assets/avatars/doctor-profile-primary.png';

export const IncomingReferralReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find incoming referral by id or default to REF-8924-A
  const referral: ReferralRecord =
    DEFAULT_REFERRALS_DATA.find((r) => r.id === id || r.refNumber === id) ||
    DEFAULT_REFERRALS_DATA[4]; // REF-8924-A

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('Out of clinical scope');
  const [infoRequestNote, setInfoRequestNote] = useState('');
  const [isAccepted, setIsAccepted] = useState(referral.status === 'accepted');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAccept = () => {
    setIsAccepted(true);
    triggerToast(`Referral ${referral.refNumber} accepted! Routing to consultation scheduling...`);
    setTimeout(() => {
      navigate('/referrals');
    }, 1200);
  };

  const handleConfirmDecline = () => {
    setShowDeclineModal(false);
    triggerToast(`Referral ${referral.refNumber} declined. Notice sent to referring physician.`);
    setTimeout(() => {
      navigate('/referrals');
    }, 1000);
  };

  const handleConfirmRequestInfo = () => {
    setShowRequestInfoModal(false);
    triggerToast(`Clinical clarification request sent to ${referral.referringProvider.name}.`);
  };

  return (
    <div className="w-full space-y-6 pb-28">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#0b1c30] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-purple-500/30 text-xs animate-in fade-in slide-in-from-top-2">
          <ShieldCheck className="w-4 h-4 text-[#5af8fb] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Decline Reason Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600">
              <div className="size-10 rounded-full bg-red-50 flex items-center justify-center">
                <XCircle className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Decline Referral</h3>
                <p className="text-xs text-slate-500">Reference: {referral.refNumber}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Reason for Rejection
              </label>
              <select
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30"
              >
                <option value="Out of clinical scope">Out of clinical scope</option>
                <option value="Capacity exceeded / Long waitlist">Capacity exceeded / Long waitlist</option>
                <option value="Incomplete diagnostic workup">Incomplete diagnostic workup</option>
                <option value="Patient out of service territory">Patient out of service territory</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeclineModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDecline}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Additional Info Modal */}
      {showRequestInfoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-purple-600">
              <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center">
                <HelpCircle className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Request Clinical Records</h3>
                <p className="text-xs text-slate-500">Contact: {referral.referringProvider.name}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Specify Missing Diagnostics or Notes
              </label>
              <textarea
                value={infoRequestNote}
                onChange={(e) => setInfoRequestNote(e.target.value)}
                rows={3}
                placeholder="e.g., Please provide serial troponins and baseline 12-lead ECG from prior admission..."
                className="w-full p-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRequestInfoModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRequestInfo}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#5b14b8] hover:bg-[#4a0f9b] rounded-lg transition-colors shadow-sm"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back to Referrals Link */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/referrals')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#5b14b8] transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Referrals</span>
        </button>
      </div>

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Incoming Referral Review
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ref ID: #{referral.refNumber} • Received: {referral.date}
          </p>
        </div>

        {/* Priority Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7a1818] text-white tracking-wide shadow-xs">
            <span>!</span>
            <span>HIGH PRIORITY</span>
          </span>
        </div>
      </div>

      {/* 2-Column Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Patient & Clinical Summary (~60-65% / 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Patient Details & Referring Provider */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Profile */}
              <div className="flex items-start gap-4">
                <img
                  src={doctorAvatarPrimary}
                  alt={referral.patient.name}
                  className="size-14 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                />
                <div className="space-y-0.5">
                  <div className="text-base font-bold text-slate-900">
                    {referral.patient.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {referral.patient.age} yrs • {referral.patient.gender} • DOB: {referral.patient.dob}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    MRN: {referral.patient.mrn}
                  </div>
                </div>
              </div>

              {/* Referring Physician */}
              <div className="space-y-2 md:border-l md:border-slate-100 md:pl-6">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Referred By
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="size-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-100">
                    <Stethoscope className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {referral.referringProvider.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {referral.referringProvider.role} • {referral.referringProvider.facility}
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => triggerToast(`Contacting ${referral.referringProvider.name}...`)}
                    className="px-3 py-1 text-xs font-semibold text-cyan-800 bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 rounded-lg transition-colors"
                  >
                    Contact PCP
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Clinical Summary & Reason */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-5 border-l-4 border-l-[#5b14b8]">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <FileText className="size-4.5 text-[#5b14b8]" />
              <h2 className="text-sm font-bold text-slate-900">Clinical Summary & Reason</h2>
            </div>

            {/* Chief Complaint */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-800">
                Chief Complaint
              </div>
              <div className="bg-[#f8f9fc] rounded-xl p-4 text-xs text-slate-700 leading-relaxed border border-slate-100">
                {referral.chiefComplaint || referral.reasonForReferral}
              </div>
            </div>

            {/* PCP Notes */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-800">
                PCP Notes:
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {referral.clinicalSummary}
              </p>
            </div>

            {/* Diagnostic Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {referral.diagnoses.map((tag) => {
                const isHighRisk = tag.toLowerCase().includes('high') || tag.toLowerCase().includes('cad');
                return (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isHighRisk
                        ? 'bg-[#feecee] text-[#d92d20] border border-[#fecdd3] font-semibold'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Vitals & Attachments (~35-40% / 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Latest Vitals Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4">
            <h3 className="text-xs font-bold text-slate-900">Latest Vitals (From PCP)</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* BP */}
              <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <div className="text-[11px] font-medium text-slate-400">BP</div>
                <div className="text-lg font-bold text-red-600 mt-0.5">
                  {referral.vitals?.bp || '145/92'}
                </div>
                <div className="text-[10px] text-slate-400">mmHg</div>
              </div>

              {/* HR */}
              <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <div className="text-[11px] font-medium text-slate-400">HR</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {referral.vitals?.hr || 88}
                </div>
                <div className="text-[10px] text-slate-400">bpm</div>
              </div>

              {/* SpO2 */}
              <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <div className="text-[11px] font-medium text-slate-400">SpO2</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {referral.vitals?.spo2 || 96}
                </div>
                <div className="text-[10px] text-slate-400">%</div>
              </div>

              {/* BMI */}
              <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <div className="text-[11px] font-medium text-slate-400">BMI</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {referral.vitals?.bmi || 28.4}
                </div>
                <div className="text-[10px] text-slate-400">Normal / Overwt</div>
              </div>
            </div>
          </div>

          {/* Attachments Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">
                Attachments ({referral.attachments.length})
              </h3>
              <button
                type="button"
                onClick={() => triggerToast('Downloading bundled medical records zip...')}
                className="text-[11px] font-semibold text-[#5b14b8] hover:underline"
              >
                Download All
              </button>
            </div>

            <div className="space-y-2.5">
              {referral.attachments.map((file) => (
                <div
                  key={file.id}
                  onClick={() => triggerToast(`Previewing ${file.name}...`)}
                  className="p-3 bg-slate-50/70 hover:bg-slate-100 border border-slate-200/80 rounded-xl flex items-center justify-between transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="size-4 text-cyan-700 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-900 group-hover:text-[#5b14b8] truncate">
                        {file.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {file.size} • {file.date}
                      </div>
                    </div>
                  </div>

                  <Eye className="size-4 text-slate-400 group-hover:text-slate-700 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar (Fixed Workstation Footer) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 shadow-[0px_-2px_10px_rgba(0,0,0,0.05)] py-3 px-8 flex items-center justify-between">
        <div className="text-xs font-medium text-slate-600 flex items-center gap-2">
          <span>Reviewing Referral</span>
          <span className="font-bold text-slate-900">#{referral.refNumber}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowDeclineModal(true)}
            className="px-4 py-2 bg-white border border-red-300 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            Decline
          </button>

          <button
            type="button"
            onClick={() => setShowRequestInfoModal(true)}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            Request Info
          </button>

          <button
            type="button"
            onClick={handleAccept}
            disabled={isAccepted}
            className="px-5 py-2 bg-gradient-to-r from-[#8b3dff] to-[#6d28d9] hover:opacity-95 disabled:opacity-60 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Check className="size-3.5 stroke-[3]" />
            <span>{isAccepted ? 'Referral Accepted' : 'Accept Referral'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

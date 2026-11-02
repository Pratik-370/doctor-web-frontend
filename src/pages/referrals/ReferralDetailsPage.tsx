import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Mail,
  Paperclip,
  Printer,
  ShieldCheck,
  Stethoscope,
  User,
  X,
  XCircle,
} from 'lucide-react';
import { DEFAULT_REFERRALS_DATA, ReferralRecord } from './types';
import doctorAvatarPrimary from '@/assets/avatars/doctor-profile-primary.png';

export const ReferralDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find referral by id or default to REF-2023-8910
  const referral: ReferralRecord =
    DEFAULT_REFERRALS_DATA.find((r) => r.id === id || r.refNumber === id) ||
    DEFAULT_REFERRALS_DATA[3]; // REF-2023-8910

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePrint = () => {
    triggerToast('Generating printable referral summary...');
    window.print();
  };

  const handleDownloadPdf = () => {
    triggerToast(`Downloading official dossier ${referral.refNumber}.pdf...`);
  };

  const handleWithdraw = () => {
    setShowWithdrawModal(false);
    triggerToast(`Referral ${referral.refNumber} has been officially withdrawn.`);
  };

  return (
    <div className="w-full space-y-6 pb-20">
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

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600">
              <div className="size-10 rounded-full bg-red-50 flex items-center justify-center">
                <XCircle className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Withdraw Referral</h3>
                <p className="text-xs text-slate-500">Reference: {referral.refNumber}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to withdraw this specialist referral? Both the receiving
              specialist and the patient care team will be notified of cancellation.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowWithdrawModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleWithdraw}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="text-xs text-slate-500">
        Patient Directory › Referrals › <span className="font-semibold text-slate-900">Referral Details</span>
      </div>

      {/* Title & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Referral: {referral.refNumber}
          </h1>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#c5f4f8] text-[#0a7a8c] uppercase tracking-wide">
            {referral.status}
          </span>

          <span className="text-xs font-medium text-slate-500">
            Urgency: <span className="capitalize">{referral.priority}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="h-9 px-3.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Printer className="size-3.5 text-slate-500" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="h-9 px-3.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="size-3.5 text-slate-500" />
            <span>Download PDF</span>
          </button>

          <button
            type="button"
            onClick={() => setShowWithdrawModal(true)}
            className="h-9 px-3.5 bg-[#d92d20] hover:bg-[#b42318] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <XCircle className="size-3.5" />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {/* 2-Column Clinical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dossier (~65% / 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Patient Details & Referring Provider */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <User className="size-4 text-slate-400" />
                  <span>Patient Details</span>
                </div>

                <div className="flex items-start gap-3.5">
                  <img
                    src={doctorAvatarPrimary}
                    alt={referral.patient.name}
                    className="size-12 rounded-full object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <div className="text-base font-bold text-slate-900">
                      {referral.patient.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      DOB: {referral.patient.dob} ({referral.patient.age}yo) • {referral.patient.gender}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      MRN: {referral.patient.mrn}
                    </div>
                  </div>
                </div>
              </div>

              {/* Referring Provider */}
              <div className="space-y-3 md:border-l md:border-slate-100 md:pl-6">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Stethoscope className="size-4 text-slate-400" />
                  <span>Referring Provider</span>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-900">
                    {referral.referringProvider.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {referral.referringProvider.role}
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
                    <Mail className="size-3 text-slate-400" />
                    <span>{referral.referringProvider.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sent To Sub-Card */}
            <div className="pt-4 border-t border-slate-100">
              <div className="bg-[#f8f9fc] rounded-xl p-4 flex items-center gap-3 border border-slate-100">
                <div className="size-10 rounded-full bg-[#3f1d8b] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {referral.receivingProvider.initials || 'EM'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <ArrowRight className="size-3 text-slate-400" />
                    <span>Sent To</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {referral.receivingProvider.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {referral.receivingProvider.facility}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Clinical Summary */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <FileText className="size-4 text-[#5b14b8]" />
              <h2 className="text-sm font-bold text-slate-900">Clinical Summary</h2>
            </div>

            {/* Reason for Referral */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Reason for Referral
              </div>
              <div className="bg-[#f8f9fc] rounded-xl p-4 text-xs text-slate-700 leading-relaxed border border-slate-100">
                {referral.reasonForReferral}
              </div>
            </div>

            {/* Diagnoses and Medications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Primary Diagnoses */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Primary Diagnoses
                </div>
                <div className="flex flex-wrap gap-2">
                  {referral.diagnoses.map((diag, index) => (
                    <span
                      key={diag}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        index === 0
                          ? 'bg-[#7a1818] text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {diag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Current Medications */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Current Medications
                </div>
                <div className="flex flex-wrap gap-2">
                  {referral.medications.map((med) => (
                    <span
                      key={med}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#d2f4f8] text-[#0b7587]"
                    >
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Attachments */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <Paperclip className="size-4 text-slate-700" />
              <h3 className="text-xs font-bold text-slate-900">
                Attachments ({referral.attachments.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {referral.attachments.map((file) => (
                <div
                  key={file.id}
                  onClick={() => triggerToast(`Viewing ${file.name}...`)}
                  className="bg-slate-50/70 hover:bg-purple-50/40 border border-slate-200/80 hover:border-purple-200 rounded-xl p-3.5 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <FileText className="size-4.5 text-[#5b14b8]" />
                    <Download className="size-3.5 text-slate-400 group-hover:text-[#5b14b8] transition-colors" />
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-[#5b14b8] truncate">
                      {file.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {file.size} • {file.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Referral Status Timeline (~35% / 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Activity className="size-4 text-[#5b14b8]" />
              <h3 className="text-xs font-bold text-slate-900">Referral Status</h3>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {referral.timeline.map((step, idx) => {
                const isCompleted = step.status === 'completed';
                const isActive = step.status === 'active';

                return (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-6 top-0.5 size-5 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-[#3f1d8b] text-white'
                          : isActive
                          ? 'bg-[#0a7a8c] text-white ring-4 ring-cyan-100'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="size-3 stroke-[3]" />
                      ) : isActive ? (
                        <div className="size-1.5 rounded-full bg-white" />
                      ) : (
                        <div className="size-1.5 rounded-full bg-slate-400" />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div
                        className={`text-xs font-bold ${
                          isActive
                            ? 'text-[#0a7a8c]'
                            : isCompleted
                            ? 'text-slate-900'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {step.timestamp}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {step.author}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Primary Action Button: Review Referral */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate(`/referrals/incoming/${referral.id}`)}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#8b3dff] to-[#6d28d9] hover:opacity-95 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Review Referral</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

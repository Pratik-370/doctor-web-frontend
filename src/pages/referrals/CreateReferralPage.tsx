import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  History,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  Stethoscope,
  TriangleAlert,
  X,
  FileText,
  Upload,
  CheckCircle2,
  Droplet,
  ChevronDown,
} from 'lucide-react';
import doctorAvatarPrimary from '@/assets/avatars/doctor-profile-primary.png';

export const CreateReferralPage: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [doctorSearch, setDoctorSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [primaryReason, setPrimaryReason] = useState('');
  const [clinicalSummary, setClinicalSummary] = useState('');
  const [priority, setPriority] = useState<'routine' | 'urgent'>('routine');

  // Included records state
  const [bundledRecords, setBundledRecords] = useState({
    labs: true,
    imaging: true,
    prescriptions: false,
    notes: true,
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCount = Object.values(bundledRecords).filter(Boolean).length;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleToggleRecord = (key: keyof typeof bundledRecords) => {
    setBundledRecords((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveDraft = () => {
    triggerToast('Draft saved successfully to local clinical store');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    triggerToast('Securely bundling clinical records and dispatching referral...');

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/referrals/success');
    }, 800);
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

      {/* Breadcrumb Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Create New Referral
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Doctor Portal › Patient Directory › Marcus Johnson › New Referral
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/referrals')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#5b14b8] transition-colors"
        >
          <History className="size-3.5" />
          <span>Referral History</span>
        </button>
      </div>

      {/* Patient Summary Card (Top Banner) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={doctorAvatarPrimary}
              alt="Marcus Johnson"
              className="size-14 rounded-full object-cover border-2 border-slate-100 shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-teal-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
              <CheckCircle2 className="size-3 stroke-[3]" />
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Patient Name</div>
            <div className="text-base font-bold text-slate-900">Marcus Johnson</div>
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-400 font-medium">Patient ID</div>
          <div className="text-sm font-semibold text-slate-800">HV-9284–771</div>
        </div>

        <div>
          <div className="text-xs text-slate-400 font-medium">Age / Gender</div>
          <div className="text-sm font-semibold text-slate-800">48 Yrs / Male</div>
        </div>

        <div>
          <div className="text-xs text-slate-400 font-medium">Blood Group</div>
          <div className="text-sm font-semibold text-slate-800 flex items-center gap-1 text-red-600">
            <Droplet className="size-3.5 fill-red-600 text-red-600" />
            <span>O Positive</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Workstation */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Details (~65% / 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Receiving Specialist */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Stethoscope className="size-4.5 text-[#5b14b8]" />
              <h2 className="text-sm font-bold text-slate-900">Receiving Specialist</h2>
            </div>

            {/* Doctor or Facility Search */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Search Doctor or Facility
              </label>
              <div className="relative">
                <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={doctorSearch}
                  onChange={(e) => setDoctorSearch(e.target.value)}
                  placeholder="Type name, specialty, or NPI..."
                  className="w-full h-10 pl-9 pr-4 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 transition-colors"
                />
              </div>
            </div>

            {/* Specialty and Target Facility Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Specialty Required
                </label>
                <div className="relative">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    required
                    className="w-full h-10 px-3 pr-8 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 appearance-none transition-colors text-slate-800"
                  >
                    <option value="">Select Specialty</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                  </select>
                  <ChevronDown className="size-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Target Hospital / Clinic
                </label>
                <div className="relative">
                  <select
                    value={selectedFacility}
                    onChange={(e) => setSelectedFacility(e.target.value)}
                    required
                    className="w-full h-10 px-3 pr-8 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 appearance-none transition-colors text-slate-800"
                  >
                    <option value="">Select Facility</option>
                    <option value="Mount Sinai Health System">Mount Sinai Health System</option>
                    <option value="Mercy General Hospital">Mercy General Hospital</option>
                    <option value="City Health Clinic">City Health Clinic</option>
                    <option value="Advanced Imaging Center">Advanced Imaging Center</option>
                    <option value="St. Jude Heart Institute">St. Jude Heart Institute</option>
                  </select>
                  <ChevronDown className="size-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Context */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <FileText className="size-4.5 text-[#5b14b8]" />
              <h2 className="text-sm font-bold text-slate-900">Clinical Context</h2>
            </div>

            {/* Primary Reason for Referral */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Primary Reason for Referral
              </label>
              <input
                type="text"
                value={primaryReason}
                onChange={(e) => setPrimaryReason(e.target.value)}
                placeholder="e.g., Evaluation for persistent angina and dyspnea on exertion"
                required
                className="w-full h-10 px-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 transition-colors text-slate-800"
              />
            </div>

            {/* Clinical Summary & Findings */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Clinical Summary & Findings
              </label>
              <textarea
                value={clinicalSummary}
                onChange={(e) => setClinicalSummary(e.target.value)}
                rows={4}
                required
                placeholder="Provide a brief history, current findings, and what specific action is requested from the specialist..."
                className="w-full p-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 transition-colors text-slate-800 resize-none leading-relaxed"
              />
            </div>

            {/* Referral Priority */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Referral Priority
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPriority('routine')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    priority === 'routine'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="size-3.5" />
                  <span>Routine</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority('urgent')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    priority === 'urgent'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <TriangleAlert className="size-3.5" />
                  <span>Urgent</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Included Data & Actions (~35% / 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Included Data Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Paperclip className="size-4 text-slate-700" />
                <h3 className="text-xs font-bold text-slate-900">Included Data</h3>
              </div>
              <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                {selectedCount} Selected
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Select records to bundle with this referral.
            </p>

            {/* Checkbox Options */}
            <div className="space-y-2.5">
              {/* Option 1: Labs */}
              <div
                onClick={() => handleToggleRecord('labs')}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  bundledRecords.labs
                    ? 'border-purple-200 bg-purple-50/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={bundledRecords.labs}
                  onChange={() => {}}
                  className="mt-0.5 size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900">
                      Recent Lab Reports
                    </span>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                      NEW
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    CBC, Lipid Panel (2 days ago)
                  </div>
                </div>
              </div>

              {/* Option 2: Imaging */}
              <div
                onClick={() => handleToggleRecord('imaging')}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  bundledRecords.imaging
                    ? 'border-purple-200 bg-purple-50/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={bundledRecords.imaging}
                  onChange={() => {}}
                  className="mt-0.5 size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-slate-900">
                    Imaging History
                  </span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Chest X-Ray (Last month)
                  </div>
                </div>
              </div>

              {/* Option 3: Prescriptions */}
              <div
                onClick={() => handleToggleRecord('prescriptions')}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  bundledRecords.prescriptions
                    ? 'border-purple-200 bg-purple-50/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={bundledRecords.prescriptions}
                  onChange={() => {}}
                  className="mt-0.5 size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-slate-900">
                    Active Prescriptions
                  </span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Lisinopril, Atorvastatin
                  </div>
                </div>
              </div>

              {/* Option 4: Notes */}
              <div
                onClick={() => handleToggleRecord('notes')}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  bundledRecords.notes
                    ? 'border-purple-200 bg-purple-50/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={bundledRecords.notes}
                  onChange={() => {}}
                  className="mt-0.5 size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-slate-900">
                    Recent Clinical Notes
                  </span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Consultation from Oct 12
                  </div>
                </div>
              </div>
            </div>

            {/* Attach External File Button */}
            <button
              type="button"
              onClick={() => triggerToast('External file attachment dialog opened')}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Upload className="size-3.5 text-slate-500" />
              <span>Attach External File</span>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
            >
              <Send className="size-4 text-slate-700" />
              <span>{isSubmitting ? 'Dispatching...' : 'Send Referral'}</span>
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="w-full text-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

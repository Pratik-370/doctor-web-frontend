import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Filter,
  Pill,
  Search,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import patientAvatarHero from '@/assets/avatars/patient-avatar-hero.png';

type RecordCategory = 'all' | 'lab' | 'radiology' | 'consultations';

export const MedicalRecordsPage: React.FC = () => {
  const navigate = useNavigate();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<RecordCategory>('all');
  const [selectedFacility, setSelectedFacility] = useState('All Facilities');
  const [dateRange, setDateRange] = useState('Past 6 Months');
  const [recordTypeCheckboxes, setRecordTypeCheckboxes] = useState({
    labs: true,
    radiology: true,
    clinical: false,
    prescriptions: false,
  });

  // Mock patient dataset matching Figma node 1:6023
  const patient = {
    name: 'Eleanor Vance',
    healthVaultId: 'HV-884-291',
    demographics: '45 F • O+',
    status: 'Stable',
    vitals: {
      bp: '120/80',
      bpUnit: 'mmHg',
      hr: '72',
      hrUnit: 'bpm',
      spo2: '98%',
      timestamp: 'Today, 09:00 AM',
    },
    medications: [
      { name: 'Atorvastatin', dosage: '20mg', instructions: '1 tablet daily at bedtime' },
      { name: 'Lisinopril 10mg', dosage: '', instructions: '1 tablet daily in morning' },
    ],
  };

  // Timeline records dataset matching Figma node 1:6023
  const records = [
    {
      id: 'REC-001',
      title: 'Lipid Panel',
      category: 'Lab Report',
      type: 'lab',
      date: 'Oct 24, 2023',
      facility: 'St. Jude Hospital • Dr. Julian Vance',
      status: 'Normal',
      statusType: 'normal',
      badge: 'Verified',
      badgeType: 'verified',
      accentColor: 'border-l-[#00c5df]',
      actionUrl: '/records/REC-001',
    },
    {
      id: 'REC-002',
      title: 'Complete Blood Count (CBC)',
      category: 'Lab Report',
      type: 'lab',
      date: 'Oct 24, 2023',
      facility: 'St. Jude Hospital • Dr. Julian Vance',
      status: 'Normal',
      statusType: 'normal',
      badge: 'Verified',
      badgeType: 'verified',
      accentColor: 'border-l-[#00c5df]',
      actionUrl: '/records/REC-001',
    },
    {
      id: 'REC-003',
      title: 'Chest X-Ray',
      category: 'Radiology',
      type: 'radiology',
      date: 'Sep 15, 2023',
      facility: 'City General • Dr. A. Smith',
      status: 'Review Needed',
      statusType: 'review',
      badge: 'Pending Verification',
      badgeType: 'pending',
      accentColor: 'border-l-[#ba1a1a]',
      actionUrl: '/records/imaging',
    },
  ];

  const filteredRecords = records.filter((r) => {
    if (selectedType !== 'all' && r.type !== selectedType) return false;
    if (
      searchQuery &&
      !r.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full space-y-6" data-node-id="1:6023">
      {/* 1. Patient Summary Bar (Figma node 1:6288) */}
      <section
        aria-label="Patient Summary"
        className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-sm">
            <img
              src={patientAvatarHero}
              alt={patient.name}
              className="size-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold text-[#191c1d] leading-7">
                {patient.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e0f7fa] text-[#00838f]">
                <Check className="size-3 stroke-[3]" aria-hidden="true" />
                <span>Verified</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#494552] flex-wrap">
              <span className="text-[#191c1d] font-semibold">{patient.healthVaultId}</span>
              <span>•</span>
              <span>{patient.demographics}</span>
              <span>•</span>
              <span className="inline-flex items-center text-emerald-700 font-semibold">
                <span className="size-1.5 rounded-full bg-emerald-500 mr-1.5" aria-hidden="true" />
                {patient.status}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls on Summary Bar (Figma node 1:6304) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate('/patients/HV-884-291')}
            className="h-10 px-5 rounded-lg bg-white border border-[#cbc4d4] text-sm font-semibold text-[#191c1d] hover:bg-slate-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
          >
            <span>Back to Profile</span>
          </button>

          {/* Canonical Primary Action Button (Figma node 1:40) */}
          <button
            type="button"
            onClick={() => navigate('/treatment-offers/new/step-1')}
            className="h-10 px-6 rounded-lg bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-sm font-semibold hover:opacity-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
          >
            <span>Start Consultation</span>
          </button>
        </div>
      </section>

      {/* 2. Main Content Grid: 3-Column Layout (Figma node 1:6068) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Filter Records (Span 3) (Figma node 1:6069) */}
        <aside className="lg:col-span-3 space-y-4" aria-label="Record Filters">
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-base font-bold text-[#191c1d]">
              <Filter className="size-4 text-[#191c1d]" aria-hidden="true" />
              <h2>Filter Records</h2>
            </div>

            {/* Keyword Search Input */}
            <div className="relative">
              <Search className="size-4 absolute left-3 top-3 text-[#7a7583]" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search record text..."
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#f3f4f5] border border-[#cbc4d4] text-sm text-[#191c1d] placeholder:text-[#7a7583] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
              />
            </div>

            {/* Filter: Record Type */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#191c1d]">
                Record Type
              </label>
              <div className="space-y-2">
                {[
                  { id: 'labs', label: 'Lab Reports' },
                  { id: 'radiology', label: 'Radiology' },
                  { id: 'clinical', label: 'Clinical Notes' },
                  { id: 'prescriptions', label: 'Prescriptions' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 text-sm text-[#191c1d] hover:text-[#5b14b8] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={recordTypeCheckboxes[item.id as keyof typeof recordTypeCheckboxes]}
                      onChange={(e) => {
                        const updated = {
                          ...recordTypeCheckboxes,
                          [item.id]: e.target.checked,
                        };
                        setRecordTypeCheckboxes(updated);
                        if (e.target.checked) {
                          if (item.id === 'labs') setSelectedType('lab');
                          else if (item.id === 'radiology') setSelectedType('radiology');
                        }
                      }}
                      className="size-4 rounded border-slate-300 text-[#5b14b8] focus:ring-[#5b14b8]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter: Date Range */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#191c1d]">
                Date Range
              </label>
              <div className="relative">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f8f9fa] border border-[#cbc4d4] rounded-lg text-sm text-[#191c1d] appearance-none focus:outline-none focus:ring-2 focus:ring-[#5b14b8] cursor-pointer"
                >
                  <option>Past 6 Months</option>
                  <option>Past 30 Days</option>
                  <option>Past 1 Year</option>
                  <option>All History</option>
                </select>
                <ChevronDown className="size-4 absolute right-3 top-3 text-[#494552] pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* Filter: Hospital / Clinic */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#191c1d]">
                Hospital / Clinic
              </label>
              <div className="relative">
                <select
                  value={selectedFacility}
                  onChange={(e) => setSelectedFacility(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f8f9fa] border border-[#cbc4d4] rounded-lg text-sm text-[#191c1d] appearance-none focus:outline-none focus:ring-2 focus:ring-[#5b14b8] cursor-pointer"
                >
                  <option>All Facilities</option>
                  <option>St. Jude Hospital</option>
                  <option>City General</option>
                  <option>Metro Imaging Center</option>
                </select>
                <ChevronDown className="size-4 absolute right-3 top-3 text-[#494552] pointer-events-none" aria-hidden="true" />
              </div>
            </div>
          </div>
        </aside>

        {/* Middle Column: Records Timeline (Span 6) (Figma node 1:6134) */}
        <main className="lg:col-span-6 space-y-4" aria-label="Chronological Records Timeline">
          {/* Filter Chips Row (Figma node 1:6125) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'lab', label: 'Lab' },
              { id: 'radiology', label: 'Radiology' },
              { id: 'consultations', label: 'Consultations' },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setSelectedType(chip.id as RecordCategory)}
                className={cn(
                  'h-8 px-4 rounded-full text-xs font-semibold whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b14b8]',
                  selectedType === chip.id
                    ? 'bg-[#00c5df] text-[#002f34] shadow-sm'
                    : 'bg-white border border-[#cbc4d4] text-[#494552] hover:bg-slate-50'
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Chronological List of Cards */}
          <div className="space-y-3.5">
            {filteredRecords.map((record) => (
              <article
                key={record.id}
                className={cn(
                  "bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-3.5 border-l-4",
                  record.accentColor
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#191c1d]">
                        {record.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#f3f4f5] text-[#494552] border border-[#e1e3e4]">
                        {record.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#7a7583] flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#191c1d]">⊞</span>
                      <span>{record.facility}</span>
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="text-xs font-medium text-[#7a7583]">
                      {record.date}
                    </div>
                    {record.statusType === 'normal' ? (
                      <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1 justify-end">
                        <CheckCircle2 className="size-3.5" />
                        <span>Normal</span>
                      </div>
                    ) : (
                      <div className="text-xs font-semibold text-[#ba1a1a] flex items-center gap-1 justify-end">
                        <AlertCircle className="size-3.5" />
                        <span>Review Needed</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Card Footer: Badge on Left, Open Button on Right */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  {record.badgeType === 'verified' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-[#5b14b8] border border-purple-200">
                      <Check className="size-3" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-[#494552] border border-slate-200">
                      <span>Pending Verification</span>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => navigate(record.actionUrl)}
                    className="h-8 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#191c1d] flex items-center gap-1.5 transition-colors focus:outline-none"
                  >
                    <span>Open</span>
                    <ArrowRight className="size-3.5 text-[#5b14b8]" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Records Link / Button (Figma node 1:6219) */}
          <div className="pt-3 text-center">
            <button
              type="button"
              className="text-xs font-semibold text-[#5b14b8] hover:underline flex items-center justify-center gap-1 mx-auto focus:outline-none"
            >
              <span>Load More Records</span>
              <ChevronDown className="size-3.5" />
            </button>
          </div>
        </main>

        {/* Right Column: Vitals & Medications (Span 3) (Figma node 1:6228 / 1:6259) */}
        <aside className="lg:col-span-3 space-y-5" aria-label="Clinical Metrics and Medications">
          {/* Latest Vitals Card (Figma node 1:6228) */}
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-[#ba1a1a]" aria-hidden="true" />
                <h2 className="text-sm font-bold text-[#191c1d]">Latest Vitals</h2>
              </div>
              <span className="text-[11px] text-[#7a7583]">
                {patient.vitals.timestamp}
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              {/* 2-column top: Blood Pressure and Heart Rate */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-[#f8f9fa] border border-[#e1e3e4] space-y-1">
                  <div className="text-[11px] text-[#7a7583] font-medium leading-none">Blood Pressure</div>
                  <div className="text-base font-bold text-[#191c1d] pt-1">{patient.vitals.bp}</div>
                  <div className="text-[10px] text-[#7a7583]">{patient.vitals.bpUnit}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#f8f9fa] border border-[#e1e3e4] space-y-1">
                  <div className="text-[11px] text-[#7a7583] font-medium leading-none">Heart Rate</div>
                  <div className="text-base font-bold text-[#191c1d] pt-1">{patient.vitals.hr} <span className="text-xs font-normal text-[#7a7583]">bpm</span></div>
                </div>
              </div>

              {/* 1-column bottom: SpO2 */}
              <div className="p-3 rounded-xl bg-[#f8f9fa] border border-[#e1e3e4] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#7a7583] font-medium">SpO2</div>
                  <div className="text-base font-bold text-[#00838f]">{patient.vitals.spo2}</div>
                </div>
                <TrendingUp className="size-4 text-emerald-600" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/patients/HV-884-291')}
              className="w-full py-2 rounded-lg bg-white border border-[#cbc4d4] text-xs font-semibold text-[#191c1d] hover:bg-slate-50 transition-colors shadow-sm focus:outline-none"
            >
              View History
            </button>
          </div>

          {/* Current Medications Card (Figma node 1:6259) */}
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Pill className="size-4 text-[#5b14b8]" aria-hidden="true" />
              <h2 className="text-sm font-bold text-[#191c1d]">Current Medications</h2>
            </div>

            <div className="space-y-3 pt-1">
              {patient.medications.map((med, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-purple-50 text-[#5b14b8] flex items-center justify-center shrink-0 border border-purple-100">
                    <Pill className="size-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#191c1d]">
                      {med.name} {med.dosage}
                    </div>
                    <div className="text-[11px] text-[#7a7583]">
                      {med.instructions}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate('/records/prescriptions')}
              className="w-full py-2 rounded-lg bg-white border border-[#cbc4d4] text-xs font-semibold text-[#191c1d] hover:bg-slate-50 transition-colors shadow-sm focus:outline-none"
            >
              Manage Prescriptions
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
export default MedicalRecordsPage;

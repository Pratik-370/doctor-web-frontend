import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Calendar,
  User,
  Folder,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
  ArrowLeft,
} from 'lucide-react';
import patientAvatar1 from '@/assets/avatars/patient-dir-1.png';
import patientAvatar2 from '@/assets/avatars/patient-dir-2.png';
import patientAvatar3 from '@/assets/avatars/patient-dir-3.png';
import patientAvatar4 from '@/assets/avatars/patient-dir-4.png';

interface PatientRecord {
  id: string;
  name: string;
  healthVaultId: string;
  ageGender: string;
  lastVisit: string;
  status: 'Active' | 'Critical' | 'Waiting' | 'In Consultation';
  avatarType: 'img' | 'initials';
  avatarSrc?: string;
  initials?: string;
  initialsBg?: string;
  initialsColor?: string;
}

const PATIENTS_DATA: PatientRecord[] = [
  {
    id: '1',
    name: 'Eleanor Vance',
    healthVaultId: 'HV-884-291',
    ageGender: '45 / F',
    lastVisit: 'Oct 24, 2023',
    status: 'Active',
    avatarType: 'img',
    avatarSrc: patientAvatar1,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    healthVaultId: 'HV-329-004',
    ageGender: '62 / M',
    lastVisit: 'Today',
    status: 'Critical',
    avatarType: 'initials',
    initials: 'MC',
    initialsBg: '#74001e',
    initialsColor: '#ff7380',
  },
  {
    id: '3',
    name: 'Julian Bashir',
    healthVaultId: 'HV-112-998',
    ageGender: '28 / M',
    lastVisit: 'Sep 12, 2023',
    status: 'Waiting',
    avatarType: 'img',
    avatarSrc: patientAvatar2,
  },
];

export const PatientDirectoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'today'>('all');
  const [selectedAge, setSelectedAge] = useState('Any');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const isSearchEmptyView = queryParam.trim().length > 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSearchParams({});
    setActiveTab('all');
    setSelectedAge('Any');
    setSelectedGender('All');
    setSelectedBloodGroup('All');
    setSelectedStatus('All');
  };

  // If search query is active (Figma node 1:745 - Refined Search: No Results)
  if (isSearchEmptyView) {
    return (
      <div className="w-full space-y-6" data-node-id="1:745">
        {/* Search Results Header & Filter Tags (Figma node 1:772) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#191c1d]">
            Patient Search Results
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#76f1ff] border border-[#76f1ff] text-[#006d76] text-xs font-medium tracking-wide rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <span>Status: Active</span>
              <button
                type="button"
                onClick={handleClearFilters}
                className="hover:opacity-75 focus:outline-none"
                aria-label="Remove active filter"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </span>
            <span className="bg-[#76f1ff] border border-[#76f1ff] text-[#006d76] text-xs font-medium tracking-wide rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <span>Age: 40-60</span>
              <button
                type="button"
                onClick={handleClearFilters}
                className="hover:opacity-75 focus:outline-none"
                aria-label="Remove age filter"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </span>
          </div>
        </div>

        {/* Empty State Card (Figma node 1:791) */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e1e3e4] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[540px]">
          <div className="max-w-[448px] w-full flex flex-col items-center text-center">
            {/* Medical Search Illustration Composition (Figma node 1:808) */}
            <div className="relative size-32 sm:size-40 flex items-center justify-center mb-6">
              {/* Decorative blurs */}
              <div className="absolute inset-0 rounded-full bg-[#e8ddff] blur-xl opacity-40" />
              <div className="absolute inset-4 rounded-full bg-[#76f1ff] blur-md opacity-25" />

              {/* White Icon Circle */}
              <div className="relative size-24 rounded-full bg-white border border-[#e7e8e9] shadow-sm flex items-center justify-center">
                <div className="relative flex items-center justify-center text-[#28006d]">
                  <Search className="size-9 stroke-[2.2]" aria-hidden="true" />
                </div>
                {/* Red Exclamation Alert Badge (Figma node 1:815) */}
                <div className="absolute -bottom-1 -right-1 size-7 rounded-full bg-[#ffdad6] border-2 border-white flex items-center justify-center text-[#93000a]">
                  <AlertCircle className="size-4" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Heading (Figma node 1:795) */}
            <h2 className="text-xl sm:text-2xl font-semibold text-[#191c1d] mb-3">
              No matching patients found.
            </h2>

            {/* Guidance Text (Figma node 1:798) */}
            <div className="text-sm sm:text-base text-[#494552] leading-relaxed mb-8">
              <p>Try searching using:</p>
              <p>• Health Vault ID</p>
              <p>• Patient Name</p>
              <p>• Mobile Number</p>
              <p>• Medical Record Number</p>
              <p>or adjust your filters.</p>
            </div>

            {/* Action Buttons (Figma node 1:799) */}
            <div className="w-full max-w-[328px] space-y-3">
              <button
                type="button"
                onClick={handleClearFilters}
                className="w-full h-10 border border-[#7a7583] hover:bg-slate-50 text-[#28006d] font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
              >
                <Filter className="size-4" aria-hidden="true" />
                <span>Clear Filters</span>
              </button>

              <button
                type="button"
                onClick={handleClearFilters}
                className="w-full h-10 bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                <span>Back to Patient Directory</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Primary Patient Directory View (Figma node 1:6657)
  return (
    <div className="w-full space-y-6" data-node-id="1:6657">
      {/* Top 2-Column Section: Search & Filters (Left) + Recently Viewed (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Title + Search & Filters Card (Figma node 1:6785) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Page Header (Figma node 1:6786) */}
          <div className="space-y-1">
            <h1 className="text-[32px] font-semibold text-[#191c1d] leading-[40px]">
              Patients
            </h1>
            <p className="text-sm text-[#494552] leading-[20px]">
              Search and manage patient records.
            </p>
          </div>

          {/* Search & Filters Card (Figma node 1:6791) */}
          <div className="bg-white border border-[#e1e3e4] rounded-xl p-[17px] shadow-sm flex flex-col gap-4">
            {/* Global Search Input Row (Figma node 1:6793) */}
            <form onSubmit={handleSearchSubmit} className="flex gap-4 items-center w-full">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7a7583]"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Global search: Patient Name, ID, Mobile, DOB"
                  className="w-full h-11 bg-[#f3f4f5] border border-[#cbc4d4] rounded-lg pl-10 pr-4 text-sm text-[#191c1d] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#5b14b8] focus:bg-white transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-[#3f1d8b] hover:bg-[#28006d] text-[#ab8efd] text-sm font-medium rounded-lg px-4 h-11 flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b14b8] shrink-0"
              >
                <Filter className="size-4" aria-hidden="true" />
                <span>Filters</span>
              </button>
            </form>

            {/* Filter Fields Row (Figma node 1:6804) */}
            <div className="bg-[#f3f4f5] border border-[#cbc4d4] rounded-lg p-[17px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {/* Age */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#494552] tracking-wide block">
                  Age
                </label>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full h-8 bg-white border border-[#cbc4d4] rounded px-2 text-xs text-[#191c1d] focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
                >
                  <option value="Any">Any</option>
                  <option value="0-18">0-18</option>
                  <option value="19-40">19-40</option>
                  <option value="41-60">41-60</option>
                  <option value="60+">60+</option>
                </select>
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#494552] tracking-wide block">
                  Gender
                </label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full h-8 bg-white border border-[#cbc4d4] rounded px-2 text-xs text-[#191c1d] focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
                >
                  <option value="All">All</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Blood Group */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#494552] tracking-wide block">
                  Blood Group
                </label>
                <select
                  value={selectedBloodGroup}
                  onChange={(e) => setSelectedBloodGroup(e.target.value)}
                  className="w-full h-8 bg-white border border-[#cbc4d4] rounded px-2 text-xs text-[#191c1d] focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
                >
                  <option value="All">All</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              {/* Last Visit */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#494552] tracking-wide block">
                  Last Visit
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="mm/dd"
                    className="w-full h-8 bg-white border border-[#cbc4d4] rounded pl-2 pr-6 text-xs text-[#191c1d] focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
                  />
                  <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 size-3 text-[#7a7583] pointer-events-none" />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#494552] tracking-wide block">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full h-8 bg-white border border-[#cbc4d4] rounded px-2 text-xs text-[#191c1d] focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Critical">Critical</option>
                  <option value="Waiting">Waiting</option>
                  <option value="In Consultation">In Consultation</option>
                </select>
              </div>

              {/* Doctor */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#494552] tracking-wide block">
                  Doctor
                </label>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-8 bg-white border border-[#cbc4d4] rounded px-2 text-xs text-[#191c1d] focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
                />
              </div>
            </div>

            {/* Quick Filter Tabs (Figma node 1:6857) */}
            <div className="flex gap-2.5 items-center flex-wrap pt-1">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`text-sm font-medium rounded-full px-4 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8] ${
                  activeTab === 'all'
                    ? 'bg-[#76f1ff] text-[#006d76]'
                    : 'border border-[#cbc4d4] text-[#494552] hover:bg-slate-50'
                }`}
              >
                All Patients
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('active')}
                className={`text-sm font-medium rounded-full px-4 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8] ${
                  activeTab === 'active'
                    ? 'bg-[#76f1ff] text-[#006d76]'
                    : 'border border-[#cbc4d4] text-[#494552] hover:bg-slate-50'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('today')}
                className={`text-sm font-medium rounded-full px-4 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8] ${
                  activeTab === 'today'
                    ? 'bg-[#76f1ff] text-[#006d76]'
                    : 'border border-[#cbc4d4] text-[#494552] hover:bg-slate-50'
                }`}
              >
                Today's Appointments
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Recently Viewed + Recent Searches (Figma node 1:6885) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Recently Viewed Card (Figma node 1:6886) */}
          <div className="bg-white border border-[#e1e3e4] rounded-xl p-[21px] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-[#191c1d]" aria-hidden="true" />
              <h2 className="text-base font-semibold text-[#191c1d]">
                Recently Viewed
              </h2>
            </div>

            <div className="space-y-3">
              {/* Item 1: Robert King */}
              <div
                onClick={() => navigate('/patients/HV-102-443')}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <img
                  src={patientAvatar3}
                  alt="Robert King"
                  className="size-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-base font-normal text-[#191c1d] truncate">
                      Robert King
                    </p>
                    <span className="bg-[#e1e3e4] text-[#494552] text-[10px] font-bold rounded-full px-1.5 py-0.5 shrink-0">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-[#494552] truncate">
                    HV-102-443 • 10 mins ago
                  </p>
                </div>
              </div>

              {/* Item 2: Amanda Lewis */}
              <div
                onClick={() => navigate('/patients/HV-882-110')}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="size-10 rounded-full bg-[#76f1ff] text-[#006d76] flex items-center justify-center font-normal text-base shrink-0">
                  AL
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-base font-normal text-[#191c1d] truncate">
                      Amanda Lewis
                    </p>
                    <span className="bg-[#e1e3e4] text-[#494552] text-[10px] font-bold rounded-full px-1.5 py-0.5 shrink-0">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-[#494552] truncate">
                    HV-882-110 • 25 mins ago
                  </p>
                </div>
              </div>

              {/* Item 3: David Chen */}
              <div
                onClick={() => navigate('/patients/HV-445-992')}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <img
                  src={patientAvatar4}
                  alt="David Chen"
                  className="size-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-base font-normal text-[#191c1d] truncate">
                      David Chen
                    </p>
                    <span className="bg-[#ffdad6] text-[#93000a] text-[10px] font-bold rounded-full px-1.5 py-0.5 shrink-0">
                      Critical
                    </span>
                  </div>
                  <p className="text-sm text-[#494552] truncate">
                    HV-445-992 • 1 hr ago
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Searches Card (Figma node 1:6920) */}
          <div className="bg-white border border-[#e1e3e4] rounded-xl p-[21px] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Search className="size-4 text-[#191c1d]" aria-hidden="true" />
              <h2 className="text-base font-semibold text-[#191c1d]">
                Recent Searches
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Diabetes', 'Hypertension', 'HV-329', 'Smith'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    setSearchParams({ q: tag });
                  }}
                  className="bg-[#f3f4f5] border border-[#cbc4d4] hover:bg-slate-200/60 rounded-full px-3 py-1 text-xs tracking-wide text-[#494552] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Patient Master Table (Figma node 1:6684) */}
      <div className="bg-white border border-[#e1e3e4] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#f3f4f5] border-b border-[#e1e3e4]">
                <th className="px-4 py-3 text-sm sm:text-base font-medium text-[#494552] w-[218px]">
                  Patient
                </th>
                <th className="px-4 py-3 text-sm sm:text-base font-medium text-[#494552] w-[168px]">
                  Health Vault ID
                </th>
                <th className="px-4 py-3 text-sm sm:text-base font-medium text-[#494552] w-[151px]">
                  Age/Gender
                </th>
                <th className="px-4 py-3 text-sm sm:text-base font-medium text-[#494552] w-[141px]">
                  Last Visit
                </th>
                <th className="px-4 py-3 text-sm sm:text-base font-medium text-[#494552] w-[172px]">
                  Status
                </th>
                <th className="px-4 py-3 text-sm sm:text-base font-medium text-[#494552] text-right w-[106px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e3e4]">
              {PATIENTS_DATA.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    idx % 2 === 1 ? 'bg-[#f8f9fa]' : 'bg-white'
                  }`}
                >
                  {/* Patient Name & Avatar */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      {p.avatarType === 'img' && p.avatarSrc ? (
                        <img
                          src={p.avatarSrc}
                          alt={p.name}
                          className="size-8 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div
                          className="size-8 rounded-full flex items-center justify-center font-normal text-sm shrink-0"
                          style={{
                            backgroundColor: p.initialsBg || '#74001e',
                            color: p.initialsColor || '#ff7380',
                          }}
                        >
                          {p.initials}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => navigate(`/patients/${p.healthVaultId}`)}
                        className="text-base font-semibold text-[#191c1d] hover:text-[#5b14b8] transition-colors text-left"
                      >
                        {p.name}
                      </button>
                    </div>
                  </td>

                  {/* Health Vault ID */}
                  <td className="px-4 py-3.5 text-sm text-[#494552]">
                    {p.healthVaultId}
                  </td>

                  {/* Age / Gender */}
                  <td className="px-4 py-3.5 text-sm text-[#494552]">
                    {p.ageGender}
                  </td>

                  {/* Last Visit */}
                  <td className="px-4 py-3.5 text-sm text-[#494552]">
                    {p.lastVisit}
                  </td>

                  {/* Status Pill */}
                  <td className="px-4 py-3.5">
                    {p.status === 'Active' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide bg-[#76f1ff] text-[#006d76]">
                        Active
                      </span>
                    )}
                    {p.status === 'Critical' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide bg-[#ffdad6] text-[#93000a]">
                        Critical
                      </span>
                    )}
                    {p.status === 'Waiting' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide bg-[#fff8e1] text-[#f57f17]">
                        Waiting
                      </span>
                    )}
                    {p.status === 'In Consultation' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide bg-[#3f1d8b] text-[#ab8efd]">
                        In Consultation
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/patients/${p.healthVaultId}`)}
                        title="View Patient Profile"
                        className="p-1 rounded text-[#494552] hover:text-[#28006d] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
                      >
                        <User className="size-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/records')}
                        title="View Health Records"
                        className="p-1 rounded text-[#494552] hover:text-[#28006d] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
                      >
                        <Folder className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (Figma node 1:6864) */}
        <div className="px-4 py-4 border-t border-[#e1e3e4] flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
          <p className="text-sm text-[#494552]">
            Showing 1 to 10 of 245 entries
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled
              className="p-1.5 rounded text-slate-300 cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="size-8 rounded-full bg-[#28006d] text-white font-medium text-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#28006d]"
            >
              1
            </button>
            <button
              type="button"
              className="size-8 rounded-full text-[#494552] hover:bg-slate-100 font-medium text-sm flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-slate-300"
            >
              2
            </button>
            <button
              type="button"
              className="size-8 rounded-full text-[#494552] hover:bg-slate-100 font-medium text-sm flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-slate-300"
            >
              3
            </button>
            <span className="px-1 text-sm text-[#7a7583]">...</span>
            <button
              type="button"
              className="size-8 rounded-full text-[#494552] hover:bg-slate-100 font-medium text-sm flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-slate-300"
            >
              25
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-[#494552] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-300"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

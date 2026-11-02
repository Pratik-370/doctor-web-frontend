import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Download,
  MoreVertical,
  Plus,
  Search,
  SlidersHorizontal,
  TriangleAlert,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Printer,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  DEFAULT_REFERRALS_DATA,
  ReferralRecord,
} from './types';
import doctorAvatarPrimary from '@/assets/avatars/doctor-profile-primary.png';

export const ReferralDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [referrals] = useState<ReferralRecord[]>(DEFAULT_REFERRALS_DATA);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Filtered referrals
  const filteredReferrals = useMemo(() => {
    return referrals.filter((item) => {
      // Tab filtering
      if (selectedFilter === 'Outgoing' && item.direction !== 'outgoing') return false;
      if (selectedFilter === 'Incoming' && item.direction !== 'incoming') return false;
      if (selectedFilter === 'Pending' && item.status !== 'pending') return false;
      if (selectedFilter === 'Accepted' && item.status !== 'accepted') return false;
      if (selectedFilter === 'Urgent' && item.priority !== 'urgent') return false;

      // Search query filtering
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesPatient = item.patient.name.toLowerCase().includes(query);
        const matchesId = item.refNumber.toLowerCase().includes(query);
        const matchesSpecialty = item.specialty.toLowerCase().includes(query);
        const matchesDoctor =
          item.referringProvider.name.toLowerCase().includes(query) ||
          item.receivingProvider.name.toLowerCase().includes(query);
        if (!matchesPatient && !matchesId && !matchesSpecialty && !matchesDoctor) {
          return false;
        }
      }

      return true;
    });
  }, [referrals, selectedFilter, searchQuery]);

  const stats = useMemo(() => {
    return {
      outgoing: 24,
      incoming: 18,
      pending: 12,
      completed: 45,
      urgent: 3,
    };
  }, []);

  return (
    <div className="w-full space-y-6 pb-16">
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

      {/* Header and Global Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Referral Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage incoming and outgoing patient transfers
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/referrals/new')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#20005a] hover:bg-[#320078] active:scale-[0.98] text-white text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
        >
          <div className="size-5 rounded-full bg-white/20 flex items-center justify-center">
            <Plus className="size-3.5 stroke-[3]" />
          </div>
          <span>New Referral</span>
        </button>
      </div>

      {/* 5 Bento Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* 1. Outgoing Referrals */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <ArrowUpRight className="size-5 text-slate-600" />
            <span className="px-2.5 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-full">
              This Week
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{stats.outgoing}</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Outgoing Referrals</div>
          </div>
        </div>

        {/* 2. Incoming Referrals */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <ArrowDownLeft className="size-5 text-slate-600" />
            <span className="px-2.5 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-full">
              This Week
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{stats.incoming}</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Incoming Referrals</div>
          </div>
        </div>

        {/* 3. Pending Action */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <Clock className="size-5 text-teal-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-teal-600">{stats.pending}</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Pending Action</div>
          </div>
        </div>

        {/* 4. Completed (30d) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="size-5 text-teal-700" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{stats.completed}</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Completed (30d)</div>
          </div>
        </div>

        {/* 5. Urgent Attention */}
        <div className="bg-[#feecee] rounded-2xl border border-[#fecdd3] p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <TriangleAlert className="size-5 text-red-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-red-600">{stats.urgent}</div>
            <div className="text-xs font-semibold text-red-700 mt-1">Urgent Attention</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search / Export Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Outgoing', 'Incoming', 'Pending', 'Accepted', 'Urgent'].map((tab) => {
            const isSelected = selectedFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#3f1d8b] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search referrals..."
              className="h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 w-44 sm:w-56"
            />
          </div>

          <button
            type="button"
            onClick={() => triggerToast('Advanced referral filtering modal opened')}
            className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5 shadow-sm"
          >
            <SlidersHorizontal className="size-3.5 text-slate-500" />
            <span>More Filters</span>
          </button>

          <button
            type="button"
            onClick={() => triggerToast('Exporting referral audit log CSV...')}
            className="size-9 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center justify-center shadow-sm"
            aria-label="Export records"
          >
            <Download className="size-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Referrals Data Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0px_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/50 text-[11px] font-semibold text-slate-500 tracking-wider">
                <th className="py-3.5 px-6">Patient Details</th>
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Direction / Doctor</th>
                <th className="py-3.5 px-4">Specialty</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredReferrals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-xs">
                    No referrals match your current filters.
                  </td>
                </tr>
              ) : (
                filteredReferrals.map((item) => {
                  const isUrgent = item.priority === 'urgent';
                  const isOutgoing = item.direction === 'outgoing';

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => navigate(`/referrals/${item.id}`)}
                    >
                      {/* Patient Details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {item.patient.avatarUrl ? (
                            <img
                              src={doctorAvatarPrimary}
                              alt={item.patient.name}
                              className="size-9 rounded-full object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="size-9 rounded-full bg-purple-50 text-purple-700 font-semibold text-xs flex items-center justify-center border border-purple-100">
                              {item.patient.initials || 'PT'}
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-slate-900 group-hover:text-[#5b14b8] transition-colors">
                              {item.patient.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              DOB: {item.patient.dob}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ID */}
                      <td className="py-4 px-4 font-mono text-xs text-slate-500">
                        {item.refNumber}
                      </td>

                      {/* Direction / Doctor */}
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-2">
                          {isOutgoing ? (
                            <ArrowUpRight className="size-4 text-slate-400 shrink-0 mt-0.5" />
                          ) : (
                            <ArrowDownLeft className="size-4 text-slate-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-xs font-medium text-slate-800">
                              {isOutgoing
                                ? item.receivingProvider.name
                                : item.referringProvider.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {isOutgoing
                                ? item.receivingProvider.facility
                                : item.referringProvider.facility}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Specialty */}
                      <td className="py-4 px-4 text-xs font-medium text-slate-700">
                        {item.specialty}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-xs text-slate-500">
                        {item.date}
                      </td>

                      {/* Priority */}
                      <td className="py-4 px-4">
                        {isUrgent ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#feecee] text-[#d92d20] border border-[#fecdd3]">
                            <TriangleAlert className="size-3" />
                            <span>Urgent</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
                            Routine
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`size-2 rounded-full ${
                              item.status === 'pending'
                                ? 'bg-teal-500'
                                : item.status === 'accepted'
                                ? 'bg-[#3f1d8b]'
                                : item.status === 'completed'
                                ? 'bg-slate-400'
                                : 'bg-blue-500'
                            }`}
                          />
                          <span className="text-xs font-medium text-slate-800 capitalize">
                            {item.status === 'under_review' ? 'Under Review' : item.status}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td
                        className="py-4 px-6 text-right relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuId(activeMenuId === item.id ? null : item.id)
                          }
                          className="size-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
                          aria-label="More actions"
                        >
                          <MoreVertical className="size-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenuId === item.id && (
                          <div className="absolute right-6 top-12 z-20 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 text-xs animate-in fade-in zoom-in-95">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                navigate(`/referrals/${item.id}`);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                            >
                              <Eye className="size-3.5 text-slate-400" />
                              <span>View Referral Details</span>
                            </button>

                            {item.direction === 'incoming' && (
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  navigate(`/referrals/incoming/${item.id}`);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-[#5b14b8] font-medium"
                              >
                                <FileText className="size-3.5 text-[#5b14b8]" />
                                <span>Review Incoming Triage</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                triggerToast(`Printing referral ${item.refNumber} slip...`);
                                window.print();
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                            >
                              <Printer className="size-3.5 text-slate-400" />
                              <span>Print Referral Slip</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing 1–{filteredReferrals.length} of 42 referrals
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`size-8 rounded-lg font-medium flex items-center justify-center ${
                currentPage === 1
                  ? 'bg-[#3f1d8b] text-white'
                  : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`size-8 rounded-lg font-medium flex items-center justify-center ${
                currentPage === 2
                  ? 'bg-[#3f1d8b] text-white'
                  : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`size-8 rounded-lg font-medium flex items-center justify-center ${
                currentPage === 3
                  ? 'bg-[#3f1d8b] text-white'
                  : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              3
            </button>

            <button
              type="button"
              disabled={currentPage === 3}
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

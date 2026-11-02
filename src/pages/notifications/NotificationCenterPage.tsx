import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  FileText,
  UserCheck,
  Clock,
  Settings,
  Search,
  ExternalLink,
  ShieldAlert,
  SlidersHorizontal,
  Info,
  CheckCircle2,
  X,
} from 'lucide-react';
import { INITIAL_NOTIFICATIONS, NotificationItem } from './types';

export const NotificationCenterPage: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Mark single notification as read
  const handleMarkAsRead = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    showToast('Notification marked as read');
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  // Dismiss notification
  const handleDismiss = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast('Notification dismissed');
  };

  // Computed counts
  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);
  const criticalCount = useMemo(
    () => notifications.filter((n) => n.category === 'critical' && !n.isRead).length,
    [notifications]
  );
  const pendingReferralCount = useMemo(
    () => notifications.filter((n) => n.category === 'referral' && !n.isRead).length,
    [notifications]
  );
  const pendingOcrCount = useMemo(
    () => notifications.filter((n) => n.category === 'ocr' && !n.isRead).length,
    [notifications]
  );

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      // Filter by category or status
      if (activeFilter === 'unread' && n.isRead) return false;
      if (activeFilter === 'critical' && n.category !== 'critical') return false;
      if (activeFilter === 'patient' && n.category !== 'patient') return false;
      if (activeFilter === 'referral' && n.category !== 'referral') return false;
      if (activeFilter === 'ocr' && n.category !== 'ocr') return false;
      if (activeFilter === 'prescription' && n.category !== 'prescription') return false;
      if (activeFilter === 'system' && n.category !== 'system') return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = n.title.toLowerCase().includes(query);
        const matchesBody = n.body.toLowerCase().includes(query);
        const matchesPatient = n.patientName?.toLowerCase().includes(query);
        return matchesTitle || matchesBody || matchesPatient;
      }
      return true;
    });
  }, [notifications, activeFilter, searchQuery]);

  return (
    <div
      data-node-id="1:3950"
      data-testid="notification-center-page"
      className="w-full space-y-6 pb-12"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Demonstration Banner */}
      <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-[#28006d] text-white flex items-center justify-center shrink-0">
            <Bell className="size-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#28006d]">Demonstration Mode</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-[#5b14b8]">
                Local Frontend State
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Live WebSocket push delivery is simulated. Actions update frontend state and route to verified milestone workstations.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/settings/notifications')}
          className="shrink-0 text-xs font-semibold text-[#28006d] hover:text-[#5b14b8] flex items-center gap-1.5 transition-colors"
        >
          <SlidersHorizontal className="size-3.5" />
          <span>Preferences</span>
        </button>
      </div>

      {/* Main Content Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Page Header, Summary Bento, Filters, Notification List (lg:col-span-8) */}
        <div
          data-node-id="1:3953"
          data-testid="notifications-left-column"
          className="lg:col-span-8 space-y-5"
        >
          {/* Page Header (1:3954) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-[-0.6px]">
                Notification Center
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage clinical alerts, tasks, and system updates.
              </p>
            </div>

            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#28006d] text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs w-fit"
            >
              <CheckCheck className="size-4 text-[#28006d]" />
              <span>Mark all as read</span>
            </button>
          </div>

          {/* Bento Style Summary Cards (1:3964) */}
          <div
            data-node-id="1:3964"
            data-testid="notifications-bento-row"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {/* Card 1: Unread Notifications */}
            <div
              data-node-id="1:3965"
              className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[136px]"
            >
              <div className="flex items-start justify-between">
                <div className="size-10 rounded-full bg-[#e8ddff] text-[#28006d] flex items-center justify-center">
                  <Bell className="size-5" />
                </div>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">
                  {unreadCount}
                </span>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-600 leading-tight">
                  Unread Notifications
                </div>
              </div>
            </div>

            {/* Card 2: Critical Alerts */}
            <div
              data-node-id="1:3974"
              className="bg-[#ffdad6] border border-[#ba1a1a]/20 rounded-2xl p-4 shadow-[0px_2px_8px_rgba(186,26,26,0.08)] flex flex-col justify-between h-[136px] relative overflow-hidden"
            >
              <div className="absolute -top-3 -right-3 size-16 rounded-full bg-[#ba1a1a]/10 blur-md pointer-events-none" />
              <div className="flex items-start justify-between relative z-10">
                <div className="size-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center">
                  <ShieldAlert className="size-5" />
                </div>
                <span className="text-3xl font-bold text-[#93000a] tracking-tight">
                  {criticalCount}
                </span>
              </div>
              <div className="relative z-10">
                <div className="text-xs font-bold text-[#93000a] leading-tight">
                  Critical Alerts
                </div>
              </div>
            </div>

            {/* Card 3: Pending Referrals */}
            <div
              data-node-id="1:3984"
              className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[136px]"
            >
              <div className="flex items-start justify-between">
                <div className="size-10 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center">
                  <UserCheck className="size-5" />
                </div>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">
                  {pendingReferralCount}
                </span>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-600 leading-tight">
                  Pending Referrals
                </div>
              </div>
            </div>

            {/* Card 4: Pending OCR */}
            <div
              data-node-id="1:3993"
              className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[136px]"
            >
              <div className="flex items-start justify-between">
                <div className="size-10 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                  <FileText className="size-5" />
                </div>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">
                  {pendingOcrCount}
                </span>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-600 leading-tight">
                  Pending OCR
                </div>
              </div>
            </div>
          </div>

          {/* Filter Pills & Search Bar (1:4002) */}
          <div className="space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alerts, patients, or keywords..."
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 focus:border-[#5b14b8] shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills (1:4002) */}
            <div
              data-node-id="1:4002"
              data-testid="notifications-filter-pills"
              className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
            >
              {[
                { id: 'all', label: 'All' },
                { id: 'unread', label: 'Unread' },
                { id: 'critical', label: 'Critical' },
                { id: 'patient', label: 'Patient' },
                { id: 'referral', label: 'Referral' },
                { id: 'ocr', label: 'OCR' },
                { id: 'prescription', label: 'Prescription' },
                { id: 'system', label: 'System' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setActiveFilter(pill.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.1px] whitespace-nowrap transition-colors shadow-xs ${
                    activeFilter === pill.id
                      ? 'bg-[#28006d] text-white font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notification List Container (1:4019) */}
          <div
            data-node-id="1:4019"
            data-testid="notification-list-container"
            className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.04)] divide-y divide-slate-100"
          >
            {/* Header Row */}
            <div className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Showing {filteredNotifications.length} notifications</span>
              <span className="font-mono text-[11px]">Sorted by severity</span>
            </div>

            {/* Notification Rows */}
            {filteredNotifications.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="size-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Bell className="size-6" />
                </div>
                <div className="text-sm font-bold text-slate-800">No notifications found</div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No notifications match your current filter criteria. Try clearing your search or switching categories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#28006d] text-white text-xs font-semibold hover:bg-[#3f1d8b] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  data-testid={`notification-item-${item.id}`}
                  className={`p-5 flex items-start gap-4 transition-colors relative ${
                    item.severity === 'critical'
                      ? 'bg-rose-50/30 hover:bg-rose-50/50'
                      : item.isRead
                      ? 'bg-white hover:bg-slate-50/80'
                      : 'bg-purple-50/20 hover:bg-purple-50/40'
                  }`}
                >
                  {/* Left severity indicator border for critical items */}
                  {item.severity === 'critical' && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ba1a1a]" />
                  )}

                  {/* Icon Circle */}
                  <div
                    className={`size-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      item.severity === 'critical'
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : item.category === 'referral'
                        ? 'bg-cyan-100 text-cyan-800'
                        : item.category === 'ocr'
                        ? 'bg-amber-100 text-amber-800'
                        : item.category === 'prescription'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.severity === 'critical' ? (
                      <ShieldAlert className="size-5" />
                    ) : item.category === 'referral' ? (
                      <UserCheck className="size-5" />
                    ) : item.category === 'ocr' ? (
                      <FileText className="size-5" />
                    ) : item.category === 'prescription' ? (
                      <CheckCheck className="size-5" />
                    ) : (
                      <Info className="size-5" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 leading-snug">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span
                            className={`text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-[3px] uppercase ${
                              item.badge === 'CRITICAL'
                                ? 'bg-[#ba1a1a] text-white'
                                : item.badge === 'URGENT'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {!item.isRead && (
                          <span className="size-2 rounded-full bg-[#5b14b8] ring-2 ring-purple-100" />
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{item.body}</p>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {item.actionLabel && item.actionUrl && (
                        <button
                          type="button"
                          onClick={() => navigate(item.actionUrl!)}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs ${
                            item.severity === 'critical'
                              ? 'bg-[#ba1a1a] text-white hover:bg-[#93000a]'
                              : 'bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white hover:opacity-95'
                          }`}
                        >
                          <span>{item.actionLabel}</span>
                          <ExternalLink className="size-3" />
                        </button>
                      )}

                      {!item.isRead ? (
                        <button
                          type="button"
                          onClick={(e) => handleMarkAsRead(item.id, e)}
                          className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors"
                        >
                          Mark as read
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleDismiss(item.id, e)}
                          className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-400 hover:text-slate-600 text-xs font-medium transition-colors"
                        >
                          Dismiss
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar: Stats & Activity (lg:col-span-4) (1:4112) */}
        <div
          data-node-id="1:4112"
          data-testid="notifications-right-sidebar"
          className="lg:col-span-4 space-y-5"
        >
          {/* Notification Stats Card (1:4113) */}
          <div
            data-node-id="1:4113"
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Notification Stats
            </h3>

            {/* Read Rate Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Alert Read Rate</span>
                <span className="text-slate-900 font-bold">75%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#5b14b8] rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            {/* Response Time Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">SLA Triage Compliance</span>
                <span className="text-slate-900 font-bold">92%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
          </div>

          {/* Today's Alerts Digest (1:4133) */}
          <div
            data-node-id="1:4133"
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="size-4.5 text-[#5b14b8]" />
              <h3 className="text-base font-bold text-slate-900">Today's Alerts Digest</h3>
            </div>

            <div className="space-y-3.5 divide-y divide-slate-100">
              <div className="pt-1 flex items-start gap-3">
                <div className="size-2 rounded-full bg-[#ba1a1a] mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">3 Critical Labs</div>
                  <div className="text-[11px] text-slate-500">Require immediate physician attention</div>
                </div>
              </div>

              <div className="pt-3 flex items-start gap-3">
                <div className="size-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">5 New Referrals</div>
                  <div className="text-[11px] text-slate-500">Pending specialist triage & review</div>
                </div>
              </div>

              <div className="pt-3 flex items-start gap-3">
                <div className="size-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">12 Prescriptions</div>
                  <div className="text-[11px] text-slate-500">Awaiting digital signature & DEA verification</div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings Hint Card (1:4159) */}
          <div
            data-node-id="1:4159"
            className="bg-gradient-to-br from-[#28006d] to-[#4500b8] text-white rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden"
          >
            <div className="size-16 rounded-full bg-white/10 absolute -right-3 -bottom-3 blur-sm" />
            <div className="size-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Settings className="size-4 text-white" />
            </div>
            <h3 className="text-base font-bold text-white leading-tight">Notification Settings</h3>
            <p className="text-xs text-purple-100 leading-relaxed">
              Customize your clinical alerts, digest frequency, and emergency SMS forwarding to reduce alert fatigue.
            </p>
            <button
              type="button"
              onClick={() => navigate('/settings/notifications')}
              className="w-full py-2 px-3 rounded-xl bg-white text-[#28006d] hover:bg-purple-50 text-xs font-bold transition-colors shadow-xs"
            >
              Configure Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

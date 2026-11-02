import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileCheck,
  FileText,
  LifeBuoy,
  MessageSquare,
  PhoneCall,
  Search,
  Send,
  Shield,
  ShieldCheck,
  Stethoscope,
  X,
} from 'lucide-react';
import { HELP_TOPICS } from './types';

export const SupportCenterPage: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>('topic-1');
  const [telemetryEnabled, setTelemetryEnabled] = useState(true);
  const [offlineCacheEnabled, setOfflineCacheEnabled] = useState(true);

  // Ticket Modal state
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketCategory, setTicketCategory] = useState('Cath Lab & Intra-Op Workflow');
  const [ticketPriority, setTicketPriority] = useState<'STAT' | 'High' | 'Normal'>('Normal');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');

  // Call helpdesk modal state
  const [showCallModal, setShowCallModal] = useState(false);

  // Legal Modal state
  const [activeLegalModal, setActiveLegalModal] = useState<'terms' | 'hipaa' | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) {
      showToast('Please enter a ticket subject');
      return;
    }
    setShowTicketModal(false);
    setTicketSubject('');
    setTicketDescription('');
    showToast('Support ticket #TKT-8940 submitted (Simulated Demo)');
  };

  // Filtered FAQ Topics
  const filteredTopics = useMemo(() => {
    return HELP_TOPICS.filter((topic) => {
      if (selectedCategory !== 'all' && topic.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          topic.title.toLowerCase().includes(q) ||
          topic.description.toLowerCase().includes(q) ||
          topic.details.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div
      data-node-id="1:5113"
      data-testid="support-center-page"
      className="w-full space-y-6 pb-12"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Breadcrumbs (1:5116) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/dashboard')}>
              Dashboard
            </span>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-slate-700 font-medium">Settings</span>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-slate-900 font-bold">Support &amp; Help Center</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-900">Support &amp; Legal</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your app preferences, find help, and review clinical legal agreements.
          </p>
        </div>

        {/* Settings Tab Navigation Strip */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            My Profile
          </button>
          <button
            type="button"
            onClick={() => navigate('/settings/security')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Security
          </button>
          <button
            type="button"
            onClick={() => navigate('/settings/notifications')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Notifications
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#28006d] shadow-xs"
          >
            Support
          </button>
        </div>
      </div>

      {/* Main Bento Grid Layout (1:5121) */}
      <div className="space-y-6">
        {/* Row 1: Top 2 Cards (Help Center & Contact Support) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Top Left: Help Center & FAQ (1:5122, Span 8) */}
          <div
            data-node-id="1:5122"
            data-testid="help-center-card"
            className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-purple-50 text-[#28006d] flex items-center justify-center shrink-0">
                  <LifeBuoy className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Help Center &amp; Clinical Guides</h3>
                  <p className="text-xs text-slate-500">Search documentation on patient handoffs, OCR, and cath lab workflows.</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles & FAQs..."
                  className="w-full h-8 pl-8 pr-3 rounded-lg border border-slate-200 bg-slate-50/60 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                />
              </div>
            </div>

            {/* Quick Topic Cards (1:5130) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'Clinical Workflows',
                  title: 'Clinical Workflows',
                  desc: 'Patient handoffs & referrals',
                  icon: Stethoscope,
                  color: 'text-purple-600 bg-purple-50',
                },
                {
                  id: 'Account Security',
                  title: 'Account Security',
                  desc: '2FA, YubiKey, and timeouts',
                  icon: ShieldCheck,
                  color: 'text-emerald-600 bg-emerald-50',
                },
                {
                  id: 'Troubleshooting',
                  title: 'Troubleshooting',
                  desc: 'Sync, OCR flags & telemetry',
                  icon: LifeBuoy,
                  color: 'text-cyan-600 bg-cyan-50',
                },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedCategory === cat.id
                      ? 'border-[#5b14b8] bg-purple-50/50 shadow-xs'
                      : 'border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <div className={`size-8 rounded-lg ${cat.color} flex items-center justify-center mb-2`}>
                    <cat.icon className="size-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">{cat.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{cat.desc}</div>
                </button>
              ))}
            </div>

            {/* Interactive Accordion List */}
            <div className="space-y-2 pt-1 divide-y divide-slate-100">
              {filteredTopics.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500">
                  No help topics found matching your query.
                </div>
              ) : (
                filteredTopics.map((topic) => {
                  const isOpen = expandedTopicId === topic.id;
                  return (
                    <div key={topic.id} className="pt-2">
                      <button
                        type="button"
                        onClick={() => setExpandedTopicId(isOpen ? null : topic.id)}
                        className="w-full py-2 flex items-center justify-between text-left gap-4 hover:text-[#5b14b8] transition-colors"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{topic.title}</div>
                          <div className="text-[11px] text-slate-500">{topic.description}</div>
                        </div>
                        <ChevronDown
                          className={`size-4 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-180 text-[#5b14b8]' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="p-3 mt-1 mb-2 bg-slate-50/80 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed animate-in fade-in">
                          {topic.details}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Top Right: Contact Support (1:5149, Span 4) */}
          <div
            data-node-id="1:5149"
            data-testid="contact-support-card"
            className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4"
          >
            <div className="size-10 rounded-full bg-[#e8ddff] text-[#28006d] flex items-center justify-center">
              <PhoneCall className="size-5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">Need Direct Assistance?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Our hospital clinical IT engineering team is available 24/7 for urgent cath lab or telemetry workflow disruptions.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowTicketModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <MessageSquare className="size-4" />
                <span>Submit IT Support Ticket</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCallModal(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="size-4 text-slate-500" />
                <span>Call Clinical IT Helpdesk</span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
              <div className="flex items-center justify-between">
                <span>Clinical IT Hotline:</span>
                <span className="font-mono font-semibold text-slate-800">+1 (800) 555-CARE (Ext. 09)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Direct SLA Response:</span>
                <span className="font-semibold text-emerald-600">&lt; 15 minutes for STAT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Bottom 2 Cards (App & Legal Info + Data & Privacy Preferences) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Bottom Left: App Info & Legal (1:5164, Span 6) */}
          <div
            data-node-id="1:5164"
            data-testid="app-legal-card"
            className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <FileCheck className="size-5 text-[#28006d]" />
              <h3 className="text-base font-bold text-slate-900">App &amp; Legal Governance</h3>
            </div>

            {/* Version Badge Card (1:5168) */}
            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">CareID Doctor Portal</div>
                <div className="text-[11px] text-slate-500">Version 2.4.1 • Build #8940-PROD</div>
              </div>
              <button
                type="button"
                onClick={() => showToast('CareID Portal is up to date (Version 2.4.1)')}
                className="text-xs font-semibold text-[#5b14b8] hover:underline"
              >
                Check for Updates
              </button>
            </div>

            {/* Legal Document Links */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => setActiveLegalModal('terms')}
                className="w-full p-3 rounded-xl border border-slate-100 hover:bg-slate-50 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="size-4 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-800">
                    Terms of Service &amp; Clinical Governance
                  </span>
                </div>
                <ChevronRight className="size-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveLegalModal('hipaa')}
                className="w-full p-3 rounded-xl border border-slate-100 hover:bg-slate-50 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-800">
                    HIPAA Compliance &amp; Business Associate Agreement (BAA)
                  </span>
                </div>
                <ChevronRight className="size-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Bottom Right: Data Preferences (1:5196, Span 6) */}
          <div
            data-node-id="1:5196"
            data-testid="data-preferences-card"
            className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Shield className="size-5 text-[#28006d]" />
              <h3 className="text-base font-bold text-slate-900">Data Preferences &amp; Telemetry</h3>
            </div>

            <div className="space-y-4 pt-1">
              {/* Telemetry Toggle */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-900">Crash Diagnostics &amp; Telemetry</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Share anonymized client performance logs to identify fluoroscopy viewer freezes and network latency.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTelemetryEnabled(!telemetryEnabled);
                    showToast(`Crash diagnostics ${!telemetryEnabled ? 'enabled' : 'disabled'}`);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 focus:outline-none ${
                    telemetryEnabled ? 'bg-[#5b14b8]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      telemetryEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Offline Cache Toggle */}
              <div className="flex items-start justify-between gap-4 pt-3 border-t border-slate-100">
                <div>
                  <div className="text-xs font-bold text-slate-900">Encrypted Cath Lab Offline Cache</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Store active procedure records and emergency allergy profiles locally in encrypted memory for offline surgical continuity.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOfflineCacheEnabled(!offlineCacheEnabled);
                    showToast(`Offline cache ${!offlineCacheEnabled ? 'enabled' : 'disabled'}`);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 focus:outline-none ${
                    offlineCacheEnabled ? 'bg-[#5b14b8]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      offlineCacheEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Submit Clinical IT Ticket</h3>
              <button
                type="button"
                onClick={() => setShowTicketModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-4.5" />
              </button>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white"
                  >
                    <option>Cath Lab &amp; Intra-Op Workflow</option>
                    <option>OCR Document Extraction</option>
                    <option>Diagnostic Reports &amp; Critical Alert</option>
                    <option>Account Credentials &amp; 2FA</option>
                    <option>Hardware Key Recognition</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold">Priority</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value as 'STAT' | 'High' | 'Normal')}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Normal">Normal — Routine Question</option>
                    <option value="High">High — Workflow Delayed</option>
                    <option value="STAT">STAT — Active Procedure Blocked</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold">Subject</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Cine loop recorder lag during angiography"
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold">Description of Issue</label>
                <textarea
                  rows={4}
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  placeholder="Provide clinical context, patient reference ID (if applicable), and steps to reproduce..."
                  className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                />
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-purple-900 text-[11px] leading-tight">
                <strong>Demonstration Note:</strong> This ticket submission is simulated locally. No actual support engineer will be dispatched in demo mode.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white font-bold hover:opacity-95 shadow-xs flex items-center gap-1.5"
                >
                  <Send className="size-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Call Helpdesk Simulated Dialog */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 text-center">
            <div className="size-12 rounded-full bg-purple-100 text-[#5b14b8] flex items-center justify-center mx-auto">
              <PhoneCall className="size-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Clinical IT Hotline</h3>
              <p className="text-xs text-slate-500">
                Direct extension to hospital clinical informatics on-call desk.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="text-slate-400 font-medium">Internal Hospital Speed Dial</div>
              <div className="text-base font-bold text-[#28006d] font-mono">Dial *4357 (*HELP)</div>
              <div className="text-[11px] text-slate-500">External: +1 (800) 555-CARE (Ext. 09)</div>
            </div>

            <p className="text-[11px] text-slate-400">
              [DEMO MODE] No live VoIP line is dialed from the web browser.
            </p>

            <button
              type="button"
              onClick={() => setShowCallModal(false)}
              className="w-full py-2 px-4 rounded-xl bg-[#28006d] text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Legal & HIPAA Agreement Dialog */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {activeLegalModal === 'terms'
                  ? 'Terms of Service & Clinical Governance'
                  : 'HIPAA Compliance & Business Associate Agreement'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-4.5" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-3 text-xs text-slate-600 pr-2">
              <p>
                <strong>1. Authorized Physician Access:</strong> Access to the CareID Doctor Web Portal is strictly limited to credentialed healthcare providers and privileged personnel. All patient interactions, diagnostic reports, and procedure orders are cryptographically logged for clinical audit trails.
              </p>
              <p>
                <strong>2. Patient Data Confidentiality:</strong> All Protected Health Information (PHI) is encrypted at rest and in transit in accordance with HIPAA Security Rules (45 CFR Part 160 and Part 164). Unauthorized export or retention of medical imagery is strictly prohibited.
              </p>
              <p>
                <strong>3. Clinical Decision Support:</strong> Algorithmic laboratory interpretations and OCR extractions serve solely as clinical decision support tools and do not substitute for independent professional medical judgment.
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-[#28006d] text-white font-bold text-xs hover:bg-[#3f1d8b]"
              >
                Acknowledge &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

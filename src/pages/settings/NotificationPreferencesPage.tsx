import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Mail,
  RotateCcw,
  Save,
  ShieldAlert,
  Smartphone,
  Volume2,
} from 'lucide-react';
import { DEFAULT_NOTIFICATION_PREFERENCES, NotificationPreferences } from './types';

export const NotificationPreferencesPage: React.FC = () => {
  const navigate = useNavigate();

  const [prefs, setPrefs] = useState<NotificationPreferences>(DEFAULT_NOTIFICATION_PREFERENCES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = () => {
    showToast('Notification preferences saved successfully');
  };

  const handleReset = () => {
    setPrefs(DEFAULT_NOTIFICATION_PREFERENCES);
    showToast('Preferences reset to clinical defaults');
  };

  const toggleCategoryChannel = (
    category: keyof NotificationPreferences['categories'],
    channel: 'email' | 'inApp' | 'sms'
  ) => {
    setPrefs((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          [channel]: !prev.categories[category][channel],
        },
      },
    }));
  };

  return (
    <div
      data-node-id="1:4834"
      data-testid="notification-preferences-page"
      className="w-full space-y-6 pb-12"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Breadcrumbs (1:4837) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/dashboard')}>
              Dashboard
            </span>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-slate-700 font-medium">Settings</span>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-slate-900 font-bold">Notification Preferences</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-900">Notification Preferences</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage how you receive clinical alerts, triage notices, and system updates.
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
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#28006d] shadow-xs"
          >
            Notifications
          </button>
          <button
            type="button"
            onClick={() => navigate('/settings/support')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Support
          </button>
        </div>
      </div>

      {/* Main 2-Column Bento Grid Layout (1:4849) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Main Alert Settings (1:4850, lg:col-span-8) */}
        <div
          data-node-id="1:4850"
          data-testid="notification-preferences-main-column"
          className="lg:col-span-8 space-y-6"
        >
          {/* Critical Alerts Card (1:4851) */}
          <div
            data-node-id="1:4851"
            className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-5 relative overflow-hidden"
          >
            {/* Left 4px Red Accent Bar (1:4862) */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ba1a1a]" />

            <div className="flex items-start gap-3.5">
              <div className="size-10 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                <ShieldAlert className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Critical Clinical Alerts</h3>
                <p className="text-xs text-slate-500">
                  Immediate notifications for life-threatening or panic patient findings (e.g. STAT Potassium &gt; 6.0).
                </p>
              </div>
            </div>

            <div className="space-y-3.5 divide-y divide-slate-100">
              {/* Toggle 1: Urgent SMS */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="size-4 text-slate-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">SMS / Text Message Alerts</div>
                    <div className="text-[11px] text-slate-400">Send instant SMS alert to registered mobile phone</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPrefs({ ...prefs, criticalSms: !prefs.criticalSms })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    prefs.criticalSms ? 'bg-[#5b14b8]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      prefs.criticalSms ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2: Audible In-App Tone */}
              <div className="pt-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="size-4 text-slate-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Audible In-App Alert Tone</div>
                    <div className="text-[11px] text-slate-400">Play clinical chime when STAT panic alert arrives</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPrefs({ ...prefs, criticalSound: !prefs.criticalSound })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    prefs.criticalSound ? 'bg-[#5b14b8]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      prefs.criticalSound ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3: Push Notifications (Mandatory locked) */}
              <div className="pt-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="size-4 text-slate-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Browser Push Notifications</div>
                    <div className="text-[11px] text-slate-400">High-priority desktop &amp; mobile system banners</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Enforced</span>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#5b14b8] opacity-70 cursor-not-allowed">
                    <span className="inline-block size-4 transform rounded-full bg-white translate-x-6" />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#ba1a1a] font-medium pt-1">
              * Push notifications for critical alerts cannot be disabled per hospital patient-safety policy.
            </p>
          </div>

          {/* Standard Categories Card (1:4893) */}
          <div
            data-node-id="1:4893"
            className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-5"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="size-10 rounded-full bg-purple-50 text-[#28006d] flex items-center justify-center shrink-0">
                <Bell className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Standard Notification Channels</h3>
                <p className="text-xs text-slate-500">Configure delivery preferences across routine clinical workflows.</p>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
                <span>Workflow Category</span>
                <div className="flex items-center gap-8 pr-2">
                  <span className="w-8 text-center">Email</span>
                  <span className="w-8 text-center">In-App</span>
                  <span className="w-8 text-center">SMS</span>
                </div>
              </div>

              {/* Row 1: Patient Updates */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100/70">
                <div>
                  <div className="text-xs font-bold text-slate-900">Patient Updates &amp; Vital Trends</div>
                  <div className="text-[11px] text-slate-400">Vitals telemetry, lab releases, chart notes</div>
                </div>
                <div className="flex items-center gap-8 pr-2">
                  <input
                    type="checkbox"
                    checked={prefs.categories.patientUpdates.email}
                    onChange={() => toggleCategoryChannel('patientUpdates', 'email')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                  <input
                    type="checkbox"
                    checked={prefs.categories.patientUpdates.inApp}
                    onChange={() => toggleCategoryChannel('patientUpdates', 'inApp')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                  <input
                    type="checkbox"
                    checked={prefs.categories.patientUpdates.sms}
                    onChange={() => toggleCategoryChannel('patientUpdates', 'sms')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                </div>
              </div>

              {/* Row 2: Referral Notifications */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100/70">
                <div>
                  <div className="text-xs font-bold text-slate-900">Specialist Referrals</div>
                  <div className="text-[11px] text-slate-400">Incoming consult requests, patient handoffs</div>
                </div>
                <div className="flex items-center gap-8 pr-2">
                  <input
                    type="checkbox"
                    checked={prefs.categories.referrals.email}
                    onChange={() => toggleCategoryChannel('referrals', 'email')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                  <input
                    type="checkbox"
                    checked={prefs.categories.referrals.inApp}
                    onChange={() => toggleCategoryChannel('referrals', 'inApp')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                  <input
                    type="checkbox"
                    checked={prefs.categories.referrals.sms}
                    onChange={() => toggleCategoryChannel('referrals', 'sms')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                </div>
              </div>

              {/* Row 3: Prescriptions */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100/70">
                <div>
                  <div className="text-xs font-bold text-slate-900">Prescription Signatures</div>
                  <div className="text-[11px] text-slate-400">Refill requests, e-prescribing queue notices</div>
                </div>
                <div className="flex items-center gap-8 pr-2">
                  <input
                    type="checkbox"
                    checked={prefs.categories.prescriptions.email}
                    onChange={() => toggleCategoryChannel('prescriptions', 'email')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                  <input
                    type="checkbox"
                    checked={prefs.categories.prescriptions.inApp}
                    onChange={() => toggleCategoryChannel('prescriptions', 'inApp')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                  <input
                    type="checkbox"
                    checked={prefs.categories.prescriptions.sms}
                    onChange={() => toggleCategoryChannel('prescriptions', 'sms')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                </div>
              </div>

              {/* Row 4: OCR & Scanned Docs */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-xs font-bold text-slate-900">OCR &amp; Document Parsing</div>
                  <div className="text-[11px] text-slate-400">Extraction readiness, mismatch flags</div>
                </div>
                <div className="flex items-center gap-8 pr-2">
                  <input
                    type="checkbox"
                    checked={prefs.categories.ocrDocuments.email}
                    onChange={() => toggleCategoryChannel('ocrDocuments', 'email')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                  <input
                    type="checkbox"
                    checked={prefs.categories.ocrDocuments.inApp}
                    onChange={() => toggleCategoryChannel('ocrDocuments', 'inApp')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                  <input
                    type="checkbox"
                    checked={prefs.categories.ocrDocuments.sms}
                    onChange={() => toggleCategoryChannel('ocrDocuments', 'sms')}
                    className="size-4 rounded text-[#5b14b8] focus:ring-[#5b14b8]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Global Digest & Action Area (1:4959, lg:col-span-4) */}
        <div
          data-node-id="1:4959"
          data-testid="notification-preferences-right-column"
          className="lg:col-span-4 space-y-6"
        >
          {/* Global Digest Card (1:4960) */}
          <div
            data-node-id="1:4960"
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Mail className="size-4.5 text-[#5b14b8]" />
              <h3 className="text-base font-bold text-slate-900">Email Digest Summary</h3>
            </div>

            <p className="text-xs text-slate-500">
              Combine non-critical notifications into a single periodic email to minimize interruption.
            </p>

            <div className="space-y-2.5">
              {[
                { id: 'daily', label: 'Daily Digest', desc: 'Sent every morning at 07:00 AM' },
                { id: 'weekly', label: 'Weekly Summary', desc: 'Sent every Monday at 08:00 AM' },
                { id: 'off', label: 'Immediate (Off)', desc: 'Deliver individual emails as they occur' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                    prefs.digestFrequency === opt.id
                      ? 'border-purple-300 bg-purple-50/40'
                      : 'border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="digestFrequency"
                    value={opt.id}
                    checked={prefs.digestFrequency === opt.id}
                    onChange={() =>
                      setPrefs({ ...prefs, digestFrequency: opt.id as 'daily' | 'weekly' | 'off' })
                    }
                    className="size-4 text-[#5b14b8] mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                    <div className="text-[11px] text-slate-500">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* System Settings Card (1:4991) */}
          <div
            data-node-id="1:4991"
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">Platform Maintenance Alerts</h3>
              <button
                type="button"
                onClick={() => setPrefs({ ...prefs, systemAlerts: !prefs.systemAlerts })}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                  prefs.systemAlerts ? 'bg-[#5b14b8]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block size-3.5 transform rounded-full bg-white transition-transform ${
                    prefs.systemAlerts ? 'translate-x-4.5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Receive advance notifications regarding scheduled EHR downtime and security patches.
            </p>
          </div>

          {/* Action Area (1:5004) */}
          <div
            data-node-id="1:5004"
            className="space-y-2 pt-2"
          >
            <button
              type="button"
              onClick={handleSave}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Save className="size-4" />
              <span>Save Preferences</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset to Default</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

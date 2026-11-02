import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Download,
  Fingerprint,
  Key,
  KeyRound,
  Laptop,
  Lock,
  Monitor,
  Shield,
  ShieldCheck,
  Smartphone,
  Trash2,
  X,
} from 'lucide-react';
import {
  INITIAL_TRUSTED_DEVICES,
  INITIAL_AUDIT_LOGS,
  TrustedDevice,
  SecurityAuditEntry,
} from './types';

export const AccountSecurityPage: React.FC = () => {
  const navigate = useNavigate();

  const [devices, setDevices] = useState<TrustedDevice[]>(INITIAL_TRUSTED_DEVICES);
  const [auditLogs] = useState<SecurityAuditEntry[]>(INITIAL_AUDIT_LOGS);
  const [sessionTimeout, setSessionTimeout] = useState('15');
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  // Modals state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2faModal, setShow2faModal] = useState(false);
  const [deviceToRevoke, setDeviceToRevoke] = useState<TrustedDevice | null>(null);

  // Password change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    setPasswordError(null);
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password updated successfully in demonstration state');
  };

  const handleRevokeDevice = () => {
    if (deviceToRevoke) {
      setDevices((prev) => prev.filter((d) => d.id !== deviceToRevoke.id));
      setDeviceToRevoke(null);
      showToast(`Session revoked for ${deviceToRevoke.name}`);
    }
  };

  return (
    <div
      data-node-id="1:4531"
      data-testid="account-security-page"
      className="w-full space-y-6 pb-12"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Breadcrumbs (1:4534) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/dashboard')}>
              Dashboard
            </span>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-slate-700 font-medium">Settings</span>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-slate-900 font-bold">Account & Security</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your clinical security preferences, active sessions, and hardware tokens.
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
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#28006d] shadow-xs"
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
            onClick={() => navigate('/settings/support')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Support
          </button>
        </div>
      </div>

      {/* Bento Grid Layout (1:4546) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Security Controls (1:4547, lg:col-span-4) */}
        <div
          data-node-id="1:4547"
          data-testid="security-controls-column"
          className="lg:col-span-4 space-y-6"
        >
          {/* 2FA Status Card (1:4548) */}
          <div
            data-node-id="1:4548"
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-[#e8ddff] text-[#28006d] flex items-center justify-center shrink-0">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Two-Factor Auth</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 mt-0.5">
                    <span className="size-1.5 rounded-full bg-emerald-600" />
                    <span>Active</span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShow2faModal(true)}
                className="text-xs font-semibold text-[#5b14b8] hover:underline"
              >
                Configure
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Your account is protected by an authenticator app (TOTP) and hardware security key.
            </p>

            <button
              type="button"
              onClick={() => setShow2faModal(true)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Key className="size-3.5 text-slate-500" />
              <span>Manage 2FA Credentials</span>
            </button>
          </div>

          {/* Additional Security Settings (1:4568) */}
          <div
            data-node-id="1:4568"
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4"
          >
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Authentication Credentials
            </h3>

            {/* Password Row */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100/70">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <Lock className="size-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Password</div>
                  <div className="text-[11px] text-slate-400">Last changed 45 days ago</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="text-xs font-semibold text-[#28006d] hover:text-[#5b14b8] px-2.5 py-1 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Update
              </button>
            </div>

            {/* Quick PIN Row */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100/70">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <KeyRound className="size-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Quick PIN</div>
                  <div className="text-[11px] text-slate-400">4-digit cath lab code enabled</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('PIN change available in production environment')}
                className="text-xs font-semibold text-[#28006d] hover:text-[#5b14b8] px-2.5 py-1 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Change
              </button>
            </div>

            {/* Biometrics Toggle Row */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100/70">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <Fingerprint className="size-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Biometric Login</div>
                  <div className="text-[11px] text-slate-400">TouchID / Windows Hello</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setBiometricEnabled(!biometricEnabled);
                  showToast(`Biometric login ${!biometricEnabled ? 'enabled' : 'disabled'}`);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  biometricEnabled ? 'bg-[#5b14b8]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                    biometricEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Session Timeout Selector (1:4605) */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-slate-700">Clinical Session Timeout</label>
              <select
                value={sessionTimeout}
                onChange={(e) => {
                  setSessionTimeout(e.target.value);
                  showToast(`Session timeout set to ${e.target.value} minutes`);
                }}
                className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
              >
                <option value="15">15 minutes (Standard HIPAA default)</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour (Intra-procedure extension)</option>
                <option value="240">4 hours</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Locks workstation automatically after idle time to maintain HIPAA audit compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Activity & Devices (1:4618, lg:col-span-8) */}
        <div
          data-node-id="1:4618"
          data-testid="activity-devices-column"
          className="lg:col-span-8 space-y-6"
        >
          {/* Trusted Devices Section (1:4619) */}
          <div
            data-node-id="1:4619"
            className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <Laptop className="size-5 text-[#28006d]" />
                <h3 className="text-base font-bold text-slate-900">Trusted Clinical Devices</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {devices.length} Active Sessions
              </span>
            </div>

            <div className="space-y-3">
              {devices.map((dev) => (
                <div
                  key={dev.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                      {dev.platform.includes('Apple') || dev.platform.includes('iPad') ? (
                        <Smartphone className="size-5" />
                      ) : (
                        <Monitor className="size-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{dev.name}</span>
                        {dev.isCurrent && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-[#5b14b8]">
                            Current Workstation
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">{dev.platform} • {dev.location}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Last seen: {dev.lastActive}</div>
                    </div>
                  </div>

                  {!dev.isCurrent && (
                    <button
                      type="button"
                      onClick={() => setDeviceToRevoke(dev)}
                      className="px-3 py-1.5 rounded-lg border border-red-200 text-[#ba1a1a] hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="size-3.5" />
                      <span>Revoke</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Login History Table (1:4654) */}
          <div
            data-node-id="1:4654"
            className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.04)]"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Shield className="size-5 text-[#28006d]" />
                <h3 className="text-base font-bold text-slate-900">Recent Security Activity</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Audit log export downloaded (.csv)')}
                className="text-xs font-semibold text-[#5b14b8] hover:underline flex items-center gap-1"
              >
                <Download className="size-3.5" />
                <span>Export Log</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-5 py-3">Device / Client</th>
                    <th className="px-5 py-3">Location & IP</th>
                    <th className="px-5 py-3">Date & Time</th>
                    <th className="px-5 py-3">Method</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3 font-semibold text-slate-900">{log.device}</td>
                      <td className="px-5 py-3 text-slate-600 font-mono text-[11px]">{log.location}</td>
                      <td className="px-5 py-3 text-slate-500">{log.timestamp}</td>
                      <td className="px-5 py-3 text-slate-700">{log.method}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold ${
                            log.status === 'Success'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              log.status === 'Success' ? 'bg-emerald-600' : 'bg-red-600'
                            }`}
                          />
                          <span>{log.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Dialog Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Update Clinical Password</h3>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-4.5" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
              {passwordError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="size-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-slate-700 font-bold">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                  required
                />
                <p className="text-[11px] text-slate-400">Must be at least 8 characters with numbers & symbols.</p>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                  required
                />
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-purple-900 text-[11px] leading-tight">
                <strong>HIPAA Security Notice:</strong> Passwords must not be reused across outside personal accounts. Changes are recorded in local demo memory.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white font-bold hover:opacity-95 shadow-xs"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2FA Configuration Modal */}
      {show2faModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Two-Factor Authentication Setup</h3>
              <button
                type="button"
                onClick={() => setShow2faModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-4.5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <ShieldCheck className="size-6 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-emerald-900">TOTP Authenticator App Active</div>
                  <div className="text-[11px] text-emerald-700">Google Authenticator / Duo Mobile registered</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Key className="size-4 text-slate-600" />
                  <span>Hardware Security Keys (FIDO2)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Registered key: YubiKey 5C NFC (Serial: #849204-ENG). Tapping physical key allows rapid time-out signoff.
                </p>
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-purple-900 text-[11px] leading-tight">
                <strong>Demonstration Note:</strong> Multi-factor verification is simulated for development. No live SMS carrier or Duo enterprise server is connected.
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShow2faModal(false)}
                className="px-5 py-2 rounded-xl bg-[#28006d] text-white font-bold hover:bg-[#3f1d8b]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Device Confirmation Dialog */}
      {deviceToRevoke && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="size-12 rounded-full bg-red-100 text-[#ba1a1a] flex items-center justify-center mx-auto">
              <AlertTriangle className="size-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">Revoke Device Session?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to revoke access for <strong className="text-slate-800">{deviceToRevoke.name}</strong>? The user will be signed out immediately.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeviceToRevoke(null)}
                className="py-2 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRevokeDevice}
                className="py-2 px-4 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-xs"
              >
                Revoke Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

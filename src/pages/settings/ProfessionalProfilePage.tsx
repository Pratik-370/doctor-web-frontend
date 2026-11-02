import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Edit3,
  KeyRound,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Radio,
  ShieldCheck,
  Stethoscope,
  X,
} from 'lucide-react';
import { DEFAULT_DOCTOR_PROFILE, DoctorProfile } from './types';
import doctorProfilePrimary from '@/assets/avatars/doctor-profile-primary.png';

export const ProfessionalProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<DoctorProfile>(DEFAULT_DOCTOR_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<DoctorProfile>(DEFAULT_DOCTOR_PROFILE);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenEdit = () => {
    setEditFormData({ ...profile });
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...editFormData });
    setIsEditing(false);
    showToast('Professional profile updated successfully');
  };

  return (
    <div
      data-node-id="1:4281"
      data-testid="professional-profile-page"
      className="w-full space-y-6 pb-12"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Navigation & Settings Submenu */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/dashboard')}>
              Dashboard
            </span>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-slate-700 font-medium">Settings</span>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-slate-900 font-bold">My Profile</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-900">Physician Profile & Credentials</h1>
        </div>

        {/* Settings Tab Navigation Strip */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#28006d] shadow-xs"
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
            onClick={() => navigate('/settings/support')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Support
          </button>
        </div>
      </div>

      {/* Main 2-Column Bento Layout (1:4290) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile Identity Card (Bento style) (1:4387) */}
        <div
          data-node-id="1:4387"
          data-testid="profile-identity-card"
          className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.04)] relative"
        >
          {/* Decorative Header Accent Banner */}
          <div className="h-24 bg-gradient-to-r from-[#28006d] via-[#4500b8] to-[#7c3aed] relative" />

          {/* Avatar Container with Overlap */}
          <div className="px-6 pb-6 pt-0 relative space-y-4">
            <div className="-mt-12 flex justify-center relative">
              <div className="size-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100 relative">
                <img
                  src={doctorProfilePrimary}
                  alt={profile.name}
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-1/2 translate-x-10 size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
                <BadgeCheck className="size-3.5" />
              </div>
            </div>

            {/* Doctor Identity Header */}
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
              <div className="text-xs font-semibold text-[#5b14b8]">{profile.credentials}</div>
              <p className="text-xs text-slate-500">{profile.title}</p>
              <p className="text-xs text-slate-400 font-medium">{profile.hospital}</p>
            </div>

            {/* Verification Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold flex items-center gap-1">
                <ShieldCheck className="size-3" />
                <span>NPI: {profile.npi}</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-[#5b14b8] border border-purple-200 text-[11px] font-bold">
                Board Certified
              </span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-[11px] font-bold">
                Cath Lab Director
              </span>
            </div>

            {/* Clinical Bio */}
            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
              {profile.bio}
            </div>

            {/* Profile Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleOpenEdit}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Edit3 className="size-4" />
                <span>Edit Profile</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/settings/security')}
                  className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <KeyRound className="size-3.5 text-slate-500" />
                  <span>Security</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/auth/login')}
                  className="py-2 px-3 rounded-xl border border-red-200 bg-red-50/40 hover:bg-red-50 text-[#ba1a1a] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LogOut className="size-3.5 text-[#ba1a1a]" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detail Sections Container (1:4291) */}
        <div
          data-node-id="1:4291"
          data-testid="profile-details-container"
          className="lg:col-span-8 space-y-6"
        >
          {/* Section 1: Professional Information (1:4292) */}
          <div
            data-node-id="1:4292"
            className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-5"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="size-10 rounded-full bg-purple-50 text-[#28006d] flex items-center justify-center">
                <Stethoscope className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Professional Information</h3>
                <p className="text-xs text-slate-500">Medical credentialing, licensure, and clinical privileges.</p>
              </div>
            </div>

            {/* License & Affiliation 2-Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Medical License Card */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 space-y-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Medical License
                </div>
                <div className="space-y-1">
                  <div className="text-base font-bold text-slate-900">{profile.licenseNumber}</div>
                  <div className="text-xs text-slate-500">{profile.licenseState}</div>
                </div>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded font-bold text-[10px]">
                    {profile.licenseStatus}
                  </span>
                  <span className="text-slate-500 text-[11px]">Exp: {profile.licenseExpiry}</span>
                </div>
              </div>

              {/* Primary Affiliation Card */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 space-y-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Primary Affiliation
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-900 leading-snug">{profile.hospital}</div>
                  <div className="text-xs text-slate-500">{profile.department}</div>
                </div>
                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="size-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{profile.office}</span>
                </div>
              </div>
            </div>

            {/* Consultation Types Provided */}
            <div className="space-y-2.5 pt-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Clinical Consultation Types Provided
              </div>
              <div className="flex flex-wrap gap-2.5">
                {profile.consultationTypes.map((type) => (
                  <div
                    key={type}
                    className="px-3.5 py-2 rounded-xl bg-purple-50/60 border border-purple-200/80 text-xs font-semibold text-[#28006d] flex items-center gap-2"
                  >
                    <CheckCircle2 className="size-3.5 text-[#5b14b8]" />
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Contact Information & Location (1:4342) */}
          <div
            data-node-id="1:4342"
            className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-5"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="size-10 rounded-full bg-cyan-50 text-cyan-800 flex items-center justify-center">
                <Mail className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Direct Contact & Practice Location</h3>
                <p className="text-xs text-slate-500">Official hospital communications and on-call routing.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Left Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 mt-0.5">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Official Email</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">{profile.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 mt-0.5">
                    <Phone className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Office Phone & Extension</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">{profile.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 mt-0.5">
                    <Radio className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Emergency Pager</div>
                    <div className="text-xs font-bold text-[#ba1a1a] mt-0.5">{profile.pager}</div>
                  </div>
                </div>
              </div>

              {/* Right: Map Placeholder Image (1:4385) */}
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Clinic Office Address</div>
                    <div className="text-xs font-bold text-slate-800 leading-snug">{profile.office}</div>
                  </div>
                </div>

                {/* Styled Map Graphic */}
                <div
                  data-node-id="1:4385"
                  className="w-full h-32 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center"
                >
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#494552_1px,transparent_1px)] [background-size:12px_12px]" />
                  <div className="relative text-center p-3">
                    <div className="size-8 rounded-full bg-[#28006d] text-white flex items-center justify-center mx-auto shadow-md">
                      <Building2 className="size-4" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 block mt-1">
                      Metro Hospital Campus Map
                    </span>
                    <span className="text-[10px] text-slate-500">Pavilion 4 • 2nd Floor Bridgeway</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit Physician Profile</h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-4.5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-700 font-bold">Physician Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold">Credentials</label>
                  <input
                    type="text"
                    value={editFormData.credentials}
                    onChange={(e) => setEditFormData({ ...editFormData, credentials: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold">Title</label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold">Clinical Bio</label>
                <textarea
                  rows={3}
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold">Official Email</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold">Office Phone</label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                  />
                </div>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-800 text-[11px] leading-tight">
                <strong>Demonstration Note:</strong> Edits are committed to client application memory and will not modify live hospital credentialing registries.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white font-bold hover:opacity-95 shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Plus,
  ScanLine,
  Send,
  Settings,
  Stethoscope,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import doctorAvatarAdmin from '@/assets/avatars/doctor-avatar-admin.png';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = false,
  onClose,
}) => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Patient Directory', path: '/patients', icon: Users },
    { name: 'Health Records', path: '/records', icon: FileText },
    { name: 'OCR Verification', path: '/ocr/upload', icon: ScanLine },
    { name: 'Referrals', path: '/referrals', icon: Send },
    { name: 'Clinical Reports', path: '/reports', icon: BarChart3 },
    { name: 'Treatment Lifecycle', path: '/treatment-offers', icon: Stethoscope },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-[#f3f4f5] border-r border-[#e1e3e4]',
          'flex flex-col justify-between p-4 transition-transform duration-200 ease-in-out shrink-0 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        aria-label="Doctor Portal Navigation"
      >
        <div className="space-y-4">
          {/* Doctor Profile Card (Figma node 1:408) */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/70 border border-[#e1e3e4]/60">
            <div className="size-12 rounded-full bg-[#3f1d8b] overflow-hidden shrink-0 shadow-sm border border-slate-200">
              <img
                src={doctorAvatarAdmin}
                alt="Dr. Clinical Admin"
                className="size-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-[#191c1d] truncate">
                Dr. Clinical Admin
              </h2>
              <p className="text-xs font-medium text-[#494552] truncate">
                Cardiology Specialist
              </p>
            </div>
          </div>

          {/* New Consultation CTA Button (Figma node 1:417) */}
          <button
            type="button"
            onClick={() => {
              navigate('/treatment-offers/new/step-1');
              if (onClose) onClose();
            }}
            className={cn(
              'w-full h-10 rounded-full text-white font-medium text-sm',
              'bg-gradient-to-b from-[#a44cff] to-[#5b14b8]',
              'flex items-center justify-center gap-2 shadow-sm',
              'hover:opacity-95 active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8]'
            )}
          >
            <Plus className="size-4 stroke-[2.5]" aria-hidden="true" />
            <span>New Consultation</span>
          </button>

          {/* Primary Navigation Menu (Figma node 1:421) */}
          <nav className="space-y-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3.5 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8]',
                      isActive
                        ? 'rounded-full bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white font-semibold shadow-sm'
                        : 'rounded-lg text-[#494552] hover:bg-slate-200/60 hover:text-[#191c1d]'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={cn('size-4 shrink-0', isActive ? 'text-white' : 'text-[#494552]')}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Actions (Figma node 1:439) */}
        <div className="pt-3 border-t border-[rgba(203,196,212,0.4)] space-y-1">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3.5 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b14b8]',
                isActive
                  ? 'rounded-full bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white font-semibold'
                  : 'rounded-lg text-[#494552] hover:bg-slate-200/60 hover:text-[#191c1d]'
              )
            }
          >
            <Settings className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">Settings</span>
          </NavLink>

          <button
            type="button"
            onClick={() => navigate('/auth/login')}
            className={cn(
              'w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium',
              'text-[#ba1a1a] hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-[#ba1a1a] transition-colors'
            )}
          >
            <LogOut className="size-4 shrink-0" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

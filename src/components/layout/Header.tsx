import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, HelpCircle, Menu, Search, Settings, X } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

import doctorProfilePrimary from '@/assets/avatars/doctor-profile-primary.png';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  isSidebarOpen = false,
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-white border-b border-[#e1e3e4] px-4 sm:px-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-between">
      {/* Left: Mobile Toggle & Brand Logo */}
      <div className="flex items-center gap-3 w-auto lg:w-60 shrink-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Close navigation sidebar' : 'Open navigation sidebar'}
          className="lg:hidden p-1.5 rounded-lg text-[#494552] hover:bg-[#f3f4f5] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
        >
          {isSidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link
          to="/dashboard"
          className="focus:outline-none focus:ring-2 focus:ring-[#5b14b8] rounded-md"
          aria-label="CareID Doctor Portal Home"
        >
          <Logo size="md" />
        </Link>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex flex-1 max-w-lg mx-4 items-center justify-center">
        <div className="relative w-full max-w-[480px]">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7583]">
            <Search className="size-4" aria-hidden="true" />
          </div>
          <input
            type="search"
            placeholder="Search patients, ID, or appointments..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-[#f3f4f5] border border-[#cbc4d4] text-sm text-[#191c1d] placeholder:text-[#494552] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 focus:border-[#5b14b8] transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions Cluster & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Notifications Button with Red Badge */}
        <button
          type="button"
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-full text-[#494552] hover:bg-[#f3f4f5] hover:text-[#191c1d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
          aria-label="View notifications (1 unread)"
        >
          <Bell className="size-5" />
          <span
            className="absolute top-1.5 right-1.5 size-2 bg-[#ba1a1a] rounded-full border border-white"
            aria-hidden="true"
          />
        </button>

        {/* Help & Support Button */}
        <button
          type="button"
          onClick={() => navigate('/settings')}
          className="p-2 rounded-full text-[#494552] hover:bg-[#f3f4f5] hover:text-[#191c1d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
          aria-label="Help and clinical support"
        >
          <HelpCircle className="size-5" />
        </button>

        {/* Settings Button */}
        <button
          type="button"
          onClick={() => navigate('/settings')}
          className="p-2 rounded-full text-[#494552] hover:bg-[#f3f4f5] hover:text-[#191c1d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
          aria-label="Portal settings"
        >
          <Settings className="size-5" />
        </button>

        {/* Doctor Avatar Thumbnail (Figma node 1:470) */}
        <div className="pl-1 sm:pl-2">
          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="flex items-center rounded-full p-0.5 border-2 border-[#e7e8e9] hover:border-[#5b14b8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
            aria-label="Doctor profile: Dr. Julian Vance"
          >
            <div className="size-7 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
              <img
                src={doctorProfilePrimary}
                alt="Dr. Julian Vance"
                className="size-full object-cover"
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

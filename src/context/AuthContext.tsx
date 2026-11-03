import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DoctorProfile, DEFAULT_DOCTOR_PROFILE } from '@/pages/settings/types';
import doctorAvatarAdmin from '@/assets/avatars/doctor-avatar-admin.png';
import doctorProfilePrimary from '@/assets/avatars/doctor-profile-primary.png';

export interface AuthenticatedUser {
  id: string;
  fullName: string;
  credentials: string[];
  title: string;
  specialty?: string;
  organization: string;
  sidebarDisplayLabel: string;
  avatarUrl: string;
  sidebarAvatarUrl: string;
  role: 'Attending' | 'Fellow' | 'Admin';
  profile: DoctorProfile;
}

export interface AuthContextType {
  user: AuthenticatedUser;
  updateProfile: (updatedProfile: Partial<DoctorProfile>) => void;
  updateAvatar: (newAvatarUrl: string) => void;
  resetAvatar: () => void;
  isDemoSession: boolean;
}

const INITIAL_AUTHENTICATED_USER: AuthenticatedUser = {
  id: 'DOC-948210-VANCE',
  fullName: DEFAULT_DOCTOR_PROFILE.name, // 'Dr. Julian Vance'
  credentials: ['MD', 'FACC', 'FSCAI'],
  title: DEFAULT_DOCTOR_PROFILE.title,
  specialty: DEFAULT_DOCTOR_PROFILE.specialty,
  organization: 'Enterprise Healthcare',
  // Preserves authoritative Figma sidebar node 1:6939 while mapping to the active clinician account
  sidebarDisplayLabel: 'Dr. Clinical',
  avatarUrl: doctorProfilePrimary,
  sidebarAvatarUrl: doctorAvatarAdmin,
  role: 'Attending',
  profile: DEFAULT_DOCTOR_PROFILE,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser>(INITIAL_AUTHENTICATED_USER);

  const updateProfile = (updatedProfile: Partial<DoctorProfile>) => {
    setUser((prev) => {
      const mergedProfile: DoctorProfile = {
        ...prev.profile,
        ...updatedProfile,
      };

      return {
        ...prev,
        fullName: mergedProfile.name || prev.fullName,
        title: mergedProfile.title || prev.title,
        specialty: mergedProfile.specialty || prev.specialty,
        profile: mergedProfile,
      };
    });
  };

  const updateAvatar = (newAvatarUrl: string) => {
    setUser((prev) => ({
      ...prev,
      avatarUrl: newAvatarUrl,
      sidebarAvatarUrl: newAvatarUrl,
    }));
  };

  const resetAvatar = () => {
    setUser((prev) => ({
      ...prev,
      avatarUrl: doctorProfilePrimary,
      sidebarAvatarUrl: doctorAvatarAdmin,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        updateProfile,
        updateAvatar,
        resetAvatar,
        isDemoSession: true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

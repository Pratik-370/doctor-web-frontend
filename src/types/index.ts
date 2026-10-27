/**
 * Global application types for Doctor-Web Portal.
 */

export interface AppMetadata {
  name: string;
  version: string;
  environment: 'development' | 'production' | 'test';
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  iconName?: string;
  badge?: string;
  children?: NavigationItem[];
}

export type StatusType = 'active' | 'pending' | 'critical' | 'completed' | 'draft';

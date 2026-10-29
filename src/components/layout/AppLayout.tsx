import React from 'react';
import { PatientLayout } from './PatientLayout';

/**
 * AppLayout - Unified clinical portal layout delegating to PatientLayout
 * to preserve navigation state and consistent clinical sidebar across all portal views.
 */
export const AppLayout: React.FC = () => {
  return <PatientLayout />;
};

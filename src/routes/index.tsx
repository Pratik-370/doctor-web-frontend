import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FoundationPage } from '@/pages/FoundationPage';

/**
 * Baseline Application Router for Doctor-Web.
 * Initialized with the neutral Milestone 1 validation view.
 * Feature routes will be registered as subsequent milestones are approved.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <FoundationPage />,
  },
  {
    path: '*',
    element: <FoundationPage />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

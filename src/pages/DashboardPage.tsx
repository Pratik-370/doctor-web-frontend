import React from 'react';
import { PlaceholderPage } from './PlaceholderPage';

export const DashboardPage: React.FC = () => {
  return (
    <PlaceholderPage
      title="Doctor Dashboard"
      description="Practice overview, daily clinical schedule, and performance telemetry."
      module="Dashboard"
      nodeId="1:154 / 1:2010"
      targetMilestone="Milestone 4"
    />
  );
};

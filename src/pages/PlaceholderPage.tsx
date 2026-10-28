import React from 'react';
import { Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description: string;
  module: string;
  nodeId?: string;
  targetMilestone?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
  module,
  nodeId,
  targetMilestone = 'Milestone 3-7',
}) => {
  return (
    <div className="space-y-6">
      {/* Top Header Region */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e1e3e4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#3f1d8b]/10 text-[#28006d]">
              {module}
            </span>
            {nodeId && (
              <span className="text-xs font-mono text-[#7a7583] bg-slate-100 px-2 py-0.5 rounded">
                Figma: {nodeId}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191c1d]">
            {title}
          </h1>
          <p className="text-sm text-[#494552] mt-1">{description}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#76f1ff]/20 text-[#006971] border border-[#006971]/20">
            <ShieldCheck className="size-3.5" />
            Shell &amp; Layout Active
          </span>
        </div>
      </div>

      {/* Placeholder Content Card */}
      <div className="bg-white rounded-[20px] border border-[#e1e3e4] p-8 shadow-sm">
        <div className="max-w-xl space-y-4">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-[#a44cff]/10 to-[#006971]/10 flex items-center justify-center text-[#5b14b8]">
            <Layers className="size-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-[#191c1d]">
              Feature Screen Scaffold Ready
            </h2>
            <p className="text-sm text-[#494552] leading-relaxed">
              This route is mapped to the verified Figma production design inventory.
              The shared navigation shell, layout grid, typography, and design tokens
              are established. Domain workflows will be implemented in{' '}
              <span className="font-semibold text-[#28006d]">{targetMilestone}</span>.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5b14b8] hover:text-[#28006d] transition-colors"
            >
              Return to Dashboard
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

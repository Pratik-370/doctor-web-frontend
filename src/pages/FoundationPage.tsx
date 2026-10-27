import React from 'react';
import { Activity, CheckCircle2, Layers, ShieldCheck } from 'lucide-react';

export const FoundationPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-50 text-slate-900">
      <main className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <header className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Doctor-Web Portal
            </h1>
            <p className="text-sm text-slate-500">
              Milestone 1 — Application Toolchain & Foundation Scaffold
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="size-3.5" />
            Foundation Active
          </span>
        </header>

        <section className="space-y-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <ShieldCheck className="size-4 text-purple-600" />
              Verified Toolchain Stack
            </h2>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white p-2.5 border border-slate-200/60">
                <dt className="text-xs text-slate-500">Core Framework</dt>
                <dd className="font-medium text-slate-800">React 18.3.1</dd>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-slate-200/60">
                <dt className="text-xs text-slate-500">Build Tool</dt>
                <dd className="font-medium text-slate-800">Vite 6.x</dd>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-slate-200/60">
                <dt className="text-xs text-slate-500">Language</dt>
                <dd className="font-medium text-slate-800">TypeScript 5.7+ (Strict)</dd>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-slate-200/60">
                <dt className="text-xs text-slate-500">Styling System</dt>
                <dd className="font-medium text-slate-800">Tailwind CSS v3.4.17</dd>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-slate-200/60">
                <dt className="text-xs text-slate-500">Routing Layer</dt>
                <dd className="font-medium text-slate-800">React Router v6.28+</dd>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-slate-200/60">
                <dt className="text-xs text-slate-500">Typography</dt>
                <dd className="font-medium text-slate-800">System Sans (Milestone 2)</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
              <Layers className="size-4 text-teal-600" />
              Scope Reference
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Approved Report 1B inventory locked: 48 total Figma frames, 2 exploratory drafts excluded, 46 production candidates (39 proposed routes, 7 in-flow states), including the terminal completion screen (<code className="text-xs bg-slate-200 px-1 py-0.5 rounded">1:16047</code>).
            </p>
          </div>

          <footer className="pt-2 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Activity className="size-3.5 text-purple-500 animate-pulse" />
              Ready for Milestone 2: Tokens &amp; Shell Layout Architecture
            </span>
            <span>Local Status: Verified</span>
          </footer>
        </section>
      </main>
    </div>
  );
};

import { useState } from 'react';
import { Project } from '../../data/portfolioData';
import { ArrowUpRight, Github, TrendingUp, Smartphone, Layers, Eye, ShieldCheck } from 'lucide-react';

interface ExpenseTrackerShowcaseProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

export default function ExpenseTrackerShowcase({ project, onSelectProject }: ExpenseTrackerShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'food' | 'dev' | 'workspace'>('all');

  return (
    <div
      id="expense-tracker-showcase"
      className="mb-20 sm:mb-28 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E131F] rounded-2xl overflow-hidden shadow-xs"
    >
      {/* Editorial Header Ribbon */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-blue-600 dark:text-blue-400">04 / PROJECT 04</span>
          <span className="text-slate-400">•</span>
          <span className="uppercase text-slate-600 dark:text-slate-400 font-medium">
            FULL-WIDTH PANORAMIC MOBILE FINANCIAL ANALYTICS
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <span className="hidden sm:inline">React Native • Expo • Victory Native • Firestore & Appwrite</span>
          <a
            id="expense-tracker-repo-link"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-semibold inline-flex items-center gap-1 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Varied Layout: Full-Width Visual with Overlay Metadata */}
      <div className="relative bg-[#080C14] text-white p-6 sm:p-10 lg:p-12 overflow-hidden border-b border-slate-800">
        
        {/* Abstract Architectural Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto space-y-10">
          
          {/* Top Title & Narrative Strip */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="max-w-2xl">
              <div className="font-mono text-xs text-blue-400 uppercase tracking-wider mb-2 font-semibold">
                FINANCIAL INTELLIGENCE ON THE EDGE
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
                {project.title}
              </h3>
              <p className="text-base text-slate-300 leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                id="expense-tracker-modal-btn"
                type="button"
                onClick={() => onSelectProject(project)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold text-slate-950 bg-white hover:bg-slate-200 transition-colors shadow-xs"
              >
                <span>VIEW PROJECT</span>
                <Eye className="w-3.5 h-3.5" />
              </button>

              <a
                id="expense-tracker-github-btn"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-blue-400" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Panoramic Full-Width Visual Workspace with Overlay Chips */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Overlay Metric 1: Monthly Total & Trend */}
            <div className="md:col-span-4 p-6 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between backdrop-blur-xs">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <span>MONTHLY EXPENDITURE</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                  ₦428,500<span className="text-lg text-slate-500 font-normal">.00</span>
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs text-emerald-400 font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>14.2% below projected threshold</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                <span>Calculated via Victory Native aggregation queries</span>
              </div>
            </div>

            {/* Overlay Metric 2: Category Breakdown Bars */}
            <div className="md:col-span-5 p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 backdrop-blur-xs">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-800">
                <span>CATEGORY ALLOCATION</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${activeCategory === 'all' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('dev')}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${activeCategory === 'dev' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    Cloud
                  </button>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300">Food & Nutrition (36%)</span>
                    <span className="text-white font-semibold">₦154,260</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[36%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300">Cloud Infrastructure (28%)</span>
                    <span className="text-white font-semibold">₦119,980</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full w-[28%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300">Hardware & Workspace (22%)</span>
                    <span className="text-white font-semibold">₦94,270</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[22%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay Metric 3: Architectural Capabilities */}
            <div className="md:col-span-3 p-6 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between backdrop-blur-xs font-mono text-xs">
              <div className="space-y-3">
                <div className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                  OFFLINE CAPABILITIES
                </div>
                <div className="space-y-2 text-[11px] text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Local SQLite / AsyncStorage queue during outages</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Background Appwrite document reconciliation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>No UI blocking during financial queries</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                <span>React Native • Expo SDK</span>
              </div>
            </div>

          </div>

          {/* Bottom Technologies Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-300 font-semibold uppercase">Technologies:</span>
              {project.technologies.map(t => (
                <span key={t} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Audited GitHub Repository</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

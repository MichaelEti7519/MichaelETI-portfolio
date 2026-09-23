import { useState } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { Check, Copy, Terminal, Code2, Sparkles, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export default function DeveloperHeroCard() {
  const [activeTab, setActiveTab] = useState<'config' | 'terminal' | 'stack'>('config');
  const [copied, setCopied] = useState(false);
  const [cliOutput, setCliOutput] = useState<string>('Run a command below to explore Micheal Eti\'s engineering profile.');

  const configCode = `// micheal.config.ts
export const engineer = {
  name: "Micheal Eti",
  role: "Full-Stack & Mobile Software Engineer",
  location: "Calabar, Nigeria • Remote Global",
  specialties: [
    "Modern Full-Stack Web (React, Next.js, Node.js)",
    "Cross-Platform Mobile (React Native, Expo)",
    "Database & API Systems (PostgreSQL, Prisma, REST, WebSockets)"
  ],
  engineeringValues: [
    "Clean, maintainable TypeScript architectures",
    "Sub-second response times & smooth 60fps UX",
    "Production-grade test coverage & reliability"
  ],
  status: "Available for full-time roles & projects"
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(configCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCommand = (cmd: string) => {
    if (cmd === 'skills') {
      setCliOutput('CORE SKILLS\nTypeScript, React, React Native, Next.js, Node.js, Express, PostgreSQL, Prisma, Tailwind CSS, WebSockets, Git.');
    } else if (cmd === 'contact') {
      setCliOutput(`CONTACT\nEmail: ${DEVELOPER_INFO.email} | GitHub: @MichaelEti7519 | LinkedIn: Micheal Eti`);
    } else if (cmd === 'status') {
      setCliOutput('STATUS\nAvailable for high-impact software engineering roles and contracts worldwide.');
    } else {
      setCliOutput('INFO\nBuilding practical, high-performance software for web and mobile platforms.');
    }
  };

  return (
    <div
      id="developer-hero-card"
      className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden"
    >
      {/* Profile Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={DEVELOPER_INFO.avatarUrl}
              alt="Micheal Eti"
              className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-xs"
              onError={(e) => {
                // Graceful fallback to stylish initial avatar
                e.currentTarget.style.display = 'none';
                const sibling = e.currentTarget.nextElementSibling;
                if (sibling) (sibling as HTMLElement).style.display = 'flex';
              }}
            />
            <div
              style={{ display: 'none' }}
              className="w-12 h-12 rounded-xl bg-slate-900 text-white font-bold text-base items-center justify-center border-2 border-white shadow-xs"
            >
              ME
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
              title="Available for work"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                Micheal Eti
              </h2>
              <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
            </div>
            <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>Calabar, Nigeria • Remote Global</span>
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available</span>
        </span>
      </div>

      {/* Code / Window Navigation */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-white">
        {/* Window Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'config'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span>config.ts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stack')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'stack'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Stack</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'terminal'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            <span>CLI</span>
          </button>
        </div>

        {/* Action button */}
        {activeTab === 'config' && (
          <button
            type="button"
            onClick={copyCode}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Copy TypeScript snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Tab Body */}
      <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto min-h-[260px] flex flex-col justify-between">
        {activeTab === 'config' && (
          <pre className="text-[12px] leading-relaxed font-mono whitespace-pre text-slate-300">
            <code>
              <span className="text-slate-500">// Micheal Eti Engineering Profile</span>{'\n'}
              <span className="text-purple-400">export const</span> <span className="text-blue-400">engineer</span> = {'{'}{'\n'}
              {'  '}name: <span className="text-emerald-400">"Micheal Eti"</span>,{'\n'}
              {'  '}role: <span className="text-emerald-400">"Full-Stack & Mobile Engineer"</span>,{'\n'}
              {'  '}focus: <span className="text-emerald-400">"Web Applications & Mobile Apps"</span>,{'\n'}
              {'  '}coreStack: [{'\n'}
              {'    '}<span className="text-amber-300">"TypeScript"</span>, <span className="text-amber-300">"React"</span>, <span className="text-amber-300">"React Native"</span>,{'\n'}
              {'    '}<span className="text-amber-300">"Node.js"</span>, <span className="text-amber-300">"Next.js"</span>, <span className="text-amber-300">"PostgreSQL"</span>{'\n'}
              {'  '}],{'\n'}
              {'  '}philosophy: <span className="text-emerald-400">"Performance, clean code & robust architecture"</span>,{'\n'}
              {'  '}status: <span className="text-sky-400">"Ready for high-impact roles"</span>{'\n'}
              {'}'};
            </code>
          </pre>
        )}

        {activeTab === 'stack' && (
          <div className="space-y-3">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Production Stack & Methodologies
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <div className="text-blue-400 font-semibold mb-1">Frontend & Mobile</div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  React 18+, React Native, Expo, Next.js, Tailwind CSS, TypeScript
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <div className="text-emerald-400 font-semibold mb-1">Backend & Data</div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  Node.js, Express, PostgreSQL, Prisma ORM, REST, WebSockets
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <div className="text-amber-400 font-semibold mb-1">Architecture</div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  Component Modularity, Type Safety, Offline First, API Security
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <div className="text-purple-400 font-semibold mb-1">Workflow</div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  Git, GitHub CI/CD, ESLint, Unit & Integration Testing
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="space-y-3">
            <div className="text-slate-400 text-[11px]">
              $ micheal-eti-cli --interactive
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs min-h-[90px] flex items-center">
              {cliOutput}
            </div>
            <div className="pt-2">
              <div className="text-[11px] text-slate-400 mb-1.5">Click to query:</div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => runCommand('skills')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
                >
                  $ micheal --skills
                </button>
                <button
                  type="button"
                  onClick={() => runCommand('status')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
                >
                  $ micheal --status
                </button>
                <button
                  type="button"
                  onClick={() => runCommand('contact')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
                >
                  $ micheal --contact
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Terminal Footer Status */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Node.js v22 &bull; TS 5.x
          </span>
          <a
            href={DEVELOPER_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>github.com/MichaelEti7519</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

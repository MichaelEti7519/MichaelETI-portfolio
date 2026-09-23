import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { ArrowUpRight, Github, Search, RefreshCw, Star, GitFork, AlertCircle } from 'lucide-react';
import { defaultViewport, sectionRevealVariants } from '../lib/motionVariants';
import ProjectFavicon from './ProjectFavicon';

interface RepositoryItem {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  url: string;
  isPinned?: boolean;
}

const FALLBACK_REPOS: RepositoryItem[] = [
  {
    name: 'Ecotreks',
    description: 'Full-stack travel marketplace with React 19, Express, Prisma ORM, PostgreSQL, and Stripe checkout webhooks.',
    language: 'TypeScript',
    stars: 4,
    forks: 1,
    topics: ['react19', 'prisma', 'postgresql', 'stripe', 'typescript'],
    updatedAt: '2025-02-14T10:00:00Z',
    url: 'https://github.com/MichaelEti7519/Ecotreks',
    isPinned: true,
  },
  {
    name: 'GreenSight1.0',
    description: 'Mobile agricultural telemetry app in React Native & Expo with weather and soil insights in 5 languages.',
    language: 'TypeScript',
    stars: 3,
    forks: 0,
    topics: ['react-native', 'expo', 'agriculture', 'weather-api'],
    updatedAt: '2025-01-20T14:30:00Z',
    url: 'https://github.com/MichaelEti7519/GreenSight1.0',
    isPinned: true,
  },
  {
    name: 'voice-call-frontend',
    description: 'Real-time audio streaming and live bilingual transcription client using WebSockets and Web Audio API.',
    language: 'TypeScript',
    stars: 5,
    forks: 2,
    topics: ['websockets', 'web-audio', 'webrtc', 'transcription'],
    updatedAt: '2025-02-01T09:15:00Z',
    url: 'https://github.com/MichaelEti7519/voice-call-frontend',
    isPinned: true,
  },
  {
    name: 'Remote-Job-Board',
    description: 'Server-rendered job directory platform in PHP and MySQL with employer vacancy submissions and filtering.',
    language: 'PHP',
    stars: 2,
    forks: 0,
    topics: ['php', 'mysql', 'job-board', 'mvc'],
    updatedAt: '2024-11-18T16:00:00Z',
    url: 'https://github.com/MichaelEti7519/Remote-Job-Board',
    isPinned: false,
  },
  {
    name: 'Ai-expense-tracker',
    description: 'Mobile expense tracker built with React Native, Expo, Victory Native charts, and Appwrite backend sync.',
    language: 'TypeScript',
    stars: 6,
    forks: 1,
    topics: ['react-native', 'expo', 'victory-native', 'appwrite'],
    updatedAt: '2025-01-10T11:45:00Z',
    url: 'https://github.com/MichaelEti7519/Ai-expense-tracker',
    isPinned: true,
  },
  {
    name: 'student-management-system',
    description: 'Layered Spring Boot REST API for managing university student enrollment and departmental records.',
    language: 'Java',
    stars: 3,
    forks: 0,
    topics: ['spring-boot', 'java', 'jpa', 'rest-api'],
    updatedAt: '2024-10-05T08:20:00Z',
    url: 'https://github.com/MichaelEti7519/student-management-system',
    isPinned: false,
  },
];

export default function GithubSection() {
  const [repos, setRepos] = useState<RepositoryItem[]>(FALLBACK_REPOS);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');

  // Fetch verified repository metadata from backend API endpoint with fallback
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch('/api/repos')
      .then((res) => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then((data) => {
        if (isMounted && data?.repositories && Array.isArray(data.repositories)) {
          setRepos(data.repositories);
        }
      })
      .catch((err) => {
        console.warn('[GithubSection] Using local repository cache:', err);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const languages = ['All', ...Array.from(new Set(repos.map((r) => r.language))).sort()];

  // Filter repositories based on search and language
  const filteredRepos = repos.filter((repo) => {
    const matchesLang = selectedLang === 'All' || repo.language.toLowerCase() === selectedLang.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      repo.name.toLowerCase().includes(query) ||
      repo.description.toLowerCase().includes(query) ||
      (repo.topics && repo.topics.some((t) => t.toLowerCase().includes(query)));

    return matchesLang && matchesQuery;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLang('All');
  };

  return (
    <section
      id="github"
      aria-label="Open Source Repositories"
      className="py-20 sm:py-24 bg-[#FAFAFA] dark:bg-[#090D14] border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                Open Source & Architecture
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {repos.length} Repositories
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
              GitHub Repositories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
              Verified public source code repositories showcasing full-stack web, mobile architectures, and real-time backend systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              id="explore-github-direct-btn"
              href={DEVELOPER_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-all shadow-2xs hover:shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Visit @{DEVELOPER_INFO.githubUsername}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Interactive Search & Filter Toolbar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Input with Clear Button */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="github-repo-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories by name, topic, or keyword..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer p-1"
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>

          {/* Language Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {languages.map((lang) => {
              const isSelected = selectedLang === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLang(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'bg-white dark:bg-[#0E1422] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading Skeleton State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 animate-pulse space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                    <div className="w-24 h-4 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="space-y-2">
                  <div className="w-full h-3 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="w-4/5 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                  <div className="w-16 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="w-20 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRepos.length > 0 ? (
          /* Real Repo Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={sectionRevealVariants}
                className="p-6 rounded-2xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-md transition-all group min-w-0"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <ProjectFavicon repoName={repo.name} size={30} />
                      <span className="text-slate-900 dark:text-white font-bold text-base truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {repo.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {repo.description}
                  </p>

                  {/* Topics Pills */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                      {repo.language}
                    </span>
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {repo.stars}
                      </span>
                    )}
                    {repo.forks > 0 && (
                      <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                        <GitFork className="w-3 h-3 text-slate-400" />
                        {repo.forks}
                      </span>
                    )}
                  </div>

                  <span className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium transition-colors">
                    View Code →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-10 sm:p-14 rounded-2xl bg-white dark:bg-[#0E1422] border border-dashed border-slate-300 dark:border-slate-800 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              No matching repositories found
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {searchQuery
                ? `No repositories matched the keyword "${searchQuery}".`
                : `No repositories found under the "${selectedLang}" category.`}
            </p>
            <button
              id="reset-github-filters-btn"
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

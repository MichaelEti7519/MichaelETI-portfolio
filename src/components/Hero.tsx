import { motion } from 'motion/react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { easeOutExpo } from '../lib/motionVariants';
import SocialIcon from './SocialIcon';
import Character3DStage from './Character3DStage';

export default function Hero() {
  const scrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('selected-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredTech = [
    'TypeScript',
    'React',
    'React Native',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Prisma',
    'Tailwind CSS',
  ];

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 border-b border-slate-200 dark:border-slate-800 bg-[#FAFAFA] dark:bg-[#0B0F17]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Main Headline & Intro */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="lg:col-span-7 flex flex-col justify-center pt-2"
          >
            {/* Simple Subtitle */}
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4 tracking-tight">
              Full-Stack & Mobile Software Engineer
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.08] mb-6">
              Building practical software for the web and mobile.
            </h1>

            {/* Concise Bio */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-xl mb-8">
              I'm Micheal Eti, a software engineer who builds full-stack web applications and cross-platform mobile apps with a focus on clean code, performance, and great user experience.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <a
                id="hero-primary-work-cta"
                href="#selected-work"
                onClick={scrollToWork}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors shadow-xs"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                id="hero-download-resume-cta"
                href={DEVELOPER_INFO.resumeUrl}
                download="Micheal_Eti_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors shadow-xs group"
              >
                <Download className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </a>

              <a
                id="hero-github-cta"
                href={DEVELOPER_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-colors shadow-xs group"
                title="View Micheal Eti on GitHub"
              >
                <SocialIcon name="github" size={20} />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </a>

              <a
                id="hero-linkedin-cta"
                href={DEVELOPER_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-colors shadow-xs group"
                title="Connect on LinkedIn"
              >
                <SocialIcon name="linkedin" size={20} />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </a>

              <a
                id="hero-contact-cta"
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-colors shadow-xs"
                title="Get in Touch via Email & Contact Form"
              >
                <SocialIcon name="email" size={20} />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Quick Experience Stats Banner */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-lg">
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white truncate">10+</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 truncate">Public Repos</div>
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white truncate">Full-Stack</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 truncate">Web & Mobile</div>
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white truncate">2025</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 truncate">Active Pipeline</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Desktop PC Battlestation & Focus */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: easeOutExpo }}
            className="lg:col-span-5 space-y-4"
          >
            {/* 3D Desktop PC Battlestation */}
            <Character3DStage />

            {/* Current Focus Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Current Focus
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Full-Stack Systems & Mobile Architecture
                  </div>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-medium">
                  Available for work
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-4">
                Specializing in robust TypeScript architectures, production REST and WebSocket APIs, and responsive mobile interfaces with React Native & Expo.
              </p>

              {/* Technologies */}
              <div>
                <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Featured Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {featuredTech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

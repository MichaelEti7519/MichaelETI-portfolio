import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, Project } from '../data/portfolioData';
import ProjectDetailModal from './ProjectDetailModal';
import {
  ArrowUpRight,
  Github,
  FolderKanban,
  RefreshCw,
  ShieldCheck,
  CreditCard,
  MessageSquare,
} from 'lucide-react';
import {
  defaultViewport,
  sectionRevealVariants,
  staggerContainerVariants,
  itemFadeUpVariants,
  cardEntranceVariants,
} from '../lib/motionVariants';

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack & Web', 'Mobile (Expo)', 'AI & Real-Time', 'Backend APIs'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const featuredProject = PROJECTS.find((p) => p.id === 'ecotreks') || PROJECTS[0];
  const gridProjects = filteredProjects.filter((p) => selectedCategory !== 'All' || p.id !== 'ecotreks');

  return (
    <motion.section
      id="selected-work"
      aria-label="Selected Projects"
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={sectionRevealVariants}
      className="py-20 sm:py-28 bg-[#FAFAFA] dark:bg-[#090D14] border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with entrance animation */}
        <motion.div
          variants={itemFadeUpVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-slate-200 dark:border-slate-800"
        >
          <div>
            <span className="inline-block text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
              Featured Work
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
              Projects I've built.
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl">
              Real, functional applications built with modern tools. Explore the code on GitHub or open details for technical architecture.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto max-w-full no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Featured Project Banner (Shown when "All" or "Full-Stack & Web" is selected) */}
        {(selectedCategory === 'All' || selectedCategory === 'Full-Stack & Web') && (
          <motion.div
            variants={cardEntranceVariants}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="mb-12 rounded-2xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Project Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60">
                    Featured Project
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Full-Stack & Web
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  {featuredProject.title}
                </h3>

                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {featuredProject.solution}
                </p>

                {/* Key Points */}
                <div className="space-y-2 pt-1 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Three-role RBAC security for travelers, hosts, and platform administrators.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Automated Stripe Checkout integration with raw-body webhook verification.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Real-time peer messaging between travelers and hosts powered by Socket.IO.</span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {featuredProject.technologies.slice(0, 8).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(featuredProject)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <span>View Case Details</span>
                  </button>

                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
                  >
                    <Github className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    <span>GitHub Repo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Right Column: Clean App Preview Card */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Live Booking Preview
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>

                  <div className="rounded-lg bg-white dark:bg-slate-950 p-4 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          Rainforest Canopy Eco-Lodge
                        </div>
                        <div className="text-xs text-slate-500">Cross River National Park</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-slate-900 dark:text-white">$120</div>
                        <div className="text-[10px] text-slate-400">/ night</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-400">Dates:</span> <span className="font-medium text-slate-700 dark:text-slate-300">3 Nights</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Guests:</span> <span className="font-medium text-slate-700 dark:text-slate-300">2 Travelers</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center justify-between">
                      <span>Carbon offset included</span>
                      <span className="font-semibold">-42 kg CO₂</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 font-semibold text-xs text-slate-900 dark:text-white">
                      <span>Total with Eco-Tax</span>
                      <span>$385.00</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Stack: React 19 + Express + Prisma</span>
                    <span>Database: PostgreSQL</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Other Projects Grid or Empty State with AnimatePresence */}
        <AnimatePresence mode="wait">
          {gridProjects.length > 0 ? (
            <motion.div
              key={selectedCategory}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
              variants={staggerContainerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {gridProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardEntranceVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-2xs group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {project.category}
                      </span>
                      <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                        {project.primaryLanguage}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-4">
                      {project.problem}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="text-xs font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      View Details
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer group/link"
                    >
                      <Github className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors" />
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-14 text-center rounded-2xl bg-white dark:bg-[#0E1422] border border-dashed border-slate-300 dark:border-slate-800 max-w-lg mx-auto p-8"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <FolderKanban className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                No additional projects in this filter
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                All highlighted projects for this specialization are featured in the interactive overview.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 transition-opacity cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Show All Projects</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Clean Project Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </motion.section>
  );
}

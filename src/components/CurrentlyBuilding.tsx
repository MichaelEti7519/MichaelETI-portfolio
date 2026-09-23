import { motion } from 'motion/react';
import { CURRENTLY_BUILDING } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import { defaultViewport, sectionRevealVariants, easeOutExpo } from '../lib/motionVariants';

export default function CurrentlyBuilding() {
  return (
    <section id="building" aria-label="Active Engineering Journey" className="py-20 sm:py-28 bg-[#FAFAFA] dark:bg-[#0B0F17] border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Masthead */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={sectionRevealVariants}
          className="max-w-3xl mb-14 pb-6 border-b border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="flex items-center gap-3 font-mono text-xs text-slate-400 dark:text-slate-500 mb-2">
            <span className="font-semibold text-slate-900 dark:text-slate-300">04</span>
            <span>/</span>
            <span className="uppercase tracking-widest text-slate-600 dark:text-slate-400">ACTIVE IN-FLIGHT ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
            Currently building.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Current technical areas and product domains I am engineering, testing, and shipping today.
          </p>
        </motion.div>

        {/* Flat Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CURRENTLY_BUILDING.map((item, idx) => (
            <motion.div
              key={item.area}
              id={`building-card-${idx}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: easeOutExpo }}
              className="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-baseline justify-between mb-3 font-mono text-xs">
                  <span className="text-slate-400 dark:text-slate-500 font-semibold">
                    0{idx + 1}
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                    // {item.status}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {item.area}
                </h3>

                <div className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Focus: {item.focus}
                </div>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                  {item.description}
                </p>
              </div>

              {/* Linked Repositories */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span className="text-slate-400 dark:text-slate-500 text-[11px]">Linked Repos:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {item.relatedRepos.map((repo) => (
                    <a
                      key={repo}
                      href={`https://github.com/MichaelEti7519/${repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors underline underline-offset-2"
                    >
                      <span>{repo}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

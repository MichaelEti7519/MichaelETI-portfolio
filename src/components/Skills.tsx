import { useState } from 'react';
import { motion } from 'motion/react';
import {
  defaultViewport,
  sectionRevealVariants,
  staggerContainerVariants,
  itemFadeUpVariants,
  cardEntranceVariants,
  badgeStaggerVariants,
} from '../lib/motionVariants';
import { Code, Smartphone, Server, Database, Sparkles } from 'lucide-react';
import TechIcon from './TechIcon';

export default function Skills() {
  const [activeSpins, setActiveSpins] = useState<Record<string, boolean>>({});
  const [isAllSpinning, setIsAllSpinning] = useState(false);

  const triggerSpin = (skillName: string) => {
    setActiveSpins((prev) => ({ ...prev, [skillName]: true }));
    setTimeout(() => {
      setActiveSpins((prev) => ({ ...prev, [skillName]: false }));
    }, 950);
  };

  const handleAnimateAll = () => {
    setIsAllSpinning(true);
    const allSkills = skillGroups.flatMap((g) => g.skills);
    const newSpins: Record<string, boolean> = {};
    allSkills.forEach((s) => {
      newSpins[s] = true;
    });
    setActiveSpins(newSpins);

    setTimeout(() => {
      setActiveSpins({});
      setIsAllSpinning(false);
    }, 1100);
  };

  const skillGroups = [
    {
      title: 'Frontend & Web',
      icon: Code,
      description: 'Building responsive, accessible web apps with modern React and TypeScript.',
      skills: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'React Router', 'HTML5 / Modern DOM'],
    },
    {
      title: 'Mobile Development',
      icon: Smartphone,
      description: 'Cross-platform iOS and Android apps with native routing and offline caching.',
      skills: ['React Native', 'Expo & Expo Router', 'NativeWind', 'AsyncStorage', 'i18next Localization', 'Haptics'],
    },
    {
      title: 'Backend & APIs',
      icon: Server,
      description: 'RESTful endpoints, real-time messaging, and secure authentication.',
      skills: ['Node.js', 'Express', 'WebSockets', 'Socket.IO', 'Spring Boot (Java)', 'JWT & bcrypt', 'Stripe Webhooks'],
    },
    {
      title: 'Databases & Tools',
      icon: Database,
      description: 'Relational and document storage, schema modeling, and dev workflows.',
      skills: ['PostgreSQL', 'Prisma ORM', 'MySQL', 'Firebase', 'Appwrite', 'Git & GitHub', 'Postman', 'Docker'],
    },
  ];

  return (
    <motion.section
      id="skills"
      aria-label="Skills & Technologies"
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={sectionRevealVariants}
      className="py-20 sm:py-24 bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with entrance animation */}
        <motion.div
          variants={itemFadeUpVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
              Technical Skills
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
              Tools & technologies I work with.
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              A practical toolkit focused on building resilient full-stack applications and cross-platform mobile apps.
            </p>
          </div>

          <button
            type="button"
            id="skills-animate-all-trigger"
            onClick={handleAnimateAll}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all shadow-xs shrink-0 cursor-pointer group"
            title="Touch or click to trigger live animations across all icons"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
            <span>{isAllSpinning ? 'Animating Icons...' : 'Animate All Icons'}</span>
          </button>
        </motion.div>

        {/* 4 Clean Skill Group Cards with Staggered Entrance */}
        <motion.div
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                variants={cardEntranceVariants}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#FAFAFA] dark:bg-[#0E1422] border border-slate-200/80 dark:border-slate-800/80 space-y-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                      {group.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Staggered Badges Container */}
                <motion.div
                  variants={staggerContainerVariants}
                  className="flex flex-wrap gap-2.5 pt-1"
                >
                  {group.skills.map((skill) => {
                    const isSpinning = !!activeSpins[skill];
                    return (
                      <motion.div
                        key={skill}
                        variants={badgeStaggerVariants}
                        id={`skill-pill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => triggerSpin(skill)}
                        onTouchStart={() => triggerSpin(skill)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            triggerSpin(skill);
                          }
                        }}
                        whileHover={{
                          y: -2,
                          scale: 1.03,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        className={`inline-flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer select-none transition-all ${
                          isSpinning
                            ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-100 border-blue-500/80 dark:border-blue-400 shadow-md shadow-blue-500/10'
                            : 'bg-white dark:bg-[#131A2B] text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400/60 dark:hover:border-blue-500/50 hover:shadow-xs'
                        }`}
                        title={`Touch or click to animate ${skill}`}
                      >
                        <TechIcon name={skill} size={20} isTriggered={isSpinning} />
                        <span className="font-semibold tracking-tight">
                          {skill}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
}

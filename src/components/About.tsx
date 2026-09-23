import { motion } from 'motion/react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { ArrowUpRight, Github, Briefcase, Code2, Smartphone, Radio } from 'lucide-react';
import {
  defaultViewport,
  sectionRevealVariants,
  staggerContainerVariants,
  itemFadeUpVariants,
  cardEntranceVariants,
} from '../lib/motionVariants';

export default function About() {
  const highlights = [
    {
      title: 'Full-Stack Architecture',
      skills: 'React, Next.js, Node.js, Express, PostgreSQL',
      icon: Code2,
    },
    {
      title: 'Mobile Engineering',
      skills: 'React Native, Expo, NativeWind, Offline Storage',
      icon: Smartphone,
    },
    {
      title: 'Real-Time Systems',
      skills: 'WebSockets, Socket.IO, Web Audio API',
      icon: Radio,
    },
  ];

  return (
    <motion.section
      id="about"
      aria-label="About Me"
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={sectionRevealVariants}
      className="py-20 sm:py-24 bg-white dark:bg-[#0E131F] border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          {/* Left: Section Title & Snapshot */}
          <motion.div variants={itemFadeUpVariants} className="lg:col-span-4">
            <span className="inline-block text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
              About Me
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
              Full-Stack & Mobile Software Engineer
            </h2>

            <div className="mt-8 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>Open to full-time & contract roles</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <a
                id="about-github-link"
                href={DEVELOPER_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <Github className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                <span>View GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right: Thoughtful Bio & Approach */}
          <motion.div
            variants={staggerContainerVariants}
            className="lg:col-span-8 space-y-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed"
          >
            <motion.p variants={itemFadeUpVariants}>
              I build web applications and mobile apps that prioritize reliability and usability. My work spans complete applications—from designing database schemas with PostgreSQL and Prisma, to writing scalable APIs in Node.js and Express, to building intuitive mobile experiences with React Native and Expo.
            </motion.p>
            <motion.p variants={itemFadeUpVariants}>
              Rather than building trivial demo apps, I enjoy tackling realistic software challenges: multi-role authentication with Stripe checkout webhooks, multilingual localization across multiple languages for agricultural workers, and real-time audio and message streaming over WebSockets.
            </motion.p>
            <motion.p variants={itemFadeUpVariants} className="text-base text-slate-500 dark:text-slate-400">
              When I'm not coding, I'm usually reading up on system design, exploring new open-source libraries, and refining my projects on GitHub.
            </motion.p>

            {/* Clean Highlights Row with Staggered Entrance */}
            <motion.div
              variants={staggerContainerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm"
            >
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={cardEntranceVariants}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <div className="font-bold text-slate-900 dark:text-white text-base">
                        {item.title}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {item.skills}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

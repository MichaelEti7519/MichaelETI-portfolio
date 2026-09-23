import { Project } from '../data/portfolioData';
import { ArrowUpRight, Github, Eye, Sparkles, Smartphone, Server, Radio, Database } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
}

export default function ProjectCard({ project, index, onSelectProject }: ProjectCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mobile (Expo)':
        return <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'AI & Real-Time':
        return <Radio className="w-4 h-4 text-rose-600" />;
      case 'Backend APIs':
        return <Server className="w-4 h-4 text-emerald-600" />;
      default:
        return <Database className="w-4 h-4 text-sky-600" />;
    }
  };

  const isEven = index % 2 === 0;

  return (
    <article
      id={`project-card-${project.id}`}
      className="rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md dark:shadow-slate-950/60 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
    >
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        
        {/* Card Header: Meta + Index */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {getCategoryIcon(project.category)}
              <span>{project.category}</span>
            </span>
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-medium">
              {project.primaryLanguage}
            </span>
          </div>

          <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500">
            0{index + 2}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-2">
          {project.title}
        </h3>

        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
          {project.tagline}
        </p>

        {/* Problem Solved Snippet */}
        <div className="mb-5 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-semibold text-slate-900 dark:text-white block mb-1">
            Problem & Context:
          </span>
          {project.problem}
        </div>

        {/* Key Features Preview */}
        <div className="mb-6 space-y-1.5 text-xs text-slate-600 dark:text-slate-400 flex-1">
          {project.keyFeatures.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Technologies used */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-1.5 py-0.5 rounded text-[11px] font-mono text-slate-400 dark:text-slate-500">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Card Footer Actions */}
      <div className="px-6 py-4 bg-slate-50/60 dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
        <button
          id={`inspect-btn-${project.id}`}
          type="button"
          onClick={() => onSelectProject(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>Case Study Details</span>
        </button>

        <a
          id={`github-link-${project.id}`}
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors group-hover:translate-x-0.5"
          aria-label={`View ${project.title} on GitHub`}
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub</span>
          <ArrowUpRight className="w-3 h-3 text-slate-400" />
        </a>
      </div>
    </article>
  );
}

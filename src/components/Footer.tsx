import { DEVELOPER_INFO } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';
import SocialIcon from './SocialIcon';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="py-10 bg-white dark:bg-[#0B0F17] border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-slate-500 dark:text-slate-400">
          
          {/* Brand & Copyright */}
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Micheal Eti</span>
            <span className="mx-2">—</span>
            <span>Software Engineer</span>
          </div>

          {/* Center Social Media Links with living vector icons */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              id="footer-github-link"
              href={DEVELOPER_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-950 dark:hover:text-white flex items-center gap-2 transition-colors group"
              title="GitHub Profile"
            >
              <SocialIcon name="github" size={18} />
              <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">GitHub</span>
            </a>

            <a
              id="footer-linkedin-link"
              href={DEVELOPER_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-950 dark:hover:text-white flex items-center gap-2 transition-colors group"
              title="LinkedIn Profile"
            >
              <SocialIcon name="linkedin" size={18} />
              <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">LinkedIn</span>
            </a>

            <a
              id="footer-email-link"
              href={`mailto:${DEVELOPER_INFO.email}`}
              className="hover:text-slate-950 dark:hover:text-white flex items-center gap-2 transition-colors group"
              title="Send Direct Email"
            >
              <SocialIcon name="email" size={18} />
              <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Email</span>
            </a>
          </div>

          {/* Back to top button */}
          <button
            id="footer-back-to-top-btn"
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>
    </footer>
  );
}

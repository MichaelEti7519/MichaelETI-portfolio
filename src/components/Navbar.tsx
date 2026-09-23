import { useState, useEffect, useRef } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SocialIcon from './SocialIcon';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close mobile dropdown menu when clicking outside or pressing Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isClickScrolling.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['contact', 'github', 'skills', 'selected-work', 'about', 'home'];
          const triggerPoint = 180;

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to set correct active state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#selected-work', id: 'selected-work' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(sectionId);

    // Suppress scroll-spy momentarily during smooth auto-scroll to avoid flickering
    isClickScrolling.current = true;
    if (scrollTimeout.current) {
      window.clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);

    if (onNavigate) {
      onNavigate(sectionId);
    }

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        const navHeight = 70;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      ref={headerRef}
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200 bg-[#FAFAFA]/95 dark:bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo / Name */}
          <a
            id="brand-logo"
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home', 'home')}
            className="group flex items-center gap-2.5 text-slate-900 dark:text-white cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-bold text-xs tracking-tight transition-transform duration-200 group-hover:scale-105">
              ME
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base tracking-tight leading-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                Micheal Eti
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-navigation"
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.id)}
                  className={`text-sm transition-colors duration-150 relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-slate-950 dark:text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-200 ${
                      isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Action: Theme Toggle & GitHub link */}
          <div className="flex items-center gap-3">
            <ThemeToggle variant="compact" />

            <a
              id="navbar-github-btn"
              href={DEVELOPER_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors group"
              aria-label="Visit Micheal Eti GitHub Profile"
              title="GitHub Profile"
            >
              <SocialIcon name="github" size={16} />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </a>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="md:hidden py-4 px-2 bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800 transition-opacity duration-150"
          >
            <div className="mb-3 px-3">
              <ThemeToggle variant="mobile-row" />
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    id={`mobile-nav-link-${link.id}`}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href, link.id)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 px-3">
                <a
                  id="mobile-github-external-link"
                  href={DEVELOPER_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <SocialIcon name="github" size={18} />
                    <span>github.com/{DEVELOPER_INFO.githubUsername}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

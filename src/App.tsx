import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProjectShowcase from './components/ProjectShowcase';
import Skills from './components/Skills';
import GithubSection from './components/GithubSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div
        id="portfolio-app-root"
        className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 selection:bg-blue-500/20 selection:text-blue-900 dark:selection:bg-blue-500/30 dark:selection:text-blue-200 transition-colors duration-200"
      >
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main id="main-content" className="flex-1">
          <Hero />
          <About />
          <ProjectShowcase />
          <Skills />
          <GithubSection />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

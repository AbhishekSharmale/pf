import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Zap } from 'lucide-react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [techNerdMode, setTechNerdMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTechNerdMode = () => {
    setTechNerdMode(!techNerdMode);
    document.body.classList.toggle('tech-nerd-mode', !techNerdMode);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              Abhishek Sharma
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#roadmap" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
              Roadmap
            </a>
            <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
              Projects
            </a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
              About
            </a>
            <a href="#blog" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
              Blog
            </a>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Tech Nerd Mode Toggle */}
            <button
              onClick={toggleTechNerdMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                techNerdMode 
                  ? 'bg-primary-500 text-white shadow-lg animate-pulse-glow' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title="Tech Nerd Mode"
            >
              <Zap size={18} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              <a href="#roadmap" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                Roadmap
              </a>
              <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                Projects
              </a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                About
              </a>
              <a href="#blog" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                Blog
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RoadmapSection from '../components/RoadmapSection';
import roadmapData from '../data/roadmap.json';
import { ArrowDown, Github, ExternalLink, Zap } from 'lucide-react';

export default function Home() {
  const [techNerdMode, setTechNerdMode] = useState(false);

  useEffect(() => {
    const checkTechNerdMode = () => {
      setTechNerdMode(document.body.classList.contains('tech-nerd-mode'));
    };

    // Check initial state
    checkTechNerdMode();

    // Listen for changes
    const observer = new MutationObserver(checkTechNerdMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap size={16} />
              <span>DevOps Engineer • 3+ Years Experience</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              My DevOps
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                {' '}Journey
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              From Cloud Engineer to Senior DevOps Engineer. Explore my learning path, 
              projects, and the chaos I've automated along the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#roadmap"
                className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                Explore Roadmap
                <ArrowDown className="ml-2 w-4 h-4" />
              </a>
              <a 
                href="#projects"
                className="inline-flex items-center px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-medium"
              >
                View Projects
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">6</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Major Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-500 mb-2">73</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Pipeline Stages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-500 mb-2">47</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Grafana Dashboards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">3+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Tech Nerd Mode Indicator */}
        {techNerdMode && (
          <div className="fixed top-20 right-4 bg-primary-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse-glow z-40">
            <div className="flex items-center space-x-2">
              <Zap size={16} />
              <span className="text-sm font-medium">TECH NERD MODE ACTIVE</span>
            </div>
          </div>
        )}
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              DevOps Learning Roadmap
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              My structured journey through DevOps technologies and practices
            </p>
          </div>

          <div className="space-y-12">
            {roadmapData.devopsRoadmap.sections.map((section, index) => (
              <RoadmapSection 
                key={section.id} 
                section={section} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Real-world implementations of the roadmap skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {roadmapData.projects.map((project) => (
              <div 
                key={project.id}
                className="bg-gray-50 dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'completed' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors">
                      <Github size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Built with Next.js, Tailwind CSS, and a lot of ☕
          </p>
        </div>
      </footer>
    </div>
  );
}
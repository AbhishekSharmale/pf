import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  skills: string[];
  duration: string;
  projects?: string[];
}

interface RoadmapSectionProps {
  section: {
    id: string;
    title: string;
    color: string;
    items: RoadmapItem[];
  };
  index: number;
}

export default function RoadmapSection({ section, index }: RoadmapSectionProps) {
  const [isExpanded, setIsExpanded] = useState(index < 2); // First 2 sections expanded by default

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'in-progress':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <div className="relative">
      {/* Connecting Line */}
      {index > 0 && (
        <div className="absolute -top-8 left-6 w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600"></div>
      )}

      {/* Section Header */}
      <div 
        className="flex items-center space-x-3 cursor-pointer group mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
          <span className="text-white font-bold text-lg">{index + 1}</span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
            {section.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {section.items.length} skills • {section.items.filter(item => item.status === 'completed').length} completed
          </p>
        </div>

        <div className="text-gray-400 group-hover:text-primary-500 transition-colors">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="ml-6 pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-4 animate-slide-up">
          {section.items.map((item, itemIndex) => (
            <div 
              key={item.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${getStatusColor(item.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(item.status)}
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                </div>
                <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                  {item.duration}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                {item.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {item.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Projects */}
              {item.projects && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Related Projects:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.projects.map((project) => (
                      <span 
                        key={project}
                        className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded text-xs"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Connecting Line to Next Section */}
      <div className="absolute bottom-0 left-6 w-0.5 h-8 bg-gradient-to-b from-transparent to-gray-300 dark:to-gray-600"></div>
    </div>
  );
}
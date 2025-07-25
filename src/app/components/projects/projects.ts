import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  emoji: string;
  status: 'completed' | 'in-progress' | 'abandoned';
  funnyQuote: string;
  demoUrl?: string;
  githubUrl?: string;
  image: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent implements OnInit {
  selectedProject: Project | null = null;
  
  projects: Project[] = [
    {
      id: 1,
      title: 'AI Rubber Duck Debugger',
      description: 'An AI that pretends to be a rubber duck but actually judges your code',
      longDescription: 'This revolutionary debugging companion combines the traditional rubber duck method with cutting-edge AI technology. It listens to your problems, nods sympathetically, and then roasts your coding choices with surgical precision.',
      tech: ['TypeScript', 'OpenAI API', 'Sarcasm.js', 'Disappointment'],
      emoji: '🦆',
      status: 'completed',
      funnyQuote: '"Your code is so bad, even I need therapy" - AI Duck',
      demoUrl: '#',
      githubUrl: '#',
      image: '/assets/duck-project.jpg'
    },
    {
      id: 2,
      title: 'Procrastination Tracker',
      description: 'Tracks how much time you spend avoiding actual work',
      longDescription: 'A productivity app that does the opposite of what it should do. Instead of helping you focus, it meticulously tracks all the ways you avoid work and presents them in beautiful, guilt-inducing charts.',
      tech: ['React', 'Chart.js', 'Guilt', 'Self-Loathing'],
      emoji: '⏰',
      status: 'in-progress',
      funnyQuote: '"I\'ll finish this tomorrow" - Famous last words',
      githubUrl: '#',
      image: '/assets/procrastination-project.jpg'
    },
    {
      id: 3,
      title: 'Coffee Dependency Calculator',
      description: 'Calculates your exact coffee requirements for optimal coding performance',
      longDescription: 'A scientific approach to coffee consumption optimization. Input your coding tasks, stress levels, and sleep deprivation, and get precise coffee dosage recommendations. Side effects may include jitters, existential dread, and perfect code.',
      tech: ['Vue.js', 'Caffeine API', 'Anxiety', 'Pure Determination'],
      emoji: '☕',
      status: 'completed',
      funnyQuote: '"Coffee: Because adulting is hard" - Every Developer Ever',
      demoUrl: '#',
      githubUrl: '#',
      image: '/assets/coffee-project.jpg'
    },
    {
      id: 4,
      title: 'Bug Feature Converter',
      description: 'Automatically converts your bugs into features with creative explanations',
      longDescription: 'Revolutionary software that takes your embarrassing bugs and transforms them into "innovative features" with compelling marketing copy. Perfect for those awkward client meetings where you need to explain why the login button launches a calculator.',
      tech: ['Python', 'Creative Writing AI', 'Denial', 'Marketing Magic'],
      emoji: '🐛',
      status: 'abandoned',
      funnyQuote: '"It\'s not a bug, it\'s an undocumented feature" - This App',
      image: '/assets/bug-project.jpg'
    },
    {
      id: 5,
      title: 'Stack Overflow Addiction Rehab',
      description: 'A 12-step program for developers who copy-paste too much',
      longDescription: 'Comprehensive rehabilitation program for developers suffering from chronic copy-paste syndrome. Includes group therapy sessions, original code challenges, and a support network of fellow recovering copy-paste addicts.',
      tech: ['Angular', 'Therapy.js', 'Original Thinking', 'Willpower'],
      emoji: '🔄',
      status: 'in-progress',
      funnyQuote: '"Hello, my name is Dev, and I haven\'t copied code for 3 hours"',
      githubUrl: '#',
      image: '/assets/stackoverflow-project.jpg'
    },
    {
      id: 6,
      title: 'Imposter Syndrome Simulator',
      description: 'Makes you feel inadequate about skills you actually have',
      longDescription: 'An educational tool that simulates the feeling of being a fraud in the tech industry. Features include random skill comparisons, impossible job requirements generator, and a daily dose of "everyone else is smarter than you" notifications.',
      tech: ['Node.js', 'Self-Doubt', 'Comparison Engine', 'Anxiety Framework'],
      emoji: '🎭',
      status: 'completed',
      funnyQuote: '"You don\'t belong here" - Your Brain, Probably',
      demoUrl: '#',
      image: '/assets/imposter-project.jpg'
    }
  ];

  ngOnInit() {
    this.initScrollAnimations();
  }

  private initScrollAnimations() {
    gsap.fromTo('.project-card', 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  openProjectModal(project: Project) {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
    
    // Animate modal in
    gsap.fromTo('.project-modal', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );
  }

  closeProjectModal() {
    gsap.to('.project-modal', {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      onComplete: () => {
        this.selectedProject = null;
        document.body.style.overflow = 'auto';
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'var(--success)';
      case 'in-progress': return 'var(--warning)';
      case 'abandoned': return 'var(--danger)';
      default: return 'var(--gray)';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Actually Works!';
      case 'in-progress': return 'Work in Progress';
      case 'abandoned': return 'Gave Up';
      default: return 'Unknown';
    }
  }

  onCardHover(event: MouseEvent, enter: boolean) {
    const card = event.currentTarget as HTMLElement;
    
    if (enter) {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }
}
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechNerdModeService } from '../../services/tech-nerd-mode.service';

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
  private touchStartX = 0;
  private touchStartY = 0;

  constructor(private techNerdService: TechNerdModeService) {}
  
  projects: Project[] = [
    {
      id: 1,
      title: 'Kubernetes Home Cluster',
      description: '6-node K8s cluster for hosting grocery lists and overengineered solutions',
      longDescription: 'What started as a simple home lab became a production-grade Kubernetes cluster with monitoring, logging, and enough complexity to make enterprise architects weep. Features include automated certificate management, GitOps workflows, and a service mesh for my todo app.',
      tech: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana', 'ArgoCD', 'Istio'],
      emoji: '⚙️',
      status: 'completed',
      funnyQuote: '"Why use a simple VM when you can orchestrate containers?" - Me, at 3AM',
      demoUrl: '#',
      githubUrl: '#',
      image: '/assets/k8s-project.jpg'
    },
    {
      id: 2,
      title: '73-Stage CI/CD Pipeline',
      description: 'Because 3 stages weren\'t enough - now with 47 approval gates',
      longDescription: 'Started as a simple build-test-deploy pipeline. Evolved into a masterpiece of overengineering with security scans, compliance checks, performance tests, and enough gates to make Fort Knox jealous. Takes 2 hours to deploy a typo fix.',
      tech: ['Azure DevOps', 'Docker', 'SonarQube', 'Terraform', 'PowerShell'],
      emoji: '🚀',
      status: 'completed',
      funnyQuote: '"If it doesn\'t have at least 50 stages, is it even CI/CD?" - Pipeline Philosophy',
      githubUrl: '#',
      image: '/assets/pipeline-project.jpg'
    },
    {
      id: 3,
      title: 'Terraform Modules for Everything',
      description: 'Infrastructure as Code with 47 variables and zero regrets',
      longDescription: 'What began as simple Azure resource provisioning became a collection of reusable Terraform modules with more configuration options than a German car. Features include automated networking, security groups, and enough variables to configure the color of your virtual machines.',
      tech: ['Terraform', 'Azure', 'ARM Templates', 'PowerShell', 'Regret'],
      emoji: '🏠',
      status: 'completed',
      funnyQuote: '"Why hardcode when you can parameterize everything?" - IaC Manifesto',
      demoUrl: '#',
      githubUrl: '#',
      image: '/assets/terraform-project.jpg'
    },
    {
      id: 4,
      title: 'Grafana Dashboard Addiction',
      description: '47 dashboards for monitoring everything, including my coffee machine',
      longDescription: 'Started with basic server monitoring. Escalated to tracking every metric imaginable: CPU usage, memory consumption, network latency, coffee temperature, and my emotional state during deployments. Now I have more dashboards than Netflix has shows.',
      tech: ['Grafana', 'Prometheus', 'InfluxDB', 'Telegraf', 'Obsession'],
      emoji: '📊',
      status: 'in-progress',
      funnyQuote: '"If you can\'t measure it, you can\'t improve it" - Monitoring Addiction Justification',
      image: '/assets/grafana-project.jpg'
    },
    {
      id: 5,
      title: 'Docker Multi-Stage Magic',
      description: 'Turned 15GB images into 50MB masterpieces of containerization',
      longDescription: 'Journey from Docker novice creating bloated images to multi-stage build wizard. Features include optimized base images, security scanning, and enough layers to make an onion jealous. Now my containers are smaller than my ego.',
      tech: ['Docker', 'Alpine Linux', 'Multi-stage builds', 'Security scanning'],
      emoji: '📦',
      status: 'completed',
      funnyQuote: '"Size matters when you\'re pushing to production" - Container Wisdom',
      githubUrl: '#',
      image: '/assets/docker-project.jpg'
    },
    {
      id: 6,
      title: 'Azure Landing Zone',
      description: 'Enterprise-grade cloud foundation for my personal blog',
      longDescription: 'Implemented Microsoft\'s Cloud Adoption Framework for a simple personal website. Features include hub-spoke networking, Azure Policy governance, security baselines, and enough compliance controls to satisfy a Fortune 500 CISO. Overkill? Absolutely. Regrets? None.',
      tech: ['Azure', 'ARM Templates', 'Azure Policy', 'Network Security Groups'],
      emoji: '☁️',
      status: 'completed',
      funnyQuote: '"Why use shared hosting when you can architect enterprise cloud?" - Cloud Native Mindset',
      demoUrl: '#',
      image: '/assets/azure-project.jpg'
    }
  ];

  ngOnInit() {
    this.initScrollAnimations();
    
    // Track API call when component loads
    this.techNerdService.trackAPICall('ProjectsComponent', '/api/projects');
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
    // Track API call for project details
    this.techNerdService.trackAPICall('ProjectsComponent', `/api/projects/${project.id}`);
    
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
    
    // Skip hover animations on mobile
    if (window.innerWidth <= 768) return;
    
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

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;
    
    // Horizontal swipe detection
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.swipeRight();
      } else {
        this.swipeLeft();
      }
    }
  }

  private swipeLeft() {
    // Navigate to next project or close modal
    if (this.selectedProject) {
      this.closeProjectModal();
    }
  }

  private swipeRight() {
    // Navigate to previous project
    console.log('Swipe right detected');
  }
}
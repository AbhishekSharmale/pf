import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent implements OnInit {
  skills = [
    { name: 'Azure DevOps', level: 95, emoji: '🔵' },
    { name: 'Kubernetes', level: 90, emoji: '⚙️' },
    { name: 'Terraform', level: 88, emoji: '🏠' },
    { name: 'Docker', level: 92, emoji: '📦' },
    { name: 'Azure Cloud', level: 85, emoji: '☁️' },
    { name: 'CI/CD Pipelines', level: 93, emoji: '🚀' },
    { name: 'Monitoring & Observability', level: 87, emoji: '📊' },
    { name: 'Infrastructure as Code', level: 89, emoji: '📜' },
    { name: 'Bash/PowerShell', level: 84, emoji: '💻' },
    { name: 'Problem Overengineering', level: 99, emoji: '🤖' }
  ];

  timeline = [
    {
      year: 'Apr 2025 - Present',
      title: 'DevOps Engineer',
      company: 'Meganexus',
      description: 'Optimizing Azure DevOps Services and automating everything that moves. Currently working on making deployments so smooth they\'re practically frictionless.',
      emoji: '🚀'
    },
    {
      year: 'Mar 2023 - Apr 2025',
      title: 'DevOps Engineer',
      company: 'Digitate',
      description: 'Managed Kubernetes clusters, built CI/CD pipelines, and turned infrastructure chaos into orchestrated symphony. Specialized in making complex things look simple.',
      emoji: '⚙️'
    },
    {
      year: 'Mar 2022 - Mar 2023',
      title: 'Cloud Engineer',
      company: 'Digitate',
      description: 'Azure and AWS infrastructure management, cloud migrations, and learning that "it works on my machine" doesn\'t apply to production.',
      emoji: '☁️'
    }
  ];

  ngOnInit() {
    this.initAnimations();
  }

  private initAnimations() {
    // Animate skill bars
    gsap.fromTo('.skill-bar-fill', 
      { width: '0%' },
      {
        width: (i, target) => target.dataset['level'] + '%',
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 80%'
        }
      }
    );

    // Animate timeline items
    gsap.fromTo('.timeline-item', 
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top 80%'
        }
      }
    );
  }
}
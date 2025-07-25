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
    { name: 'JavaScript', level: 90, emoji: '🟨' },
    { name: 'TypeScript', level: 85, emoji: '🔷' },
    { name: 'Angular', level: 88, emoji: '🅰️' },
    { name: 'React', level: 82, emoji: '⚛️' },
    { name: 'Node.js', level: 80, emoji: '🟢' },
    { name: 'Python', level: 75, emoji: '🐍' },
    { name: 'Coffee Brewing', level: 99, emoji: '☕' },
    { name: 'Bug Creation', level: 95, emoji: '🐛' }
  ];

  timeline = [
    {
      year: '2024',
      title: 'Senior Comedy Developer',
      company: 'Chaos Industries',
      description: 'Leading a team of developers in creating solutions nobody asked for.',
      emoji: '🎭'
    },
    {
      year: '2023',
      title: 'Full Stack Comedian',
      company: 'Freelance Madness',
      description: 'Building applications that make people laugh... or cry.',
      emoji: '🤹‍♂️'
    },
    {
      year: '2022',
      title: 'Junior Bug Engineer',
      company: 'StartUp Chaos Co.',
      description: 'Specialized in turning features into bugs and bugs into features.',
      emoji: '🐛'
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
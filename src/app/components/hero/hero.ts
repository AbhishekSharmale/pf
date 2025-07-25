import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { TechNerdModeService } from '../../services/tech-nerd-mode.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit {
  @ViewChild('heroAvatar', { static: true }) heroAvatar!: ElementRef;
  @ViewChild('heroTitle', { static: true }) heroTitle!: ElementRef;
  @ViewChild('heroSubtitle', { static: true }) heroSubtitle!: ElementRef;
  @ViewChild('heroButtons', { static: true }) heroButtons!: ElementRef;

  typedText = '';
  currentTaglineIndex = 0;
  currentIndex = 0;
  isTyping = true;

  taglines = [
    "DevOps Engineer Who Automates Everything (Including Regret) 🤖",
    "I Turn Simple Problems Into Distributed Systems 🔄",
    "Professional Overthinker with a Kubernetes Addiction ⚙️",
    "3+ Years of Making Coffee Into Infrastructure ☕",
    "Senior Chaos Engineer at Your Service 🔥",
    "I Container-ize My Feelings and Orchestrate My Anxiety 📦",
    "Terraform Evangelist Who IaCs Everything 🏠",
    "Pipeline Perfectionist with 73-Stage Builds 🚀",
    "Cloud Native Developer Who Lives in the Terminal ☁️",
    "DevOps Engineer: Because Someone Has to Automate the Chaos 🤖"
  ];

  statusMessages = [
    "Terraform modules for everything, including my grocery list 🛒",
    "Currently debugging a pipeline that debugs other pipelines 🔄",
    "My Kubernetes cluster has more uptime than my sleep schedule ⏰",
    "Building Docker images while Docker builds character 🐳",
    "Monitoring my coffee consumption with Prometheus ☕",
    "Scaling my problems horizontally with microservices 📈",
    "Writing YAML that makes other YAML cry 😢",
    "My home network has better CI/CD than most companies 🏠"
  ];

  currentStatusIndex = 0;

  get fullText() {
    return this.taglines[this.currentTaglineIndex];
  }

  get currentStatus() {
    return this.statusMessages[this.currentStatusIndex];
  }

  currentFactIndex = 0;

  constructor(private techNerdService: TechNerdModeService) {}

  ngOnInit() {
    this.initAnimations();
    this.startTypewriter();
    this.rotateTaglines();
    this.rotateStatusMessages();
    
    // Track API call when hero loads
    this.techNerdService.trackAPICall('HeroComponent', '/api/profile');
  }

  private initAnimations() {
    // Initial state - hide elements
    gsap.set([this.heroTitle.nativeElement, this.heroSubtitle.nativeElement, this.heroButtons.nativeElement], {
      opacity: 0,
      y: 50
    });

    gsap.set(this.heroAvatar.nativeElement, {
      opacity: 0,
      scale: 0.5,
      rotation: -180
    });

    // Animate in sequence
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(this.heroAvatar.nativeElement, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
    .to(this.heroTitle.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3')
    .to(this.heroSubtitle.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3')
    .to(this.heroButtons.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3');

    // Floating animation for avatar
    gsap.to(this.heroAvatar.nativeElement, {
      y: -10,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  private startTypewriter() {
    const typeInterval = setInterval(() => {
      if (this.isTyping) {
        if (this.currentIndex < this.fullText.length) {
          this.typedText += this.fullText[this.currentIndex];
          this.currentIndex++;
        } else {
          this.isTyping = false;
          setTimeout(() => {
            this.isTyping = true;
            this.currentIndex = 0;
            this.typedText = '';
          }, 3000);
        }
      }
    }, 100);
  }

  private rotateTaglines() {
    setInterval(() => {
      this.currentTaglineIndex = (this.currentTaglineIndex + 1) % this.taglines.length;
      this.currentIndex = 0;
      this.typedText = '';
    }, 5000);
  }

  private rotateStatusMessages() {
    setInterval(() => {
      this.currentStatusIndex = (this.currentStatusIndex + 1) % this.statusMessages.length;
    }, 4000);
  }

  onAvatarClick() {
    // Easter egg animation
    gsap.to(this.heroAvatar.nativeElement, {
      rotation: '+=360',
      scale: 1.2,
      duration: 0.5,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1
    });

    // Show random emoji burst
    this.createEmojiBurst();
  }

  private createEmojiBurst() {
    const emojis = ['🎉', '✨', '🚀', '💫', '⭐', '🎊'];
    const avatarRect = this.heroAvatar.nativeElement.getBoundingClientRect();
    
    emojis.forEach((emoji, index) => {
      const emojiEl = document.createElement('div');
      emojiEl.textContent = emoji;
      emojiEl.style.position = 'fixed';
      emojiEl.style.left = avatarRect.left + avatarRect.width / 2 + 'px';
      emojiEl.style.top = avatarRect.top + avatarRect.height / 2 + 'px';
      emojiEl.style.fontSize = '1.5rem';
      emojiEl.style.pointerEvents = 'none';
      emojiEl.style.zIndex = '1000';
      
      document.body.appendChild(emojiEl);
      
      const angle = (index / emojis.length) * Math.PI * 2;
      const distance = 100;
      
      gsap.to(emojiEl, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          document.body.removeChild(emojiEl);
        }
      });
    });
  }

  scrollToProjects() {
    const projectsSection = document.querySelector('app-projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
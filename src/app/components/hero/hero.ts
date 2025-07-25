import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

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
  fullText = 'DevOps Engineer Who Automates Everything (Including Regret) 🤖';
  currentIndex = 0;
  isTyping = true;

  funFacts = [
    "My pipeline has 73 stages and I regret nothing ✨",
    "I turn simple deployments into Kubernetes masterpieces 🚀",
    "Currently automating chaos at Meganexus 💼",
    "3+ years of making infrastructure unnecessarily complex 📊",
    "Terraform modules for everything, including my grocery list 🛒"
  ];

  currentFactIndex = 0;

  ngOnInit() {
    this.initAnimations();
    this.startTypewriter();
    this.rotateFunFacts();
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

  private rotateFunFacts() {
    setInterval(() => {
      this.currentFactIndex = (this.currentFactIndex + 1) % this.funFacts.length;
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
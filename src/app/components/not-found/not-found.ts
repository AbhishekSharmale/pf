import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFoundComponent implements OnInit {
  currentQuote = 0;
  gameScore = 0;
  gameActive = false;
  
  funnyQuotes = [
    "404: Page not found, but my sense of humor is still here! 😄",
    "This page is like my motivation on Monday morning... missing! ☕",
    "Error 404: Page went to get coffee and never came back ☕",
    "The page you're looking for is in another castle 🏰",
    "404: This page is as elusive as bug-free code 🐛",
    "Page not found, but hey, at least you found this awesome 404 page! 🎉",
    "This page is taking a mental health day 🧘‍♂️",
    "404: Page is probably stuck in an infinite loop somewhere 🔄"
  ];

  ngOnInit() {
    this.initAnimations();
    this.rotateQuotes();
  }

  private initAnimations() {
    // Animate 404 text
    gsap.fromTo('.error-code', 
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
    );

    // Animate content
    gsap.fromTo('.error-content > *', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, delay: 0.5 }
    );

    // Floating animation for emoji
    gsap.to('.floating-emoji', {
      y: -20,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.3
    });
  }

  private rotateQuotes() {
    setInterval(() => {
      this.currentQuote = (this.currentQuote + 1) % this.funnyQuotes.length;
    }, 4000);
  }

  startMiniGame() {
    if (this.gameActive) return;
    
    this.gameActive = true;
    this.gameScore = 0;
    
    // Create falling emojis mini-game
    const gameContainer = document.querySelector('.mini-game-container') as HTMLElement;
    const emojis = ['🐛', '☕', '💻', '🚀', '⚡', '🎯'];
    
    const gameInterval = setInterval(() => {
      const emoji = document.createElement('div');
      emoji.className = 'falling-emoji';
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = Math.random() * (gameContainer.offsetWidth - 40) + 'px';
      
      emoji.addEventListener('click', () => {
        this.gameScore++;
        gsap.to(emoji, {
          scale: 2,
          opacity: 0,
          duration: 0.3,
          onComplete: () => emoji.remove()
        });
      });
      
      gameContainer.appendChild(emoji);
      
      gsap.to(emoji, {
        y: gameContainer.offsetHeight + 50,
        duration: 3,
        ease: 'none',
        onComplete: () => {
          if (emoji.parentNode) {
            emoji.remove();
          }
        }
      });
    }, 800);

    // End game after 15 seconds
    setTimeout(() => {
      clearInterval(gameInterval);
      this.gameActive = false;
      
      // Remove remaining emojis
      const remainingEmojis = gameContainer.querySelectorAll('.falling-emoji');
      remainingEmojis.forEach(emoji => emoji.remove());
      
      // Show score
      this.showGameResult();
    }, 15000);
  }

  private showGameResult() {
    const message = this.gameScore > 10 ? 
      `Amazing! You caught ${this.gameScore} emojis! 🏆` :
      this.gameScore > 5 ?
      `Not bad! You caught ${this.gameScore} emojis! 👍` :
      `You caught ${this.gameScore} emojis. Practice makes perfect! 😅`;

    // Create result popup
    const popup = document.createElement('div');
    popup.className = 'game-result-popup';
    popup.innerHTML = `
      <div class="popup-content">
        <h3>Game Over!</h3>
        <p>${message}</p>
        <button onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    gsap.fromTo(popup, 
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );
  }

  onEmojiClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Create burst effect
    const rect = target.getBoundingClientRect();
    const particles = ['✨', '⭐', '💫', '🎉'];
    
    particles.forEach((particle, index) => {
      const el = document.createElement('div');
      el.textContent = particle;
      el.style.position = 'fixed';
      el.style.left = rect.left + rect.width / 2 + 'px';
      el.style.top = rect.top + rect.height / 2 + 'px';
      el.style.fontSize = '1.5rem';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '1000';
      
      document.body.appendChild(el);
      
      const angle = (index / particles.length) * Math.PI * 2;
      const distance = 80;
      
      gsap.to(el, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => el.remove()
      });
    });

    // Bounce animation
    gsap.to(target, {
      scale: 1.3,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });
  }

  goBack() {
    window.history.back();
  }
}
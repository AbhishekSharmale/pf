import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Comedy Portfolio - Solutions No One Asked For';
  private cursor!: HTMLElement;
  private mouseMoveListener!: (e: MouseEvent) => void;
  private mouseEnterListener!: () => void;
  private mouseLeaveListener!: () => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initCustomCursor();
    this.initKonamiCode();
  }

  ngOnDestroy() {
    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
    }
    if (this.mouseEnterListener) {
      document.removeEventListener('mouseenter', this.mouseEnterListener);
    }
    if (this.mouseLeaveListener) {
      document.removeEventListener('mouseleave', this.mouseLeaveListener);
    }
  }

  private initCustomCursor() {
    this.cursor = this.renderer.createElement('div');
    this.renderer.addClass(this.cursor, 'cursor');
    this.renderer.appendChild(document.body, this.cursor);

    this.mouseMoveListener = (e: MouseEvent) => {
      gsap.to(this.cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1
      });
    };

    this.mouseEnterListener = () => {
      this.renderer.addClass(this.cursor, 'hover');
    };

    this.mouseLeaveListener = () => {
      this.renderer.removeClass(this.cursor, 'hover');
    };

    document.addEventListener('mousemove', this.mouseMoveListener);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', this.mouseEnterListener);
      el.addEventListener('mouseleave', this.mouseLeaveListener);
    });
  }

  private initKonamiCode() {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    let userInput: string[] = [];

    document.addEventListener('keydown', (e) => {
      userInput.push(e.code);
      userInput = userInput.slice(-konamiCode.length);
      
      if (userInput.join('') === konamiCode.join('')) {
        this.activateEasterEgg();
      }
    });
  }

  private activateEasterEgg() {
    // Create floating emojis
    const emojis = ['🚀', '💻', '🎭', '🤖', '⚡', '🎪', '🎨', '🔥'];
    
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const emoji = this.renderer.createElement('div');
        this.renderer.setStyle(emoji, 'position', 'fixed');
        this.renderer.setStyle(emoji, 'font-size', '2rem');
        this.renderer.setStyle(emoji, 'pointer-events', 'none');
        this.renderer.setStyle(emoji, 'z-index', '10000');
        this.renderer.setStyle(emoji, 'left', Math.random() * window.innerWidth + 'px');
        this.renderer.setStyle(emoji, 'top', '-50px');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        this.renderer.appendChild(document.body, emoji);
        
        gsap.to(emoji, {
          y: window.innerHeight + 100,
          rotation: 360,
          duration: 3,
          ease: 'power2.out',
          onComplete: () => {
            this.renderer.removeChild(document.body, emoji);
          }
        });
      }, i * 100);
    }
    
    // Show secret message
    const message = this.renderer.createElement('div');
    this.renderer.setStyle(message, 'position', 'fixed');
    this.renderer.setStyle(message, 'top', '50%');
    this.renderer.setStyle(message, 'left', '50%');
    this.renderer.setStyle(message, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(message, 'background', 'var(--gradient-primary)');
    this.renderer.setStyle(message, 'color', 'white');
    this.renderer.setStyle(message, 'padding', '2rem');
    this.renderer.setStyle(message, 'border-radius', '1rem');
    this.renderer.setStyle(message, 'font-size', '1.5rem');
    this.renderer.setStyle(message, 'text-align', 'center');
    this.renderer.setStyle(message, 'z-index', '10001');
    this.renderer.setStyle(message, 'box-shadow', '0 20px 40px rgba(0,0,0,0.3)');
    message.innerHTML = '🎉 You found the secret! <br> <small>You are officially a legend!</small>';
    
    this.renderer.appendChild(document.body, message);
    
    gsap.fromTo(message, 
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' }
    );
    
    setTimeout(() => {
      gsap.to(message, {
        scale: 0,
        rotation: 180,
        duration: 0.3,
        onComplete: () => {
          this.renderer.removeChild(document.body, message);
        }
      });
    }, 3000);
  }
}
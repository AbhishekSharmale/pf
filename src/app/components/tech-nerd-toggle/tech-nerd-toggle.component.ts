import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechNerdModeService } from '../../services/tech-nerd-mode.service';

@Component({
  selector: 'app-tech-nerd-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tech-nerd-toggle-container" [class.active]="isTechNerdMode">
      <button 
        class="tech-nerd-toggle-btn" 
        (click)="toggleTechNerdMode()"
        [class.active]="isTechNerdMode">
        <div class="toggle-icon">
          <span class="icon-text">{{ isTechNerdMode ? 'EXIT' : 'NERD' }}</span>
          <span class="icon-emoji">{{ isTechNerdMode ? '🔥' : '🤓' }}</span>
        </div>
        <div class="toggle-label">
          {{ isTechNerdMode ? 'EXIT POSTMORTEM' : 'ENTER POSTMORTEM' }}
        </div>
      </button>
    </div>
  `,
  styles: [`
    .tech-nerd-toggle-container {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 1000;
      
      @media (max-width: 768px) {
        bottom: 20px;
        right: 20px;
      }
    }

    .tech-nerd-toggle-btn {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      border: 2px solid rgba(64, 224, 208, 0.4);
      border-radius: 50px;
      padding: 12px 20px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 
        0 8px 25px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      
      &:hover {
        transform: translateY(-3px) scale(1.05);
        border-color: rgba(64, 224, 208, 0.8);
        box-shadow: 
          0 12px 35px rgba(0, 0, 0, 0.4),
          0 0 30px rgba(64, 224, 208, 0.3);
      }
      
      &.active {
        background: linear-gradient(135deg, #FF6B35 0%, #FFE66D 100%);
        border-color: rgba(255, 107, 53, 0.8);
        animation: active-pulse 2s ease-in-out infinite;
        
        &:hover {
          box-shadow: 
            0 12px 35px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(255, 107, 53, 0.5);
        }
      }
      
      .toggle-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        
        .icon-text {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #40E0D0;
          text-transform: uppercase;
          
          .active & {
            color: white;
          }
        }
        
        .icon-emoji {
          font-size: 16px;
          animation: icon-bounce 2s ease-in-out infinite;
        }
      }
      
      .toggle-label {
        font-size: 11px;
        font-weight: 600;
        color: #40E0D0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        
        .active & {
          color: white;
        }
        
        @media (max-width: 480px) {
          display: none;
        }
      }
    }
    
    @keyframes active-pulse {
      0%, 100% { 
        box-shadow: 
          0 8px 25px rgba(0, 0, 0, 0.3),
          0 0 20px rgba(255, 107, 53, 0.4);
      }
      50% { 
        box-shadow: 
          0 8px 25px rgba(0, 0, 0, 0.3),
          0 0 40px rgba(255, 107, 53, 0.8);
      }
    }
    
    @keyframes icon-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
    }
  `]
})
export class TechNerdToggleComponent {
  isTechNerdMode = false;

  constructor(private techNerdService: TechNerdModeService) {
    this.techNerdService.techNerdMode$.subscribe(mode => {
      this.isTechNerdMode = mode;
    });
  }

  toggleTechNerdMode() {
    this.techNerdService.toggleTechNerdMode();
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechNerdModeService, ComponentInfo, APICall } from '../../services/tech-nerd-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tech-nerd-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tech-nerd-overlay" *ngIf="isActive">
      <!-- Component Info Panel -->
      <div class="component-info-panel" *ngIf="selectedComponent">
        <div class="panel-title">{{ selectedComponent.name }}</div>
        <div class="panel-item">
          <span class="label">Type:</span>
          <span class="value">{{ selectedComponent.type }}</span>
        </div>
        <div class="panel-item">
          <span class="label">Bundle Size:</span>
          <span class="value">{{ selectedComponent.bundleSize }}</span>
        </div>
        <div class="panel-item">
          <span class="label">Render Time:</span>
          <span class="value">{{ selectedComponent.renderTime }}ms</span>
        </div>
      </div>

      <!-- API Call Visualization -->
      <div class="api-calls-container">
        <div 
          *ngFor="let call of apiCalls" 
          class="api-call-line"
          [style.left.%]="call.from.x"
          [style.top.%]="call.from.y"
          [style.width.px]="getLineWidth(call)"
          [style.transform]="getLineTransform(call)"
          [class]="'status-' + call.status">
          <div class="api-call-info">
            <span class="method">{{ call.method }}</span>
            <span class="endpoint">{{ call.endpoint }}</span>
          </div>
        </div>
      </div>

      <!-- Architecture Diagram -->
      <div class="architecture-diagram">
        <div class="arch-title">SYSTEM ARCHITECTURE</div>
        <div class="arch-layer frontend">
          <div class="layer-title">FRONTEND</div>
          <div class="components">
            <div *ngFor="let comp of components" class="arch-component">
              {{ comp.name.replace('Component', '') }}
            </div>
          </div>
        </div>
        <div class="arch-arrow">↓</div>
        <div class="arch-layer services">
          <div class="layer-title">SERVICES</div>
          <div class="components">
            <div class="arch-component">TechNerdModeService</div>
            <div class="arch-component">AnimationService</div>
            <div class="arch-component">ThemeService</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tech-nerd-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 997;
    }

    .api-call-line {
      position: absolute;
      height: 2px;
      background: linear-gradient(90deg, #00ff41, #4ECDC4);
      border-radius: 1px;
      animation: pulse-line 2s ease-in-out infinite;

      &.status-pending { background: linear-gradient(90deg, #FFE66D, #FF6B35); }
      &.status-error { background: linear-gradient(90deg, #DC3545, #FF6B35); }

      .api-call-info {
        position: absolute;
        top: -20px;
        left: 0;
        font-size: 8px;
        color: #00ff41;
        font-family: var(--font-mono);
        white-space: nowrap;

        .method {
          background: rgba(0, 255, 65, 0.2);
          padding: 1px 4px;
          border-radius: 2px;
          margin-right: 4px;
        }
      }
    }

    .architecture-diagram {
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 300px;
      background: rgba(0, 0, 0, 0.8);
      border: 1px solid #00ff41;
      border-radius: 8px;
      padding: 16px;
      font-family: var(--font-mono);
      font-size: 10px;
      color: #00ff41;

      .arch-title {
        text-align: center;
        font-weight: 700;
        margin-bottom: 12px;
        color: var(--primary);
      }

      .arch-layer {
        border: 1px dashed #00ff41;
        padding: 8px;
        margin-bottom: 8px;
        border-radius: 4px;

        .layer-title {
          font-weight: 600;
          margin-bottom: 6px;
          text-align: center;
        }

        .components {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;

          .arch-component {
            background: rgba(0, 255, 65, 0.1);
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 8px;
          }
        }
      }

      .arch-arrow {
        text-align: center;
        font-size: 16px;
        margin: 4px 0;
      }
    }

    @keyframes pulse-line {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }

    @media (max-width: 768px) {
      .architecture-diagram {
        width: 250px;
        font-size: 8px;
        bottom: 10px;
        left: 10px;
      }
    }
  `]
})
export class TechNerdOverlayComponent implements OnInit, OnDestroy {
  isActive = false;
  components: ComponentInfo[] = [];
  apiCalls: APICall[] = [];
  selectedComponent: ComponentInfo | null = null;
  
  private subscriptions: Subscription[] = [];

  constructor(private techNerdService: TechNerdModeService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.techNerdService.techNerdMode$.subscribe(active => {
        this.isActive = active;
        if (active && this.components.length > 0) {
          this.selectedComponent = this.components[0];
        }
      }),
      
      this.techNerdService.components$.subscribe(components => {
        this.components = components;
      }),
      
      this.techNerdService.apiCalls$.subscribe(calls => {
        this.apiCalls = calls;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getLineWidth(call: APICall): number {
    const dx = call.to.x - call.from.x;
    const dy = call.to.y - call.from.y;
    return Math.sqrt(dx * dx + dy * dy) * 5; // Scale for viewport
  }

  getLineTransform(call: APICall): string {
    const dx = call.to.x - call.from.x;
    const dy = call.to.y - call.from.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return `rotate(${angle}deg)`;
  }
}
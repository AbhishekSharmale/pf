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
      <!-- Modern Developer Console Panel -->
      <div class="component-info-panel" *ngIf="selectedComponent">
        <div class="panel-header">
          <div class="panel-title">🔍 {{ selectedComponent.name }}</div>
          <div class="panel-status">ACTIVE</div>
        </div>
        <div class="panel-metrics">
          <div class="metric-item">
            <span class="metric-label">TYPE</span>
            <span class="metric-value">{{ selectedComponent.type.split(' ')[1] }}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">SIZE</span>
            <span class="metric-value">{{ selectedComponent.bundleSize }}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">RENDER</span>
            <span class="metric-value">{{ selectedComponent.renderTime }}ms</span>
          </div>
        </div>
      </div>

      <!-- API Server Visualization -->
      <div class="api-server" [style.left.%]="85" [style.top.%]="45">
        <div class="server-icon">🖥️</div>
        <div class="server-label">API SERVER</div>
        <div class="server-status">ONLINE</div>
      </div>

      <!-- Enhanced API Call Flow -->
      <div class="api-calls-container">
        <div 
          *ngFor="let call of apiCalls" 
          class="api-call-line"
          [style.left.%]="call.from.x"
          [style.top.%]="call.from.y"
          [style.width.px]="getLineWidth(call)"
          [style.transform]="getLineTransform(call)"
          [class]="'status-' + call.status">
          
          <!-- Request Flow -->
          <div class="request-flow">
            <div class="flow-dot request-dot"></div>
          </div>
          
          <!-- API Call Info -->
          <div class="api-tooltip">
            <div class="tooltip-header">
              <span class="component-name">{{ call.component }}</span>
              <span class="method-badge" [class]="'method-' + call.method.toLowerCase()">{{ call.method }}</span>
            </div>
            <div class="endpoint-path">{{ call.endpoint }}</div>
            <div class="response-data" *ngIf="call.status === 'success'">{{ call.response }}</div>
          </div>
          
          <!-- Response Flow (only for successful calls) -->
          <div class="response-flow" *ngIf="call.status === 'success'">
            <div class="flow-dot response-dot"></div>
          </div>
        </div>
      </div>

      <!-- Modern Architecture Visualization -->
      <div class="architecture-panel">
        <div class="arch-header">
          <div class="arch-title">⚡ SYSTEM MAP</div>
          <div class="arch-toggle">LIVE</div>
        </div>
        <div class="arch-content">
          <div class="arch-section">
            <div class="section-label">FRONTEND</div>
            <div class="component-grid">
              <div *ngFor="let comp of components" class="comp-node">
                <div class="node-dot"></div>
                <span>{{ comp.name.replace('Component', '') }}</span>
              </div>
            </div>
          </div>
          <div class="data-flow">⟶ DATA FLOW ⟵</div>
          <div class="arch-section">
            <div class="section-label">SERVICES</div>
            <div class="component-grid">
              <div class="comp-node">
                <div class="node-dot service"></div>
                <span>TechNerd</span>
              </div>
              <div class="comp-node">
                <div class="node-dot service"></div>
                <span>Theme</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Monitor -->
      <div class="performance-monitor">
        <div class="monitor-title">⚡ PERFORMANCE</div>
        <div class="perf-metrics">
          <div class="perf-item">
            <div class="perf-label">FPS</div>
            <div class="perf-value">60</div>
          </div>
          <div class="perf-item">
            <div class="perf-label">MEMORY</div>
            <div class="perf-value">{{ getMemoryUsage() }}MB</div>
          </div>
          <div class="perf-item">
            <div class="perf-label">LOAD</div>
            <div class="perf-value">{{ getLoadTime() }}ms</div>
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
      font-family: 'JetBrains Mono', monospace;
    }

    .component-info-panel {
      position: fixed;
      top: 80px;
      right: 20px;
      width: 280px;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      border: 1px solid rgba(64, 224, 208, 0.4);
      border-radius: 12px;
      padding: 0;
      z-index: 1001;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      overflow: hidden;

      .panel-header {
        background: linear-gradient(90deg, #40E0D0, #FF6B35);
        padding: 8px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .panel-title {
          font-size: 11px;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
        }

        .panel-status {
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 8px;
          color: white;
          font-weight: 600;
        }
      }

      .panel-metrics {
        padding: 16px;

        .metric-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(64, 224, 208, 0.1);

          &:last-child { border-bottom: none; }

          .metric-label {
            font-size: 9px;
            color: #a0a0a0;
            font-weight: 600;
          }

          .metric-value {
            font-size: 11px;
            color: #40E0D0;
            font-weight: 700;
          }
        }
      }
    }

    .api-server {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1000;
      
      .server-icon {
        font-size: 24px;
        margin-bottom: 4px;
        animation: server-pulse 3s ease-in-out infinite;
      }
      
      .server-label {
        font-size: 8px;
        color: #40E0D0;
        font-weight: 700;
        margin-bottom: 2px;
        text-align: center;
      }
      
      .server-status {
        background: #28a745;
        color: white;
        padding: 1px 6px;
        border-radius: 8px;
        font-size: 6px;
        font-weight: 700;
        animation: status-blink 2s ease-in-out infinite;
      }
    }

    .api-call-line {
      position: absolute;
      height: 3px;
      background: linear-gradient(90deg, rgba(64, 224, 208, 0.8), rgba(255, 107, 53, 0.8));
      border-radius: 2px;
      box-shadow: 0 0 10px rgba(64, 224, 208, 0.4);
      overflow: visible;

      &.status-pending { 
        background: linear-gradient(90deg, #FFE66D, #FF6B35);
        box-shadow: 0 0 10px rgba(255, 230, 109, 0.4);
      }
      
      &.status-error { 
        background: linear-gradient(90deg, #DC3545, #FF6B35);
        box-shadow: 0 0 10px rgba(220, 53, 69, 0.4);
      }

      .request-flow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
        .request-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #40E0D0;
          border-radius: 50%;
          box-shadow: 0 0 8px #40E0D0;
          animation: request-travel 2s ease-in-out infinite;
        }
      }
      
      .response-flow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
        .response-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #28a745;
          border-radius: 50%;
          box-shadow: 0 0 6px #28a745;
          animation: response-travel 2s ease-in-out infinite 0.5s;
        }
      }

      .api-tooltip {
        position: absolute;
        top: -45px;
        left: 10px;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        border: 1px solid rgba(64, 224, 208, 0.4);
        border-radius: 6px;
        padding: 6px 8px;
        font-size: 8px;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        
        .tooltip-header {
          display: flex;
          gap: 6px;
          align-items: center;
          margin-bottom: 3px;
          
          .component-name {
            color: #a0a0a0;
            font-size: 7px;
            font-weight: 600;
          }
          
          .method-badge {
            background: #40E0D0;
            color: #1a1a1a;
            padding: 1px 4px;
            border-radius: 3px;
            font-weight: 700;
            font-size: 6px;

            &.method-get { background: #28a745; color: white; }
            &.method-post { background: #007bff; color: white; }
            &.method-put { background: #ffc107; color: #000; }
            &.method-delete { background: #dc3545; color: white; }
          }
        }

        .endpoint-path {
          color: #40E0D0;
          font-weight: 600;
          margin-bottom: 2px;
        }
        
        .response-data {
          color: #28a745;
          font-size: 7px;
          font-style: italic;
          opacity: 0.9;
        }
      }
    }

    .architecture-panel {
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 320px;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      border: 1px solid rgba(64, 224, 208, 0.4);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

      .arch-header {
        background: linear-gradient(90deg, #40E0D0, #FF6B35);
        padding: 8px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .arch-title {
          font-size: 11px;
          font-weight: 700;
          color: white;
        }

        .arch-toggle {
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 8px;
          color: white;
          font-weight: 600;
        }
      }

      .arch-content {
        padding: 16px;

        .arch-section {
          margin-bottom: 16px;

          .section-label {
            font-size: 9px;
            color: #40E0D0;
            font-weight: 700;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .component-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            .comp-node {
              display: flex;
              align-items: center;
              gap: 6px;
              background: rgba(64, 224, 208, 0.1);
              padding: 4px 8px;
              border-radius: 6px;
              font-size: 8px;
              color: #40E0D0;
              border: 1px solid rgba(64, 224, 208, 0.2);

              .node-dot {
                width: 6px;
                height: 6px;
                background: #40E0D0;
                border-radius: 50%;
                animation: pulse-dot 2s ease-in-out infinite;

                &.service {
                  background: #FF6B35;
                }
              }
            }
          }
        }

        .data-flow {
          text-align: center;
          font-size: 8px;
          color: #a0a0a0;
          margin: 12px 0;
          font-weight: 600;
        }
      }
    }

    .performance-monitor {
      position: fixed;
      top: 80px;
      left: 20px;
      width: 200px;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      border: 1px solid rgba(255, 107, 53, 0.4);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

      .monitor-title {
        background: linear-gradient(90deg, #FF6B35, #FFE66D);
        padding: 8px 16px;
        font-size: 11px;
        font-weight: 700;
        color: white;
        text-align: center;
      }

      .perf-metrics {
        padding: 12px;
        display: flex;
        justify-content: space-between;

        .perf-item {
          text-align: center;

          .perf-label {
            font-size: 7px;
            color: #a0a0a0;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .perf-value {
            font-size: 12px;
            color: #FF6B35;
            font-weight: 700;
          }
        }
      }
    }

    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.2); }
    }
    
    @keyframes server-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes status-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    @keyframes request-travel {
      0% { left: 0; opacity: 1; }
      100% { left: calc(100% - 6px); opacity: 0.3; }
    }
    
    @keyframes response-travel {
      0% { right: 0; left: auto; opacity: 1; }
      100% { right: calc(100% - 4px); opacity: 0.3; }
    }

    @media (max-width: 768px) {
      .component-info-panel,
      .architecture-panel {
        width: 250px;
        font-size: 9px;
      }

      .performance-monitor {
        width: 180px;
      }

      .architecture-panel {
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

  getMemoryUsage(): number {
    // Simulate memory usage
    return Math.floor(Math.random() * 50) + 20;
  }

  getLoadTime(): number {
    // Simulate load time
    return Math.floor(Math.random() * 200) + 100;
  }
}
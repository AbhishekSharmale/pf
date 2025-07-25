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
      <!-- API Calls Dashboard -->
      <div class="api-dashboard">
        <div class="dashboard-header">
          <div class="dashboard-title">🔍 API CALLS</div>
          <div class="dashboard-status">MONITORING</div>
        </div>
        <div class="api-calls-list">
          <div 
            *ngFor="let call of apiCalls; trackBy: trackApiCall" 
            class="api-call-item"
            [class]="'status-' + call.status">
            <div class="call-header">
              <span class="method-badge" [class]="'method-' + call.method.toLowerCase()">{{ call.method }}</span>
              <span class="endpoint">{{ call.endpoint }}</span>
              <span class="status-indicator" [class]="'status-' + call.status">
                <span *ngIf="call.status === 'pending'">⏳</span>
                <span *ngIf="call.status === 'success'">✓</span>
                <span *ngIf="call.status === 'error'">✗</span>
              </span>
            </div>
            <div class="call-details">
              <span class="component-name">{{ call.component }}</span>
              <span class="timestamp">{{ getTimeAgo(call.timestamp) }}</span>
            </div>
            <div class="response-preview" *ngIf="call.status === 'success'">
              {{ call.response }}
            </div>
            <div class="call-metrics">
              <span class="metric">{{ getRandomLatency() }}ms</span>
              <span class="metric">{{ getRandomSize() }}KB</span>
              <span class="metric" [class]="'status-' + call.status">{{ call.status.toUpperCase() }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Monitor -->
      <div class="performance-monitor">
        <div class="monitor-title">⚡ SYSTEM METRICS</div>
        <div class="perf-grid">
          <div class="perf-item">
            <div class="perf-label">CPU</div>
            <div class="perf-value">{{ getCPUUsage() }}%</div>
            <div class="perf-bar">
              <div class="perf-fill" [style.width.%]="getCPUUsage()"></div>
            </div>
          </div>
          <div class="perf-item">
            <div class="perf-label">MEMORY</div>
            <div class="perf-value">{{ getMemoryUsage() }}MB</div>
            <div class="perf-bar">
              <div class="perf-fill" [style.width.%]="getMemoryUsage()"></div>
            </div>
          </div>
          <div class="perf-item">
            <div class="perf-label">NETWORK</div>
            <div class="perf-value">{{ getNetworkSpeed() }}ms</div>
            <div class="perf-bar">
              <div class="perf-fill" [style.width.%]="100 - getNetworkSpeed()"></div>
            </div>
          </div>
          <div class="perf-item">
            <div class="perf-label">UPTIME</div>
            <div class="perf-value">{{ getUptime() }}</div>
          </div>
        </div>
      </div>

      <!-- Network Monitor -->
      <div class="network-monitor">
        <div class="monitor-title">🌐 NETWORK</div>
        <div class="network-stats">
          <div class="stat-item">
            <span class="stat-label">REQUESTS</span>
            <span class="stat-value">{{ getTotalRequests() }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">SUCCESS</span>
            <span class="stat-value">{{ getSuccessRate() }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">AVG TIME</span>
            <span class="stat-value">{{ getAvgResponse() }}ms</span>
          </div>
        </div>
      </div>

      <!-- API Server -->
      <div class="api-server" [style.right.px]="20" [style.top.%]="50">
        <div class="server-icon">🖥️</div>
        <div class="server-label">API SERVER</div>
      </div>

      <!-- API Connection Lines -->
      <div class="api-connections">
        <div 
          *ngFor="let call of apiCalls" 
          class="api-connection-line"
          [style.left.%]="call.from.x"
          [style.top.%]="call.from.y"
          [style.width]="'calc(100% - ' + call.from.x + '% - 100px)'"
          [class]="'status-' + call.status">
          <div class="api-call-text">
            <span class="method">{{ call.method }}</span>
            <span class="endpoint">{{ call.endpoint }}</span>
          </div>
        </div>
      </div>

      <!-- System Architecture -->
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

    .api-dashboard {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 350px;
      max-height: 400px;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      border: 2px solid rgba(64, 224, 208, 0.6);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(10px);
      animation: dashboard-slide-in 0.8s ease-out;

      .dashboard-header {
        background: linear-gradient(90deg, #40E0D0, #FF6B35);
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .dashboard-title {
          font-size: 12px;
          font-weight: 700;
          color: white;
          letter-spacing: 1px;
        }

        .dashboard-status {
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 8px;
          color: white;
          font-weight: 600;
          animation: status-blink 2s ease-in-out infinite;
        }
      }

      .api-calls-list {
        max-height: 320px;
        overflow-y: auto;
        padding: 8px;

        .api-call-item {
          background: rgba(64, 224, 208, 0.05);
          border: 1px solid rgba(64, 224, 208, 0.2);
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 8px;
          animation: call-item-slide 0.3s ease-out;

          &.status-success {
            border-color: rgba(40, 167, 69, 0.4);
            background: rgba(40, 167, 69, 0.05);
          }

          &.status-error {
            border-color: rgba(220, 53, 69, 0.4);
            background: rgba(220, 53, 69, 0.05);
          }

          .call-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;

            .method-badge {
              background: #40E0D0;
              color: #000;
              padding: 2px 6px;
              border-radius: 4px;
              font-weight: 700;
              font-size: 8px;

              &.method-get { background: #28a745; color: white; }
              &.method-post { background: #007bff; color: white; }
              &.method-put { background: #ffc107; color: #000; }
              &.method-delete { background: #dc3545; color: white; }
            }

            .endpoint {
              flex: 1;
              color: #40E0D0;
              font-size: 10px;
              font-weight: 600;
            }

            .status-indicator {
              font-size: 12px;
              
              &.status-pending { color: #FFE66D; }
              &.status-success { color: #28a745; }
              &.status-error { color: #dc3545; }
            }
          }

          .call-details {
            display: flex;
            justify-content: space-between;
            font-size: 8px;
            color: #a0a0a0;
            margin-bottom: 4px;

            .component-name {
              font-weight: 600;
            }

            .timestamp {
              opacity: 0.7;
            }
          }

          .response-preview {
            background: rgba(40, 167, 69, 0.1);
            border-radius: 4px;
            padding: 4px 6px;
            font-size: 7px;
            color: #28a745;
            font-family: monospace;
            border-left: 2px solid #28a745;
          }
        }
      }
    }

    .performance-monitor {
      position: fixed;
      top: 80px;
      left: 20px;
      width: 220px;
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

      .perf-grid {
        padding: 12px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;

        .perf-item {
          .perf-label {
            font-size: 7px;
            color: #a0a0a0;
            font-weight: 600;
            margin-bottom: 2px;
          }

          .perf-value {
            font-size: 10px;
            color: #FF6B35;
            font-weight: 700;
            margin-bottom: 4px;
          }
          
          .perf-bar {
            width: 100%;
            height: 3px;
            background: rgba(255, 107, 53, 0.2);
            border-radius: 2px;
            overflow: hidden;
            
            .perf-fill {
              height: 100%;
              background: linear-gradient(90deg, #FF6B35, #FFE66D);
              transition: width 0.5s ease;
            }
          }
        }
      }
    }

    .network-monitor {
      position: fixed;
      top: 220px;
      left: 20px;
      width: 200px;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      border: 1px solid rgba(78, 205, 196, 0.4);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

      .monitor-title {
        background: linear-gradient(90deg, #4ECDC4, #40E0D0);
        padding: 8px 16px;
        font-size: 11px;
        font-weight: 700;
        color: white;
        text-align: center;
      }

      .network-stats {
        padding: 12px;

        .stat-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 8px;

          .stat-label {
            color: #a0a0a0;
            font-weight: 600;
          }

          .stat-value {
            color: #4ECDC4;
            font-weight: 700;
          }
        }
      }
    }

    .call-metrics {
      display: flex;
      gap: 8px;
      font-size: 7px;
      margin-top: 4px;
      
      .metric {
        background: rgba(64, 224, 208, 0.1);
        padding: 1px 4px;
        border-radius: 2px;
        color: #40E0D0;
        
        &.status-success { color: #28a745; }
        &.status-error { color: #dc3545; }
        &.status-pending { color: #FFE66D; }
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

    @keyframes dashboard-slide-in {
      0% {
        transform: translateX(100%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes call-item-slide {
      0% {
        transform: translateX(20px);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.2); }
    }
    
    @keyframes status-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .api-server {
      position: fixed;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: translateY(-50%);
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      border: 2px solid rgba(64, 224, 208, 0.6);
      border-radius: 12px;
      padding: 12px;
      z-index: 1001;
      box-shadow: 0 0 20px rgba(64, 224, 208, 0.3);
      animation: server-pulse 3s ease-in-out infinite;
      
      .server-icon {
        font-size: 24px;
        margin-bottom: 6px;
      }
      
      .server-label {
        font-size: 9px;
        color: #40E0D0;
        font-weight: 700;
        text-align: center;
        letter-spacing: 1px;
      }
    }

    .api-connection-line {
      position: fixed;
      height: 3px;
      background: linear-gradient(90deg, #40E0D0, #FF6B35);
      pointer-events: none;
      z-index: 1000;
      opacity: 1;
      animation: line-fade 5s ease-in-out forwards;
      box-shadow: 0 0 10px rgba(64, 224, 208, 0.5);
      
      &.status-pending { 
        background: linear-gradient(90deg, #FFE66D, #FF6B35);
        box-shadow: 0 0 10px rgba(255, 230, 109, 0.5);
      }
      &.status-error { 
        background: linear-gradient(90deg, #DC3545, #FF6B35);
        box-shadow: 0 0 10px rgba(220, 53, 69, 0.5);
      }
      
      &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: 0;
        width: 8px;
        height: 7px;
        background: #40E0D0;
        border-radius: 50%;
        box-shadow: 0 0 12px #40E0D0;
        animation: data-travel 3s ease-in-out infinite;
      }
      
      .api-call-text {
        position: absolute;
        top: -25px;
        left: 20px;
        display: flex;
        gap: 8px;
        font-size: 11px;
        font-family: var(--font-mono);
        animation: text-fade 5s ease-in-out forwards;
        background: rgba(0, 0, 0, 0.8);
        padding: 4px 8px;
        border-radius: 4px;
        
        .method {
          background: #40E0D0;
          color: #000;
          padding: 2px 6px;
          border-radius: 3px;
          font-weight: 700;
        }
        
        .endpoint {
          color: #40E0D0;
          font-weight: 600;
        }
      }
    }
    
    @keyframes data-travel {
      0% { left: 0; opacity: 1; }
      100% { left: calc(100% - 6px); opacity: 0.3; }
    }
    
    @keyframes line-fade {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; }
    }
    
    @keyframes text-fade {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; }
    }
    
    @keyframes server-pulse {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(64, 224, 208, 0.3);
        border-color: rgba(64, 224, 208, 0.6);
      }
      50% { 
        box-shadow: 0 0 30px rgba(64, 224, 208, 0.6);
        border-color: rgba(64, 224, 208, 0.9);
      }
    }

    @media (max-width: 768px) {
      .api-dashboard {
        width: 300px;
        right: 10px;
      }

      .architecture-panel {
        width: 280px;
        bottom: 10px;
        left: 10px;
      }

      .performance-monitor {
        width: 180px;
      }
      
      .api-call-text {
        font-size: 8px;
        
        .method {
          padding: 1px 4px;
        }
      }
    }
  `]
})
export class TechNerdOverlayComponent implements OnInit, OnDestroy {
  isActive = false;
  components: ComponentInfo[] = [];
  apiCalls: APICall[] = [];
  
  private subscriptions: Subscription[] = [];

  constructor(private techNerdService: TechNerdModeService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.techNerdService.techNerdMode$.subscribe(active => {
        this.isActive = active;
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

  trackApiCall(index: number, call: APICall): number {
    return call.timestamp;
  }

  getTimeAgo(timestamp: number): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  }

  getMemoryUsage(): number {
    return Math.floor(Math.random() * 50) + 20;
  }

  getLoadTime(): number {
    return Math.floor(Math.random() * 200) + 100;
  }

  getCPUUsage(): number {
    return Math.floor(Math.random() * 40) + 15;
  }

  getNetworkSpeed(): number {
    return Math.floor(Math.random() * 50) + 20;
  }

  getUptime(): string {
    const hours = Math.floor(Math.random() * 24) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}m`;
  }

  getTotalRequests(): number {
    return Math.floor(Math.random() * 500) + 100;
  }

  getSuccessRate(): number {
    return Math.floor(Math.random() * 10) + 90;
  }

  getAvgResponse(): number {
    return Math.floor(Math.random() * 100) + 50;
  }

  getRandomLatency(): number {
    return Math.floor(Math.random() * 200) + 50;
  }

  getRandomSize(): number {
    return Math.floor(Math.random() * 50) + 5;
  }


}
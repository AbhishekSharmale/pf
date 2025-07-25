import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ComponentInfo {
  name: string;
  type: 'Angular Component' | 'Service' | 'Directive';
  bundleSize: string;
  renderTime: number;
  position: { x: number; y: number };
}

export interface APICall {
  from: { x: number; y: number };
  to: { x: number; y: number };
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  status: 'pending' | 'success' | 'error';
  timestamp: number;
  component?: string;
  response?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TechNerdModeService {
  private techNerdModeSubject = new BehaviorSubject<boolean>(false);
  public techNerdMode$ = this.techNerdModeSubject.asObservable();

  private componentsSubject = new BehaviorSubject<ComponentInfo[]>([]);
  public components$ = this.componentsSubject.asObservable();

  private apiCallsSubject = new BehaviorSubject<APICall[]>([]);
  public apiCalls$ = this.apiCallsSubject.asObservable();

  constructor() {
    this.initializeComponents();
  }

  toggleTechNerdMode(): void {
    const current = this.techNerdModeSubject.value;
    this.techNerdModeSubject.next(!current);
    
    if (!current) {
      this.startAPICallSimulation();
    }
  }

  private initializeComponents(): void {
    const components: ComponentInfo[] = [
      {
        name: 'NavigationComponent',
        type: 'Angular Component',
        bundleSize: '12.3 KB',
        renderTime: 2.1,
        position: { x: 50, y: 10 }
      },
      {
        name: 'HeroComponent', 
        type: 'Angular Component',
        bundleSize: '18.7 KB',
        renderTime: 3.4,
        position: { x: 50, y: 25 }
      },
      {
        name: 'ProjectsComponent',
        type: 'Angular Component', 
        bundleSize: '24.1 KB',
        renderTime: 4.2,
        position: { x: 50, y: 50 }
      },
      {
        name: 'AboutComponent',
        type: 'Angular Component',
        bundleSize: '16.8 KB', 
        renderTime: 2.8,
        position: { x: 50, y: 75 }
      }
    ];
    
    this.componentsSubject.next(components);
  }

  private startAPICallSimulation(): void {
    const apiFlows = [
      {
        component: 'HeroComponent',
        position: { x: 20, y: 25 },
        endpoint: '/api/profile',
        method: 'GET' as const,
        response: '{ name, role, status }'
      },
      {
        component: 'ProjectsComponent', 
        position: { x: 15, y: 50 },
        endpoint: '/api/projects',
        method: 'GET' as const,
        response: '{ projects[], tech[] }'
      },
      {
        component: 'AboutComponent',
        position: { x: 25, y: 75 },
        endpoint: '/api/experience',
        method: 'GET' as const,
        response: '{ timeline[], skills[] }'
      },
      {
        component: 'NavigationComponent',
        position: { x: 50, y: 10 },
        endpoint: '/api/analytics',
        method: 'POST' as const,
        response: '{ tracked: true }'
      }
    ];

    const serverPosition = { x: 85, y: 45 };

    setInterval(() => {
      if (this.techNerdModeSubject.value) {
        const flow = apiFlows[Math.floor(Math.random() * apiFlows.length)];
        
        const call: APICall = {
          from: flow.position,
          to: serverPosition,
          method: flow.method,
          endpoint: flow.endpoint,
          status: 'pending',
          timestamp: Date.now(),
          component: flow.component,
          response: flow.response
        };

        setTimeout(() => {
          call.status = Math.random() > 0.05 ? 'success' : 'error';
          this.updateAPICall(call);
        }, 800);

        this.addAPICall(call);
      }
    }, 2500);
  }

  private addAPICall(call: APICall): void {
    const current = this.apiCallsSubject.value;
    this.apiCallsSubject.next([...current, call]);
    
    // Remove after 5 seconds
    setTimeout(() => {
      this.removeAPICall(call);
    }, 5000);
  }

  private updateAPICall(call: APICall): void {
    const current = this.apiCallsSubject.value;
    const index = current.findIndex(c => c.timestamp === call.timestamp);
    if (index !== -1) {
      current[index] = call;
      this.apiCallsSubject.next([...current]);
    }
  }

  private removeAPICall(call: APICall): void {
    const current = this.apiCallsSubject.value;
    this.apiCallsSubject.next(current.filter(c => c.timestamp !== call.timestamp));
  }
}
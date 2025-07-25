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
    const endpoints = [
      '/api/projects',
      '/api/profile', 
      '/api/skills',
      '/api/experience'
    ];

    setInterval(() => {
      if (this.techNerdModeSubject.value) {
        const call: APICall = {
          from: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
          to: { x: 90, y: 50 },
          method: ['GET', 'POST'][Math.floor(Math.random() * 2)] as 'GET' | 'POST',
          endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
          status: 'pending',
          timestamp: Date.now()
        };

        setTimeout(() => {
          call.status = Math.random() > 0.1 ? 'success' : 'error';
          this.updateAPICall(call);
        }, 1000);

        this.addAPICall(call);
      }
    }, 3000);
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
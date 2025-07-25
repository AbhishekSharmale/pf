import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

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

  constructor(private apiService: ApiService) {
    this.initializeComponents();
  }

  toggleTechNerdMode(): void {
    const current = this.techNerdModeSubject.value;
    this.techNerdModeSubject.next(!current);
  }

  // Track real user interactions with actual API calls
  trackAPICall(component: string, endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'): void {
    if (!this.techNerdModeSubject.value) return;

    const componentPositions: { [key: string]: { x: number; y: number } } = {
      'NavigationComponent': { x: 10, y: 5 },
      'HeroComponent': { x: 10, y: 20 },
      'ProjectsComponent': { x: 10, y: 40 },
      'AboutComponent': { x: 10, y: 60 },
      'BlogComponent': { x: 10, y: 80 }
    };

    const call: APICall = {
      from: componentPositions[component] || { x: 10, y: 50 },
      to: { x: 95, y: 50 },
      method,
      endpoint,
      status: 'pending',
      timestamp: Date.now(),
      component,
      response: ''
    };

    this.addAPICall(call);

    // Make real API call for analytics
    if (endpoint === '/api/analytics') {
      this.apiService.trackEvent('page_view', component).subscribe({
        next: (response) => {
          call.status = 'success';
          call.response = JSON.stringify(response);
          this.updateAPICall(call);
        },
        error: () => {
          call.status = 'error';
          call.response = '{ error: "Request failed" }';
          this.updateAPICall(call);
        }
      });
    } else {
      // Simulate other endpoints
      setTimeout(() => {
        call.status = 'success';
        call.response = this.getSimulatedResponse(endpoint);
        this.updateAPICall(call);
      }, 600);
    }
  }

  private getSimulatedResponse(endpoint: string): string {
    const responses: { [key: string]: string } = {
      '/api/projects': '{ projects: [6], status: "success" }',
      '/api/profile': '{ name: "Abhishek", role: "DevOps" }',
      '/api/experience': '{ timeline: [3], skills: [10] }',
      '/api/blog': '{ posts: [3], featured: [2] }'
    };
    return responses[endpoint] || '{ data: "loaded" }';
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

  // Remove random simulation - only track real interactions

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
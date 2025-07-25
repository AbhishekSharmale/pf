import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  // Contact form submission
  submitContact(data: { name: string; email: string; message: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact`, data);
  }

  // Analytics tracking
  trackEvent(event: string, page: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/analytics`, {
      event,
      page,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  }

  // Get analytics data
  getAnalytics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics`);
  }

  // Get server metrics
  getMetrics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/metrics`);
  }
}
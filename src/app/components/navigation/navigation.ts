import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { filter } from 'rxjs/operators';
import { TechNerdModeService } from '../../services/tech-nerd-mode.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class NavigationComponent implements OnInit {
  @ViewChild('progressBar', { static: true }) progressBar!: ElementRef;
  
  isMenuOpen = false;
  currentRoute = '';
  isDarkTheme = true;
  isTechNerdMode = false;
  
  navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/projects', label: 'Projects', icon: '🚀' },
    { path: '/about', label: 'About', icon: '🤖' },
    { path: '/blog', label: 'Blog', icon: '📝' }
  ];

  constructor(
    private router: Router,
    private techNerdService: TechNerdModeService
  ) {}

  ngOnInit() {
    this.initScrollProgress();
    this.trackRouteChanges();
    this.initTheme();
    
    this.techNerdService.techNerdMode$.subscribe(mode => {
      this.isTechNerdMode = mode;
      document.body.classList.toggle('tech-nerd-mode', mode);
    });
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme !== 'light';
    document.body.classList.toggle('light-theme', !this.isDarkTheme);
  }

  private initScrollProgress() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      gsap.to(this.progressBar.nativeElement, {
        width: `${scrollPercent}%`,
        duration: 0.1
      });
    });
  }

  private trackRouteChanges() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    const menuItems = document.querySelectorAll('.nav-item');
    
    if (this.isMenuOpen) {
      gsap.fromTo(menuItems, 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.1 }
      );
    }
  }

  navigateTo(path: string) {
    // Track API call in Tech Nerd Mode
    const routeToAPI: { [key: string]: string } = {
      '/': '/api/profile',
      '/projects': '/api/projects', 
      '/about': '/api/experience',
      '/blog': '/api/blog'
    };

    if (routeToAPI[path]) {
      this.techNerdService.trackAPICall('NavigationComponent', routeToAPI[path]);
    }

    this.router.navigate([path]);
    this.isMenuOpen = false;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('light-theme', !this.isDarkTheme);
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  toggleTechNerdMode() {
    this.techNerdService.toggleTechNerdMode();
  }

  onNavItemHover(event: MouseEvent, enter: boolean) {
    const target = event.target as HTMLElement;
    
    if (enter) {
      gsap.to(target, {
        scale: 1.1,
        duration: 0.2,
        ease: 'back.out(1.7)'
      });
    } else {
      gsap.to(target, {
        scale: 1,
        duration: 0.2
      });
    }
  }
}
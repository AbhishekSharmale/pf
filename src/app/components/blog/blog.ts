import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  emoji: string;
  tags: string[];
  featured: boolean;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class BlogComponent {
  posts: BlogPost[] = [
    {
      id: 1,
      title: 'How I Built a 73-Stage Pipeline and Regret Nothing',
      excerpt: 'The journey from simple CI/CD to enterprise-grade overengineering. Featuring approval gates, security scans, and enough complexity to make your head spin.',
      date: '2024-01-15',
      readTime: '8 min',
      emoji: '🚀',
      tags: ['CI/CD', 'Azure DevOps', 'Overengineering'],
      featured: true
    },
    {
      id: 2,
      title: 'Kubernetes at Home: Because Why Not?',
      excerpt: 'Why I replaced my simple Docker setup with a 6-node Kubernetes cluster to host my grocery list. Spoiler: It was worth every sleepless night.',
      date: '2024-01-10',
      readTime: '6 min',
      emoji: '⚙️',
      tags: ['Kubernetes', 'Home Lab', 'Infrastructure'],
      featured: false
    },
    {
      id: 3,
      title: 'Monitoring Everything: A Grafana Love Story',
      excerpt: 'How I went from basic server monitoring to tracking my coffee machine\'s performance. Now I have 47 dashboards and zero regrets.',
      date: '2024-01-05',
      readTime: '5 min',
      emoji: '📊',
      tags: ['Monitoring', 'Grafana', 'Observability'],
      featured: true
    }
  ];

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
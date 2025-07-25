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
      title: 'Why I Talk to My Rubber Duck More Than My Colleagues',
      excerpt: 'A deep dive into the psychology of rubber duck debugging and why my duck gives better code reviews than most humans.',
      date: '2024-01-15',
      readTime: '5 min',
      emoji: '🦆',
      tags: ['Debugging', 'Psychology', 'Humor'],
      featured: true
    },
    {
      id: 2,
      title: 'The Art of Turning Bugs into Features',
      excerpt: 'Master the ancient art of creative problem-solving, or: How I learned to stop worrying and love my mistakes.',
      date: '2024-01-10',
      readTime: '7 min',
      emoji: '🐛',
      tags: ['Development', 'Philosophy', 'Comedy'],
      featured: false
    },
    {
      id: 3,
      title: 'Coffee-Driven Development: A Scientific Approach',
      excerpt: 'Analyzing the correlation between caffeine intake and code quality. Spoiler: More coffee = Better code (mostly).',
      date: '2024-01-05',
      readTime: '4 min',
      emoji: '☕',
      tags: ['Productivity', 'Science', 'Coffee'],
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
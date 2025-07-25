import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-panel">
      <div class="admin-header">
        <h2>🔧 Content Management</h2>
        <div class="auth-section" *ngIf="!isAuthenticated">
          <input type="password" [(ngModel)]="password" placeholder="Admin Password" (keyup.enter)="authenticate()">
          <button (click)="authenticate()">Login</button>
        </div>
      </div>

      <div *ngIf="isAuthenticated" class="admin-content">
        <div class="tabs">
          <button [class.active]="activeTab === 'projects'" (click)="activeTab = 'projects'">Projects</button>
          <button [class.active]="activeTab === 'blogs'" (click)="activeTab = 'blogs'">Blogs</button>
        </div>

        <!-- Projects Management -->
        <div *ngIf="activeTab === 'projects'" class="tab-content">
          <div class="add-form">
            <h3>Add New Project</h3>
            <input [(ngModel)]="newProject.title" placeholder="Project Title">
            <textarea [(ngModel)]="newProject.description" placeholder="Description"></textarea>
            <input [(ngModel)]="newProject.tech" placeholder="Technologies (comma separated)">
            <input [(ngModel)]="newProject.githubUrl" placeholder="GitHub URL">
            <input [(ngModel)]="newProject.demoUrl" placeholder="Demo URL">
            <button (click)="addProject()">Add Project</button>
          </div>
          
          <div class="items-list">
            <div *ngFor="let project of projects" class="item-card">
              <h4>{{ project.title }}</h4>
              <p>{{ project.description }}</p>
              <button (click)="deleteProject(project.id)">Delete</button>
            </div>
          </div>
        </div>

        <!-- Blogs Management -->
        <div *ngIf="activeTab === 'blogs'" class="tab-content">
          <div class="add-form">
            <h3>Add New Blog Post</h3>
            <input [(ngModel)]="newBlog.title" placeholder="Blog Title">
            <textarea [(ngModel)]="newBlog.content" placeholder="Blog Content"></textarea>
            <input [(ngModel)]="newBlog.tags" placeholder="Tags (comma separated)">
            <button (click)="addBlog()">Add Blog</button>
          </div>
          
          <div class="items-list">
            <div *ngFor="let blog of blogs" class="item-card">
              <h4>{{ blog.title }}</h4>
              <p>{{ blog.content.substring(0, 100) }}...</p>
              <button (click)="deleteBlog(blog.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-panel {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
      background: var(--bg-secondary);
      border-radius: 12px;
    }

    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .auth-section {
      display: flex;
      gap: 10px;
    }

    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .tabs button {
      padding: 10px 20px;
      border: none;
      background: var(--bg-tertiary);
      color: var(--text-primary);
      border-radius: 6px;
      cursor: pointer;
    }

    .tabs button.active {
      background: var(--primary);
      color: white;
    }

    .add-form {
      background: var(--bg-tertiary);
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .add-form input, .add-form textarea {
      width: 100%;
      padding: 10px;
      margin: 5px 0;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background: var(--bg-primary);
      color: var(--text-primary);
    }

    .add-form button {
      background: var(--primary);
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .items-list {
      display: grid;
      gap: 15px;
    }

    .item-card {
      background: var(--bg-tertiary);
      padding: 15px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }

    .item-card button {
      background: var(--danger);
      color: white;
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
  `]
})
export class AdminComponent {
  isAuthenticated = false;
  password = '';
  activeTab = 'projects';
  
  projects: any[] = [];
  blogs: any[] = [];
  
  newProject = { title: '', description: '', tech: '', githubUrl: '', demoUrl: '' };
  newBlog = { title: '', content: '', tags: '' };

  constructor(private http: HttpClient) {}

  authenticate() {
    if (this.password === 'admin123') {
      this.isAuthenticated = true;
      this.loadData();
    }
  }

  loadData() {
    this.http.get('/api/admin?type=projects&action=get', {
      headers: { Authorization: 'Bearer admin123' }
    }).subscribe((data: any) => this.projects = data);

    this.http.get('/api/admin?type=blogs&action=get', {
      headers: { Authorization: 'Bearer admin123' }
    }).subscribe((data: any) => this.blogs = data);
  }

  addProject() {
    const project = {
      ...this.newProject,
      tech: this.newProject.tech.split(',').map(t => t.trim())
    };

    this.http.post('/api/admin?type=projects&action=add', project, {
      headers: { Authorization: 'Bearer admin123' }
    }).subscribe(() => {
      this.loadData();
      this.newProject = { title: '', description: '', tech: '', githubUrl: '', demoUrl: '' };
    });
  }

  addBlog() {
    const blog = {
      ...this.newBlog,
      tags: this.newBlog.tags.split(',').map(t => t.trim())
    };

    this.http.post('/api/admin?type=blogs&action=add', blog, {
      headers: { Authorization: 'Bearer admin123' }
    }).subscribe(() => {
      this.loadData();
      this.newBlog = { title: '', content: '', tags: '' };
    });
  }

  deleteProject(id: number) {
    this.http.delete(`/api/admin?type=projects&action=delete&id=${id}`, {
      headers: { Authorization: 'Bearer admin123' }
    }).subscribe(() => this.loadData());
  }

  deleteBlog(id: number) {
    this.http.delete(`/api/admin?type=blogs&action=delete&id=${id}`, {
      headers: { Authorization: 'Bearer admin123' }
    }).subscribe(() => this.loadData());
  }
}
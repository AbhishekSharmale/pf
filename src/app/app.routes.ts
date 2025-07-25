import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero';
import { ProjectsComponent } from './components/projects/projects';
import { AboutComponent } from './components/about/about';
import { BlogComponent } from './components/blog/blog';
import { NotFoundComponent } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HeroComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];
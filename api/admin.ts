import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory storage (use database in production)
let projects: any[] = [];
let blogs: any[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { type, action } = req.query;

  // Simple auth check (use proper auth in production)
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer admin123') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (type === 'projects') {
      switch (action) {
        case 'get':
          return res.status(200).json(projects);
        
        case 'add':
          const newProject = { ...req.body, id: Date.now() };
          projects.push(newProject);
          return res.status(201).json(newProject);
        
        case 'update':
          const { id } = req.body;
          const projectIndex = projects.findIndex(p => p.id === id);
          if (projectIndex !== -1) {
            projects[projectIndex] = { ...projects[projectIndex], ...req.body };
            return res.status(200).json(projects[projectIndex]);
          }
          return res.status(404).json({ error: 'Project not found' });
        
        case 'delete':
          const deleteId = parseInt(req.query.id as string);
          projects = projects.filter(p => p.id !== deleteId);
          return res.status(200).json({ success: true });
      }
    }

    if (type === 'blogs') {
      switch (action) {
        case 'get':
          return res.status(200).json(blogs);
        
        case 'add':
          const newBlog = { ...req.body, id: Date.now(), createdAt: new Date().toISOString() };
          blogs.push(newBlog);
          return res.status(201).json(newBlog);
        
        case 'update':
          const { id } = req.body;
          const blogIndex = blogs.findIndex(b => b.id === id);
          if (blogIndex !== -1) {
            blogs[blogIndex] = { ...blogs[blogIndex], ...req.body };
            return res.status(200).json(blogs[blogIndex]);
          }
          return res.status(404).json({ error: 'Blog not found' });
        
        case 'delete':
          const deleteId = parseInt(req.query.id as string);
          blogs = blogs.filter(b => b.id !== deleteId);
          return res.status(200).json({ success: true });
      }
    }

    return res.status(400).json({ error: 'Invalid request' });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
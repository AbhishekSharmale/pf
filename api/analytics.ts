import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    // Track analytics event
    const { event, page, userAgent } = req.body;
    console.log('Analytics:', { event, page, userAgent, timestamp: new Date() });
    
    return res.status(200).json({ tracked: true, timestamp: new Date().toISOString() });
  }

  if (req.method === 'GET') {
    // Return analytics data
    return res.status(200).json({
      visitors: Math.floor(Math.random() * 1000) + 500,
      pageViews: Math.floor(Math.random() * 2000) + 1000,
      techNerdActivations: Math.floor(Math.random() * 200) + 50,
      avgSessionTime: Math.floor(Math.random() * 300) + 120,
      topPages: [
        { page: '/projects', views: Math.floor(Math.random() * 500) + 200 },
        { page: '/', views: Math.floor(Math.random() * 400) + 150 },
        { page: '/about', views: Math.floor(Math.random() * 300) + 100 }
      ],
      timestamp: new Date().toISOString()
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
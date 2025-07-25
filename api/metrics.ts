import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simulate server metrics
  const metrics = {
    server: {
      cpu: Math.floor(Math.random() * 30) + 10,
      memory: Math.floor(Math.random() * 40) + 20,
      disk: Math.floor(Math.random() * 50) + 15,
      uptime: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400),
    },
    network: {
      requests: Math.floor(Math.random() * 1000) + 500,
      successRate: Math.floor(Math.random() * 10) + 90,
      avgResponseTime: Math.floor(Math.random() * 100) + 50,
      bandwidth: Math.floor(Math.random() * 500) + 100,
    },
    application: {
      activeUsers: Math.floor(Math.random() * 50) + 10,
      techNerdSessions: Math.floor(Math.random() * 20) + 5,
      errorRate: Math.random() * 2,
      cacheHitRate: Math.floor(Math.random() * 20) + 80,
    },
    timestamp: new Date().toISOString()
  };

  return res.status(200).json(metrics);
}
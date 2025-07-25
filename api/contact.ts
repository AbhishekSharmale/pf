import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    console.log('Contact:', { name, email, message, timestamp: new Date() });

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9)
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
import clientPromise from '../../../lib/mongodb';
import { getUserFromRequest } from '../../../lib/auth';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return createGreeting(req, res);
  } else if (req.method === 'GET') {
    return getGreetings(req, res);
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}

async function createGreeting(req, res) {
  try {
    const user = getUserFromRequest(req);
    
    const { templateId, customMessage, recipientName, category } = req.body;

    if (!templateId || !category) {
      return res.status(400).json({ message: 'Template and category are required' });
    }

    const client = await clientPromise;
    const db = client.db('mywish');
    
    const shareId = nanoid(10); // Generate unique share ID
    
    const greeting = {
      shareId,
      templateId,
      category,
      customMessage,
      recipientName,
      createdBy: user?.userId || null,
      createdAt: new Date(),
      views: 0
    };

    const result = await db.collection('greetings').insertOne(greeting);

    res.status(201).json({
      message: 'Greeting created successfully',
      greeting: {
        id: result.insertedId,
        shareId,
        shareUrl: `${process.env.NEXT_PUBLIC_APP_URL}/view/${shareId}`
      }
    });
  } catch (error) {
    console.error('Create greeting error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getGreetings(req, res) {
  try {
    const user = getUserFromRequest(req);
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const client = await clientPromise;
    const db = client.db('mywish');
    
    const greetings = await db.collection('greetings')
      .find({ createdBy: user.userId })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({ greetings });
  } catch (error) {
    console.error('Get greetings error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
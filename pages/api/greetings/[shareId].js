import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { shareId } = req.query;

    if (!shareId) {
      return res.status(400).json({ message: 'Share ID is required' });
    }

    const client = await clientPromise;
    const db = client.db('mywish');
    
    const greeting = await db.collection('greetings').findOne({ shareId });

    if (!greeting) {
      return res.status(404).json({ message: 'Greeting not found' });
    }

    // Increment view count
    await db.collection('greetings').updateOne(
      { shareId },
      { $inc: { views: 1 } }
    );

    res.status(200).json({ greeting });
  } catch (error) {
    console.error('Get greeting error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
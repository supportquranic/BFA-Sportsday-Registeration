const { connectToDatabase } = require('./_db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const record = req.body;
    if (!record || !record.name || !record.roll) {
      return res.status(400).json({ error: 'Missing required registration fields' });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('registrations');

    record.createdAt = new Date();

    // Upsert by roll + activity (prevent duplicate registration in same activity)
    await collection.updateOne(
      { roll: record.roll, activity: record.activity },
      { $set: record },
      { upsert: true }
    );

    return res.status(200).json({ success: true, message: 'Registration saved to MongoDB', record });
  } catch (error) {
    console.error('MongoDB register error:', error);
    return res.status(500).json({ error: error.message || 'Database connection error' });
  }
};

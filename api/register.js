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
    const payload = req.body;
    if (!payload) {
      return res.status(400).json({ error: 'Missing request body' });
    }

    const items = Array.isArray(payload) ? payload : [payload];
    if (items.length === 0 || !items[0].name || !items[0].roll) {
      return res.status(400).json({ error: 'Missing required registration fields' });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('registrations');

    for (const record of items) {
      if (record && record.name && record.roll) {
        if (!record.createdAt) record.createdAt = new Date();
        await collection.updateOne(
          { roll: record.roll, activity: record.activity },
          { $set: record },
          { upsert: true }
        );
      }
    }

    return res.status(200).json({ success: true, count: items.length, message: 'Registrations synced to MongoDB' });
  } catch (error) {
    console.error('MongoDB register error:', error);
    return res.status(500).json({ error: error.message || 'Database connection error' });
  }
};


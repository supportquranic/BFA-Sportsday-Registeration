const { connectToDatabase } = require('./_db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('registrations');

    if (req.method === 'GET') {
      const records = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json({
        success: true,
        count: records.length,
        registrations: records
      });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Missing id query parameter' });
      }

      await collection.deleteOne({ $or: [{ id: id }, { roll: id }] });
      return res.status(200).json({ success: true, message: 'Record deleted' });
    }

    if (req.method === 'POST') {
      const { action } = req.body || {};
      if (action === 'clear') {
        await collection.deleteMany({});
        return res.status(200).json({ success: true, message: 'All registrations cleared' });
      }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('MongoDB records error:', error);
    return res.status(500).json({ error: error.message || 'Database error' });
  }
};


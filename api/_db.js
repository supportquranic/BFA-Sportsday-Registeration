const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://mabrix94_db_user:L1OwlFHGhuis4l7J@cluster0.mlj5n2v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (!uri) {
    throw new Error('MONGODB_URI is not defined.');
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();
  const db = client.db('bfa_sports_fest_2026');

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

module.exports = { connectToDatabase };


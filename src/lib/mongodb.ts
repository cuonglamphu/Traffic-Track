import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 60000,
  connectTimeoutMS: 5000,
};

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI, options);
  await client.connect();
  const db = client.db('seatcount');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default connectToDatabase;
import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb';

let client: MongoClient;
let cachedCount: number | null = null;
const CACHE_DURATION = 60 * 1000; 
let lastCacheTime = 0;

interface VisitorDoc {
  _id: string;
  count: number;
}

async function getMongoClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
  }
  return client;
}

// Helper function to read/write visitor count
async function getVisitorCount() {
  const now = Date.now();
  
  if (cachedCount !== null && (now - lastCacheTime) < CACHE_DURATION) {
    return cachedCount;
  }

  const client = await getMongoClient();
  const database = client.db('seatcount');
  const collection = database.collection<VisitorDoc>('visitors');

  const visitorDoc = await collection.findOne({ _id: 'visitor_count' });
  
  if (!visitorDoc) {
    await collection.insertOne({ _id: 'visitor_count', count: 0 });
    cachedCount = 0;
  } else {
    cachedCount = visitorDoc.count;
  }
  
  lastCacheTime = now;
  return cachedCount;
}

// GET endpoint to retrieve current count
export async function GET() {
  try {
    const count = await getVisitorCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor count' },
      { status: 500 }
    );
  }
}

// POST endpoint to increment count
export async function POST() {
  try {
    const client = await getMongoClient();
    const database = client.db('seatcount');
    const collection = database.collection<VisitorDoc>('visitors');

    // Increment count by 1 and return new document
    const result = await collection.findOneAndUpdate(
      { _id: 'visitor_count' },
      { $inc: { count: 1 } },
      { 
        upsert: true,
        returnDocument: 'after'
      }
    );

    if (!result) {
      throw new Error('Failed to update visitor count');
    }

    const newCount = result.count;
    return NextResponse.json({ count: newCount });

  } catch (error) {
    console.error('Error updating visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to update visitor count' },
      { status: 500 }
    );
  }
}
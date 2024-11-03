import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';

interface VisitorDoc {
  _id: string;
  count: number;
}

// Cache configuration
let cachedCount: number | null = null;
const CACHE_DURATION = 60 * 1000;
let lastCacheTime = 0;

async function getVisitorCount() {
  const now = Date.now();
  
  if (cachedCount !== null && (now - lastCacheTime) < CACHE_DURATION) {
    return cachedCount;
  }
  const { db } = await connectToDatabase();
  const collection = db.collection<VisitorDoc>('visitors');
  const visitorDoc = await collection.findOne({ _id: 'visitor_count' }) as VisitorDoc | null;
  
  if (!visitorDoc) {
    await collection.insertOne({ _id: 'visitor_count', count: 0 } as VisitorDoc);
    cachedCount = 0;
  } else {
    cachedCount = visitorDoc.count;
  }
  
  lastCacheTime = now;
  return cachedCount;
}

export async function GET() {
  try {
    const startTime = performance.now();
    const count = await getVisitorCount();
    console.log(`Visitor count fetched in ${performance.now() - startTime}ms`);
    
    return NextResponse.json({ 
      success: true,
      count 
    });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor count' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const startTime = performance.now();
    const { db } = await connectToDatabase();
    const collection = db.collection<VisitorDoc>('visitors');
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

    // Update cache
    cachedCount = result.count;
    lastCacheTime = Date.now();

    console.log(`Visitor count updated in ${performance.now() - startTime}ms`);
    return NextResponse.json({ 
      success: true,
      count: result.count 
    });

  } catch (error) {
    console.error('Error updating visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to update visitor count' },
      { status: 500 }
    );
  }
}
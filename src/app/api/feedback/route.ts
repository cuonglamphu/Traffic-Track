import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb';

// Tốt hơn là tạo một singleton connection
let client: MongoClient;

async function getMongoClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
  }
  return client;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const client = await getMongoClient();
    
    const database = client.db('seatcount'); // hoặc tên database bạn muốn
    const collection = database.collection('feedback');

    const newFeedback = {
      ...data,
      timestamp: new Date().toISOString()
    };

    const result = await collection.insertOne(newFeedback);
    
    console.log('Feedback saved successfully with ID:', result.insertedId);
    return NextResponse.json({ 
      success: true, 
      data: { ...newFeedback, _id: result.insertedId } 
    });

  } catch (error) {
    console.error('Error in feedback API:', error);
    return NextResponse.json(
      { error: 'Failed to save feedback', details: error},
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await getMongoClient();
    const database = client.db('seatcount');
    const collection = database.collection('feedback');

    const feedbacks = await collection.find({})
      .sort({ timestamp: -1 }) // Sắp xếp theo thời gian mới nhất
      .limit(100) // Giới hạn số lượng kết quả
      .toArray();

    return NextResponse.json({ success: true, data: feedbacks });

  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback', details: error},
      { status: 500 }
    );
  }
}
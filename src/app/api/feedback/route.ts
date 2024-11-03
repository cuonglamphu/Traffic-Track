import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';

export async function POST(request: Request) {
  try {
    const startTime = performance.now();
    const { db } = await connectToDatabase();
    const collection = db.collection('feedback');

    const data = await request.json();
    if (!data.rating) {
      return NextResponse.json(
        { error: 'Rating is required' },
        { status: 400 }
      );
    }

    const newFeedback = {
      ...data,
      timestamp: new Date().toISOString()
    };

    const result = await collection.insertOne(newFeedback);
    console.log(`Feedback saved in ${performance.now() - startTime}ms`);
    
    return NextResponse.json({ 
      success: true, 
      data: { ...newFeedback, _id: result.insertedId } 
    });

  } catch (error) {
    console.error('Error in feedback API:', error);
    return NextResponse.json(
      { error: 'Failed to save feedback' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('feedback');

    const feedbacks = await collection.find({})
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ 
      success: true, 
      data: feedbacks 
    });

  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}
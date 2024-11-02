import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Use absolute path and ensure it's in a writable location
    const feedbackDir = path.join(process.cwd(), 'public', 'feedback');
    const feedbackFile = path.join(feedbackDir, 'feedback.json');

    // Create directory if it doesn't exist
    try {
      await fs.mkdir(feedbackDir, { recursive: true });
    } catch (err) {
      console.log('Directory exists or creation failed:', err);
    }

    // Read existing feedback (with better error handling)
    let existingFeedback = [];
    try {
      const fileContent = await fs.readFile(feedbackFile, 'utf8');
      existingFeedback = JSON.parse(fileContent);
    } catch (err) {
      // File doesn't exist yet, we'll create it
      console.log('Creating new feedback file', err);
    }

    // Add new feedback
    const newFeedback = {
      ...data,
      timestamp: new Date().toISOString()
    };
    existingFeedback.push(newFeedback);

    // Write to file
    await fs.writeFile(
      feedbackFile,
      JSON.stringify(existingFeedback, null, 2),
      'utf8'
    );

    console.log('Feedback saved successfully');  // Debug log
    return NextResponse.json({ success: true, data: newFeedback });

  } catch (error) {
    console.error('Error in feedback API:', error);  // Detailed error logging
    return NextResponse.json(
      { error: 'Failed to save feedback', details: error},
      { status: 500 }
    );
  }
}
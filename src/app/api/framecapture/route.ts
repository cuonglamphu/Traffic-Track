import { NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Generate unique filename for this capture
    const filename = `frame-${uuidv4()}.jpg`;
    const outputPath = join(process.cwd(), 'public', 'frames', filename);

    // Capture frame from RTSP stream using ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(url)
        .outputOptions([
          '-vframes 1', // Capture single frame
          '-update 1'   // Force update
        ])
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // Return public URL for the captured frame
    const frameUrl = `/frames/${filename}`;
    
    return NextResponse.json({
      frameUrl,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error capturing frame:', error);
    return NextResponse.json({ error: 'Failed to capture frame' }, { status: 500 });
  }
}
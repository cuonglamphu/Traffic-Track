import { Server } from 'socket.io';
import { NextResponse } from 'next/server';


// Store the Socket.IO server instance
let io: Server;

export async function GET() {
  if (!io) {
    // Initialize Socket.IO without creating a new HTTP server
    io = new Server({
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('subscribe', async ({ streamUrl }) => {
        console.log('Subscribing to:', streamUrl);
        
        const interval = setInterval(async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/framecapture?url=${encodeURIComponent(streamUrl)}`);
            const data = await response.json();
            
            if (data.frameUrl && !data.error) {
              const frameBuffer = await fetch(data.frameUrl).then(res => res.arrayBuffer());
              const base64Frame = Buffer.from(frameBuffer).toString('base64');
              socket.emit('frame', base64Frame);
            } else {
              console.error('Failed to capture frame:', data.error);
            }
          } catch (error) {
            console.error('Error fetching frame:', error);
          }
        }, 1000);

        socket.on('disconnect', () => {
          clearInterval(interval);
        });
      });

      socket.on('unsubscribe', ({ streamUrl }) => {
        console.log('Unsubscribing from:', streamUrl);
      });
    });

    // Start the Socket.IO server
    io.listen(3001); // Use a different port than your Next.js app
  }

  return NextResponse.json({ success: true });
}

export const POST = GET;
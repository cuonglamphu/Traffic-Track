const express = require("express");
const { createServer } = require("http");
const { Server, Socket } = require("socket.io");
const cors = require("cors");
const ffmpeg = require('fluent-ffmpeg');
const app = express();
const httpServer = createServer(app);

app.use(cors());

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket: typeof Socket) => {
    console.log("Client connected");

    socket.on("subscribe", ({ streamUrl }: { streamUrl: string }) => {
        console.log("Subscribing to:", streamUrl);

        try {
            const ffmpegProcess = ffmpeg(streamUrl)
                .inputOptions(['-rtsp_transport tcp'])
                .outputOptions(['-f image2pipe', '-vcodec mjpeg', '-q:v 5', '-vf fps=1/5,scale=320:240'])
                .on('end', () => {
                    console.log('Stream processing ended');
                })
                .on('error', (err: any) => {
                    console.error('Error processing stream:', err);
                })
                .pipe();

            ffmpegProcess.on('data', (chunk: any) => {
                console.log('Sending frame');
                socket.emit('frame', chunk.toString('base64'));
            });

            ffmpegProcess.on('close', () => {
                console.log('FFmpeg process closed');
            });

        } catch (error) {
            console.error("Error processing stream:", error);
        }
    });

    socket.on("unsubscribe", ({ streamUrl }: { streamUrl: string }) => {
        console.log("Unsubscribing from:", streamUrl);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});
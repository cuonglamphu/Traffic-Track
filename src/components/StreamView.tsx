'use client'

import { useEffect, useState } from "react"
import { io } from "socket.io-client"

interface StreamViewProps {
    streamUrl: string
    restaurantId: number
}

export function StreamView({ streamUrl, restaurantId }: StreamViewProps) {
    const [currentFrame, setCurrentFrame] = useState<string>(() => {
        // Retrieve the cached image for the specific restaurant
        return localStorage.getItem(`cachedFrame-${restaurantId}`) || ''
    })
    const [loading, setLoading] = useState<boolean>(!currentFrame)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        const socket = io('http://localhost:3001')

        socket.emit('subscribe', { streamUrl })

        socket.on('frame', (frameData: string) => {
            const frame = `data:image/jpeg;base64,${frameData}`
            console.log("Received frame data")
            setCurrentFrame(frame)
            // Update local storage with the new frame for the specific restaurant
            localStorage.setItem(`cachedFrame-${restaurantId}`, frame)
            setLoading(false)
        })

        return () => {
            socket.emit('unsubscribe', { streamUrl })
            socket.disconnect()
        }
    }, [streamUrl, restaurantId])

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <div>
            <div className="stream-container" onClick={openModal}>
                {loading ? (
                    <div className="skeleton spinner-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <img
                        src={currentFrame}
                        alt="Live stream capture"
                        className="stream-image pixelated"
                    />
                )}
            </div>

            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={currentFrame} alt="Full view" />
                </div>
            )}
        </div>
    )
} 
'use client'
import Image from 'next/image';
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
        <div 
            className="stream-view-container"
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal()}
            aria-label="Stream view container"
        >
            {loading ? (
                <div 
                    className="skeleton spinner-container" 
                    role="status"
                    aria-label="Loading spinner"
                >
                    <div className="spinner"></div>
                </div>
            ) : currentFrame ? (  // Only render Image when currentFrame exists
                <Image
                    src={currentFrame}
                    alt="Live stream capture"
                    width={320}
                    height={240}
                    className="stream-image pixelated"
                />
            ) : null}

            {isModalOpen && currentFrame && (  // Only show modal when we have a frame
                <div 
                    className="modal-overlay"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="modal-content">
                        <button 
                            className="close-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <Image 
                            className="modal-image" 
                            src={currentFrame}
                            alt="Full view"
                            width={800}
                            height={600}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
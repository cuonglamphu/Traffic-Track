'use client'
import { useState } from 'react'
import { PixelButton } from './PixelButton'

interface FeedbackFormProps {
  restaurantId: number
  onClose: () => void
  onSubmit: () => void
  isStarButton?: boolean
}

export function FeedbackForm({ restaurantId, onClose, isStarButton = false }: FeedbackFormProps) {
  const [showThanks, setShowThanks] = useState(false)

  const handleClose = () => {
    setShowThanks(true)
    if (!isStarButton) {
      localStorage.setItem(`feedback_${restaurantId}`, Date.now().toString())
    }
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (showThanks) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="relative bg-white rounded-[4px] w-full max-w-[400px] p-8
                      border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <h2 className="font-pixel text-2xl mb-4">Thank You!</h2>
            <p className="font-pixel text-lg">We appreciate your feedback!</p>
          </div>
          <div className="absolute top-2 right-2">
            <PixelButton onClick={handleClose}>✕</PixelButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-[4px] w-full max-w-[640px] h-[90vh] flex flex-col
                    border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-[#E0E0E0] p-2 border-b-4 border-black flex justify-between items-center">
          <span className="font-pixel text-lg">Feedback Form</span>
          <PixelButton
            onClick={handleClose}
          >
            ✕
          </PixelButton>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe 
            title="Feedback Form"
            src="https://docs.google.com/forms/d/e/1FAIpQLSdqA9ab6Es-nWtwObQEa6wYsicJdDrlBkfelfDfCOTITLqFvw/viewform?embedded=true" 
            className="w-full h-full"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  )
}
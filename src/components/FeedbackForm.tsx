'use client'
import { useState } from 'react'
import { PixelButton } from './PixelButton'

interface FeedbackFormProps {
  restaurantId: number
  onClose: () => void
  onSubmit: () => void
}

export function FeedbackForm({ restaurantId, onClose, onSubmit }: FeedbackFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const feedbackData = Object.fromEntries(formData.entries())

    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantId, feedbackData }),
    })

    onSubmit()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#9bbc0f] p-6 border-4 border-[#306230] max-w-md w-full relative">
        <div className="absolute top-2 right-2">
          <PixelButton onClick={onClose}>×</PixelButton>
        </div>
        <h2 className="text-2xl font-bold text-[#0f380f] mb-4 pixel-text">Your Feedback</h2>
        <form onSubmit={handleSubmit}>
          {['How was the food?', 'How was the service?', 'Would you recommend us?'].map((question, index) => (
            <div key={index} className="mb-4">
              <label className="block text-[#0f380f] mb-2 pixel-text">{question}</label>
              <input 
                name={`question-${index}`} 
                type="text" 
                className="w-full px-3 py-2 bg-[#8bac0f] border-2 border-[#306230] text-[#0f380f]" 
                required 
              />
            </div>
          ))}
          <PixelButton>Submit Feedback</PixelButton>
        </form>
      </div>
    </div>
  )
} 
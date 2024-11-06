'use client'

import Image from "next/image"
import { useState } from "react"
import { PixelButton } from "./PixelButton"
import { FeedbackForm } from "./FeedbackForm"
import { Restaurant } from "@/types/restaurant"
import { FeedbackButton } from './FeedbackButton'

interface MenuViewProps {
  restaurant: Restaurant
  onBack: () => void
  onFeedbackClose: () => void
  onFeedbackSubmit: () => void
  showThankYou: boolean
}

export function MenuView({ 
  restaurant, 
  onBack,
  onFeedbackClose,
  onFeedbackSubmit,
  showThankYou 
}: MenuViewProps) {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  
  return (
    <div
      className="min-h-screen bg-[#8bac0f] p-4 font-mono"
      role="main"
    >
      <FeedbackButton onClick={() => setShowFeedbackForm(true)} />
      
      {showFeedbackForm && (
        <FeedbackForm
          restaurantId={restaurant.id}
          onClose={() => setShowFeedbackForm(false)}
          onSubmit={() => {
            setShowFeedbackForm(false)
            onFeedbackSubmit()
          }}
          isStarButton={true}
        />
      )}
      
      <div
        className="max-w-4xl mx-auto bg-[#9bbc0f] p-4 border-4 border-[#306230]"
      >
        <h1 className="text-4xl font-bold text-center text-[#0f380f] mb-8 pixel-text">
          {restaurant.name} Menu
        </h1>
        <button
          onClick={() => setIsMenuModalOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && setIsMenuModalOpen(true)}
          className="mb-8 cursor-pointer w-full"
          aria-label="Open menu image"
        >
          <Image
            src={restaurant.menu}
            alt="Restaurant menu"
            width={800}
            height={600}
            className="pixelated w-full h-auto"
          />
        </button>
        <div
          className="text-center"
        >
          <PixelButton onClick={onBack}>Go Back Now</PixelButton>
        </div>
      </div>

      {isMenuModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="modal"
        >
          <div
            className="modal-content-wrapper"
          >
            <button 
              className="close"
              onClick={() => setIsMenuModalOpen(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsMenuModalOpen(false)}
              aria-label="Close menu modal"
            >
              &times;
            </button>
            <Image 
              src={restaurant.menu}
              alt="Full view of menu"
              width={1200}
              height={900}
              className="modal-content"
            />
          </div>
        </div>
      )}

      {showThankYou && (
        <div
          role="dialog"
          aria-modal="true" 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            className="bg-[#9bbc0f] p-6 border-4 border-[#306230] max-w-md w-full text-center"
          >
            <h2 className="text-2xl font-bold text-[#0f380f] mb-4 pixel-text">
              Thank You!
            </h2>
            <p className="text-[#0f380f] mb-4 pixel-text">
              We appreciate your feedback.
            </p>
            <PixelButton onClick={() => onFeedbackClose()}>Close</PixelButton>
          </div>
        </div>
      )}
    </div>
  )
}
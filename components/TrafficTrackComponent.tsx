'use client'

import { useState } from "react"
import { Users } from "lucide-react"

export default function Component() {
  const [view, setView] = useState('main')
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const PixelButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-[#8bac0f] border-b-4 border-r-4 border-[#306230] text-[#0f380f] font-bold text-lg hover:bg-[#9bbc0f] active:border-b-2 active:border-r-2 active:translate-y-[2px] active:translate-x-[2px] transition-all"
    >
      {children}
    </button>
  )

  // Overlay components remain the same
  const FeedbackOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#9bbc0f] p-6 border-4 border-[#306230] max-w-md w-full">
        <h2 className="text-2xl font-bold text-[#0f380f] mb-4 pixel-text">Your Feedback</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          setFeedbackSubmitted(true)
        }}>
          {['How was the food?', 'How was the service?', 'Would you recommend us?'].map((question, index) => (
            <div key={index} className="mb-4">
              <label className="block text-[#0f380f] mb-2 pixel-text">{question}</label>
              <input type="text" className="w-full px-3 py-2 bg-[#8bac0f] border-2 border-[#306230] text-[#0f380f]" required />
            </div>
          ))}
          <PixelButton>Submit Feedback</PixelButton>
        </form>
      </div>
    </div>
  )

  const ThankYouOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#9bbc0f] p-6 border-4 border-[#306230] max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-[#0f380f] mb-4 pixel-text">Thank You!</h2>
        <p className="text-[#0f380f] mb-4 pixel-text">We appreciate your feedback.</p>
        <PixelButton onClick={() => {
          setFeedbackSubmitted(false)
          setShowFeedback(false)
        }}>Close</PixelButton>
      </div>
    </div>
  )

  if (view === 'menu') {
    return (
      <div className="min-h-screen bg-[#8bac0f] p-4 font-mono">
        <div className="max-w-4xl mx-auto bg-[#9bbc0f] p-4 border-4 border-[#306230]">
          <h1 className="text-4xl font-bold text-center text-[#0f380f] mb-8 pixel-text">Menu</h1>
          <div className="mb-8 border-4 border-[#306230] p-4">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-20 bg-[#8bac0f] animate-pulse" />
              ))}
            </div>
          </div>
          <div className="text-center">
            <PixelButton onClick={() => {
              setView('detail')
              setShowFeedback(true)
            }}>Go Back Now</PixelButton>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'detail') {
    return (
      <div className="min-h-screen bg-[#8bac0f] p-4 font-mono">
        <div className="max-w-4xl mx-auto bg-[#9bbc0f] p-4 border-4 border-[#306230]">
          <h1 className="text-4xl font-bold text-center text-[#0f380f] mb-8 pixel-text">Seat Availability</h1>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-4 border-[#306230] p-8 flex items-center justify-center">
                <Users className="w-12 h-12 text-[#306230]" />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 mb-8">
            <p className="text-lg text-[#0f380f]">Call us: XXXXXXXXX</p>
            <PixelButton onClick={() => setView('menu')}>See Menu</PixelButton>
          </div>
          <div className="bg-[#306230] text-[#8bac0f] p-4 mb-8 text-center">
            Book through Traffic Track for free delivery to The Myriad!
          </div>
          <div className="text-center">
            <PixelButton onClick={() => setView('main')}>Back to Main Page</PixelButton>
          </div>
        </div>
        {showFeedback && !feedbackSubmitted && <FeedbackOverlay />}
        {feedbackSubmitted && <ThankYouOverlay />}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#77B82F] font-mono">
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <div className="bg-[#9BC837] p-6 md:p-8 w-full max-w-2xl mx-auto border-4 border-[#558B2F]">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-4 md:mb-6 pixel-text text-center">
            TRAFFIC TRACK
          </h1>
          <p className="text-base md:text-lg text-[#2C5F2D] mb-3 md:mb-4 pixel-text text-center">
            Find the best local restaurants and avoid the crowds!
          </p>
          <p className="text-base md:text-lg text-[#2C5F2D] pixel-text text-center">
            FREE delivery under 20 minutes for Academic City restaurants.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-[#0f380f] mb-12 pixel-text">OUR PARTNERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center bg-[#9bbc0f] p-4 border-4 border-[#306230]">
              <h3 className="text-xl font-bold mb-4 text-[#0f380f] pixel-text">Pixel Cafe #{i}</h3>
              <div className="mb-4 border-4 border-[#306230] p-8 flex items-center justify-center">
                <Users className="w-12 h-12 text-[#306230]" />
              </div>
              <PixelButton onClick={() => setView('detail')}>SEE IT NOW!</PixelButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
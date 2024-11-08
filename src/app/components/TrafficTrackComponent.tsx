'use client'
import { useState, useEffect } from "react"
import { Header } from '@/components/Header'
import { RestaurantCard } from '@/components/RestaurantCard'
import { RestaurantDetail } from '@/components/RestaurantDetail'
import { MenuView } from '@/components/MenuView'
import { restaurants } from '../../data/restaurant'
import Flame from '@/components/Flame'
import { FeedbackForm } from '@/components/FeedbackForm'
import Image from 'next/image'

export default function Component() {
  const [view, setView] = useState('main')
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null)
  const [, setShowFeedback] = useState(false)
  const [, setFeedbackSubmitted] = useState(false)
  const [showThankYou, setShowThankYou] = useState<boolean>(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  useEffect(() => {
    const feedbackGiven = localStorage.getItem(`feedbackGiven-${selectedRestaurant}`)
    if (feedbackGiven) {
      setFeedbackSubmitted(true)
    }
  }, [selectedRestaurant])

  if (view === 'detail' && selectedRestaurant) {
    const restaurant = restaurants.find(r => r.id === selectedRestaurant)!
    return (
      <RestaurantDetail 
        restaurant={restaurant}
        onBack={() => setView('main')}
        onMenu={() => setView('menu')}
      />
    )
  }

  if (view === 'menu' && selectedRestaurant) {
    const restaurant = restaurants.find(r => r.id === selectedRestaurant)!
    return (
      <MenuView
        restaurant={restaurant}
        onBack={() => setView('detail')}
        onFeedbackClose={() => setShowFeedback(false)}
        onFeedbackSubmit={() => {
          setFeedbackSubmitted(true)
          setShowFeedback(false)
          setShowThankYou(true)
          setTimeout(() => setShowThankYou(false), 3000)
        }}
        showThankYou={showThankYou}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#8bac0f] font-mono relative">
      <Header />
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed right-4 bottom-4 z-50 w-16 h-16 hover:scale-110 transition-transform duration-200"
      >
        <Image
          src="/feedback.gif"
          alt="Feedback"
          width={100}
          height={100}
        />
      </button>

      {showFeedbackForm && (
        <FeedbackForm
          restaurantId={selectedRestaurant || 888}
          onClose={() => setShowFeedbackForm(false)}
          onSubmit={() => {
            setShowFeedbackForm(false)
            setShowThankYou(true)
            setTimeout(() => setShowThankYou(false), 3000)
          }}
          isStarButton={true}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-[#0f380f] mb-12 pixel-text">
          OUR PARTNERS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <Flame />
              </div>
              <RestaurantCard
                restaurant={restaurant}
                onSelect={(id) => {
                  setSelectedRestaurant(id)
                  setView('detail')
                }}
              />
            </div>
          ))}
        </div>
        
        <h3 className="text-4xl font-bold text-center text-[#0f380f] mb-12 pixel-text">
          HOW TO USE TRAFFIC INFORMATION 
        </h3>
        <div className="bg-[#0f380f] text-[#8bac0f] p-6 rounded-lg shadow-lg">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 flex-shrink-0">
              <iframe 
                title="Traffic Track"
                src="https://giphy.com/embed/RPkEMxKtvLbFB9xX42" 
                width="100%" 
                height="100%" 
                className="giphy-embed" 
                allowFullScreen
              />
            </div>
            <div className="flex-1">
              <p className="text-lg leading-relaxed pixel-text">
                For example, if you notice that a restaurant is crowded, your order may take longer to prepare, 
                and you might face a longer wait time when you arrive. In that case, you might choose to avoid 
                placing an order there. Conversely, if you see a restaurant is empty, they will likely prepare 
                your order more quickly, allowing you to enjoy less waiting time for your food or drinks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'
import { useState, useEffect } from "react"
import { Header } from '@/components/Header'
import { RestaurantCard } from '@/components/RestaurantCard'
import { RestaurantDetail } from '@/components/RestaurantDetail'
import { MenuView } from '@/components/MenuView'
import { restaurants } from '../../data/restaurant'
export default function Component() {
  const [view, setView] = useState('main')
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [showThankYou, setShowThankYou] = useState<boolean>(false)

  useEffect(() => {
    const feedbackGiven = localStorage.getItem(`feedbackGiven-${selectedRestaurant}`)
    if (feedbackGiven) {
      setFeedbackSubmitted(true)
    }

    let feedbackTimeout: NodeJS.Timeout

    if (view === 'detail' && !feedbackSubmitted) {
      feedbackTimeout = setTimeout(() => {
        setShowFeedback(true)
      }, 10000)
    }

    if (view === 'menu' && !feedbackSubmitted) {
      feedbackTimeout = setTimeout(() => {
        setShowFeedback(true)
      }, 5000)
    }

    return () => clearTimeout(feedbackTimeout)
  }, [view, selectedRestaurant, feedbackSubmitted])

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
        showFeedback={showFeedback}
        feedbackSubmitted={feedbackSubmitted}
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
    <div className="min-h-screen bg-[#8bac0f] font-mono">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-[#0f380f] mb-12 pixel-text">
          OUR PARTNERS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={(id) => {
                setSelectedRestaurant(id)
                setView('detail')
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
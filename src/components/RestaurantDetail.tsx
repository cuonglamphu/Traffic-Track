'use client'
import { PixelButton } from './PixelButton'
import { StreamView } from './StreamView'
import { Restaurant } from '@/types/restaurant'

interface RestaurantDetailProps {
  restaurant: Restaurant
  onBack: () => void
  onMenu: () => void
}

export function RestaurantDetail({ restaurant, onBack, onMenu }: RestaurantDetailProps) {
  return (
    <div className="min-h-screen bg-[#8bac0f] p-4 font-mono">
      <div className="max-w-4xl mx-auto bg-[#9bbc0f] p-4 border-4 border-[#306230]">
        <h1 className="text-4xl font-bold text-center text-[#0f380f] mb-8 pixel-text">
          Seat Availability
        </h1>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {restaurant.seats.map((streamUrl, i) => (
            <StreamView 
              key={i} 
              streamUrl={streamUrl} 
              restaurantId={restaurant.id} 
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 mb-8">
          <p className="text-lg text-[#0f380f]">Call us: {restaurant.phone}</p>
          <PixelButton onClick={onMenu}>See Menu</PixelButton>
        </div>
        <div className="bg-[#306230] text-[#8bac0f] p-4 mb-8 text-center">
          Book through Traffic Track for free delivery to The Myriad!
        </div>
        <div className="text-center">
          <PixelButton onClick={onBack}>Back to Main Page</PixelButton>
        </div>
      </div>
    </div>
  )
} 
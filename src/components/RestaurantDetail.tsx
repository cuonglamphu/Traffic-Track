'use client'
import { PixelButton } from './PixelButton'
import { Restaurant } from '@/types/restaurant'
import Image from 'next/image'

interface RestaurantDetailProps {
  restaurant: Restaurant
  onBack: () => void
  onMenu: () => void
}

export function RestaurantDetail({ restaurant, onBack, onMenu }: RestaurantDetailProps) {
  return (
    <div className="min-h-screen bg-[#8bac0f] px-8 py-4 font-mono">
      <div className="max-w-4xl mx-auto bg-[#9bbc0f] p-4 border-4 border-[#306230]">
        <h1 className="text-4xl font-bold text-center text-[#0f380f] mb-8 pixel-text">
          Seat Availability
        </h1>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto px-8">
            {restaurant.seats.map((streamUrl, i) => (
              <div key={i} className="flex flex-col items-center">
                <h3 className="text-[#0f380f] mb-2 pixel-text text-lg font-bold">
                  [{i + 1}]
                </h3>
                <div className="aspect-video w-full flex items-center justify-center">
                  <div 
                    dangerouslySetInnerHTML={{ __html: streamUrl }}
                    className="youtube-container flex justify-center items-center"
                  />
                </div>
              </div>
            ))}
            {restaurant.seats.length < 4 && (
              <div className="aspect-video w-full"></div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 mb-8">
          <p className="text-lg text-[#0f380f]">Call us: {restaurant.phone}</p>
          <PixelButton onClick={onMenu}>See Menu</PixelButton>
        </div>
        <div className="bg-[#306230] text-[#8bac0f] p-4 mb-8 text-center">
          Book through Traffic Track for free delivery to The Myriad!
        </div>
        <div className="text-center mb-8">
          <PixelButton onClick={onBack}>Back to Main Page</PixelButton>
        </div>

        <div className="mt-8 border-t-4 border-[#306230] pt-8">
          <h2 className="text-2xl font-bold text-center text-[#0f380f] mb-4 pixel-text">
            Restaurant Layout
          </h2>
          <div className="relative aspect-square w-full max-w-2xl mx-auto">
            <Image 
              src="/restaurant.gif"
              alt="Restaurant Layout Map"
              fill
              className="object-contain image-rendering-pixel"
              style={{
                imageRendering: 'pixelated'
              }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
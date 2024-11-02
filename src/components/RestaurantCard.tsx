'use client'
import Image from "next/image"
import { PixelButton } from './PixelButton'
import { Restaurant } from '../types/restaurant'

interface RestaurantCardProps {
  restaurant: Restaurant
  onSelect: (id: number) => void
}

export function RestaurantCard({ restaurant, onSelect }: RestaurantCardProps) {
  return (
    <div className="flex flex-col items-center bg-[#9bbc0f] p-4 border-4 border-[#306230]">
      <h3 className="text-xl font-bold mb-4 text-[#0f380f] pixel-text">{restaurant.name}</h3>
      <div className="mb-4 border-4 border-[#306230] overflow-hidden">
        <Image
          src={restaurant.image}
          alt={`${restaurant.name} view`}
          width={200}
          height={200}
          className="pixelated"
        />
      </div>
      <PixelButton onClick={() => onSelect(restaurant.id)}>SEE IT NOW!</PixelButton>
    </div>
  )
} 
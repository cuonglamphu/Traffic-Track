'use client'
import Image from "next/image"
import { VisitorCounter } from './VisitorCounter'

export function Header() {
  return (
    <div className="relative h-[400px] flex items-center justify-center text-center px-4">
      <Image
        src="/banner.gif"
        alt="Pixel art restaurant"
        fill
        className="object-cover pixelated"
        priority
      />
      <div className="absolute inset-0 bg-[#0f380f] opacity-50" />
      <div className="relative bg-[#9bbc0f] max-w-2xl mx-auto p-4 border-4 border-[#306230]">
        <h1 className="text-4xl font-bold text-[#0f380f] mb-4 pixel-text">TRAFFIC TRACK</h1>
        <p className="text-lg text-[#0f380f] mb-4 pixel-text">
          Find the best local restaurants and avoid the crowds!
        </p>
        <p className="text-lg text-[#0f380f] pixel-text">
          FREE delivery under 20 minutes for Academic City restaurants.
        </p>
        <VisitorCounter />
      </div>
    </div>
  )
} 
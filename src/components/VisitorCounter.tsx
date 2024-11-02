'use client'

import { useEffect, useState } from 'react'

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0)

  useEffect(() => {
    const incrementVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitors', {
          method: 'POST',
        })
        const data = await response.json()
        setVisitorCount(data.count)
      } catch (error) {
        console.error('Failed to update visitor count:', error)
      }
    }

    // Initial increment when component mounts
    incrementVisitorCount()

    // Set up periodic refresh of visitor count
    const intervalId = setInterval(async () => {
      const response = await fetch('/api/visitors')
      const data = await response.json()
      setVisitorCount(data.count)
    }, 30000) // Update every 30 seconds

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="bg-[#9bbc0f] p-2 border-2 border-[#306230] text-[#0f380f] text-center mt-4">
      <p className="pixel-text">Visitors Today: {visitorCount}</p>
    </div>
  )
} 
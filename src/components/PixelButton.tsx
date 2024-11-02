'use client'

interface PixelButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export function PixelButton({ children, onClick }: PixelButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-[#8bac0f] border-b-4 border-r-4 border-[#306230] text-[#0f380f] font-bold text-lg hover:bg-[#9bbc0f] active:border-b-2 active:border-r-2 active:translate-y-[2px] active:translate-x-[2px] transition-all"
    >
      {children}
    </button>
  )
} 

export default PixelButton;
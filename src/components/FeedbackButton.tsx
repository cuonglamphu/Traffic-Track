'use client'

import Image from 'next/image'
interface FeedbackButtonProps {
  onClick: () => void;
}

export function FeedbackButton({ onClick }: FeedbackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed right-4 bottom-4 z-50 w-16 h-16 hover:scale-110 transition-transform duration-200"
    >
      <Image
        src="/feedback.gif"
        alt="Feedback"
        className="w-full h-full object-contain"
        width={64}
        height={64}
      />
    </button>
  );
} 
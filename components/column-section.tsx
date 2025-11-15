'use client'

import { TokenCard } from './token-card'
import { useEffect, useState } from 'react'

interface Token {
  id: string
  name: string
  fullName: string
  icon: string
  mc: string
  price: string
  time: string
  holders: number
  transactions: number
  visitors: number
  lpLocked: number
  dayChange: number
  hourChange: number
  minChange: number
  volume: number
  fee: string
  tx: string
  hasBadge?: boolean
  gradient: string
}

interface ColumnSectionProps {
  title: string
  tokens: Token[]
  category: 'new-pairs' | 'final-stretch' | 'migrated'
  isGradientAnimated?: boolean
}

export function ColumnSection({
  title,
  tokens,
  category,
  isGradientAnimated,
}: ColumnSectionProps) {
  const [shimmerPos, setShimmerPos] = useState(-100)

  useEffect(() => {
    if (!isGradientAnimated) return

    let timeoutId: NodeJS.Timeout

    const animate = () => {
      setShimmerPos(-100)
      
      // Animate from left to right over 4 seconds (slower)
      const startTime = Date.now()
      const duration = 4000
      
      const updatePosition = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Move from -100% (off-screen left) to 200% (off-screen right)
        setShimmerPos(-100 + progress * 300)

        if (progress < 1) {
          requestAnimationFrame(updatePosition)
        } else {
          // Wait a moment then restart
          timeoutId = setTimeout(() => {
            animate()
          }, 100)
        }
      }
      
      requestAnimationFrame(updatePosition)
    }

    animate()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isGradientAnimated])

  return (
    <div className="flex-shrink-0 w-1/3 h-full flex flex-col border-r border-[#1a1f3a] last:border-r-0 overflow-hidden relative">
      {/* Column header - sticky */}
      <div className="bg-[#0f1326] border-b border-[#1a1f3a] p-3 sticky top-0 z-40 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <span className="text-sm font-mono text-white">⚡ {tokens.length}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <button className="p-1 text-sm hover:text-white transition-colors">≡</button>
          <button className="p-1 text-sm hover:text-white transition-colors">⇅</button>
          <button className="p-1 text-sm hover:text-white transition-colors">⋮</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-0.5 custom-scrollbar relative">
        {/* Shimmer overlay on top - more subtle */}
        {isGradientAnimated && (
          <div
            className="absolute inset-0 pointer-events-none z-50"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.06) ${shimmerPos + 10}%, rgba(139, 92, 246, 0.12) ${shimmerPos + 12}%, rgba(139, 92, 246, 0.06) ${shimmerPos + 18}%, transparent ${shimmerPos + 22}%)`,
              backgroundSize: '100% 100%',
              backgroundPosition: `${shimmerPos}% 0`,
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
        <div className="space-y-0 p-3 pt-4 relative z-10">
          {tokens.map((token) => (
            <TokenCard key={token.id} token={token} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}

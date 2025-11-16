'use client'

import { TokenCard } from './token-card'
import { useEffect, useState, memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useTokenSorting } from '@/hooks/useTokenSorting'

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

function ColumnSectionComponent({
  title,
  tokens,
  category,
  isGradientAnimated,
}: ColumnSectionProps) {
  const [shimmerPos, setShimmerPos] = useState(-100)
  const [updateKey, setUpdateKey] = useState(0)
  const [shuffledTokens, setShuffledTokens] = useState<Token[]>([])
  const sortBy = useSelector((state: RootState) => state.tokens.sortBy)
  
  // Apply sorting to tokens
  const sortedTokens = useTokenSorting(tokens, sortBy)

  // Live shuffling of box order within column
  useEffect(() => {
    // Initial shuffle
    const shuffled = [...sortedTokens].sort(() => Math.random() - 0.5)
    setShuffledTokens(shuffled)
    
    // Shuffle order every 2-4 seconds for live effect
    const shuffleInterval = setInterval(() => {
      setShuffledTokens(prev => {
        // Create new shuffled array
        const newShuffled = [...prev].sort(() => Math.random() - 0.5)
        return newShuffled
      })
    }, 2000 + Math.random() * 2000) // Random between 2-4 seconds
    
    return () => clearInterval(shuffleInterval)
  }, [sortedTokens])

  // Force re-render when tokens change (for API updates visibility) - faster
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateKey(prev => prev + 1)
    }, 500)
    return () => clearInterval(interval)
  }, [])

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
    <div className="flex-shrink-0 w-full md:w-1/3 h-full flex flex-col md:border-r border-[#1a1f3a] last:md:border-r-0 overflow-hidden relative snap-start">
      {/* Column header - sticky */}
      <div className="bg-[#050810] border-b border-[#1a1f3a] p-3 sticky top-0 z-40 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 border border-[#2a2f4a] rounded-lg">
            <span className="text-sm font-mono text-white">⚡ {sortedTokens.length}</span>
            <button className="w-5 h-5 rounded flex items-center justify-center text-purple-400 hover:bg-purple-500/20 transition-colors">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 2L10 4L6 6L2 4Z" fill="currentColor" opacity="0.6"/>
                <path d="M2 8L6 6L10 8L6 10L2 8Z" fill="currentColor" opacity="0.6"/>
                <path d="M2 6L6 4L10 6L6 8L2 6Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="px-2 py-0.5 text-xs font-medium bg-[#667AFF] text-white rounded">P1</button>
            <button className="px-2 py-0.5 text-xs font-medium text-white hover:bg-[#1a1f3a] rounded transition-colors">P2</button>
            <button className="px-2 py-0.5 text-xs font-medium text-white hover:bg-[#1a1f3a] rounded transition-colors">P3</button>
          </div>
          <button className="p-1 text-sm hover:text-white transition-colors text-gray-400">⇅</button>
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
        <div className="space-y-0 p-3 pt-5 relative z-10" key={updateKey}>
          {(shuffledTokens.length > 0 ? shuffledTokens : sortedTokens).map((token) => (
            <TokenCard 
              key={`${token.id}-${updateKey}`} 
              token={token} 
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export const ColumnSection = memo(ColumnSectionComponent)

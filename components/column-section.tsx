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
  const [shimmerPos, setShimmerPos] = useState(0)

  useEffect(() => {
    if (!isGradientAnimated) return

    const interval = setInterval(() => {
      setShimmerPos((prev) => (prev + 0.5) % 200)
    }, 16)

    return () => clearInterval(interval)
  }, [isGradientAnimated])

  return (
    <div className="flex-shrink-0 w-1/3 h-full flex flex-col border-r border-[#1a1f3a] last:border-r-0">
      {/* Column header - sticky */}
      <div className="bg-[#0a0e27] border-b border-[#1a1f3a] p-3 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <span className="text-xs font-mono text-yellow-400">⚡ {tokens.length}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <button className="p-1 text-xs hover:text-white">≡</button>
          <button className="p-1 text-xs hover:text-white">⇅</button>
          <button className="p-1 text-xs hover:text-white">⋮</button>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto pr-0.5 custom-scrollbar relative"
        style={
          isGradientAnimated
            ? {
                backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.12) ${shimmerPos}%, rgba(139, 92, 246, 0.18) ${shimmerPos + 2}%, rgba(139, 92, 246, 0.12) ${shimmerPos + 8}%, transparent ${shimmerPos + 12}%)`,
                backgroundSize: '200% 100%',
                backgroundPosition: `${shimmerPos}% 0`,
                backgroundRepeat: 'no-repeat',
              }
            : {}
        }
      >
        <div className="space-y-0 p-3">
          {tokens.map((token) => (
            <TokenCard key={token.id} token={token} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}

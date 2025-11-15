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
  isGradientAnimated?: boolean
}

export function ColumnSection({ title, tokens, isGradientAnimated }: ColumnSectionProps) {
  const [gradientPos, setGradientPos] = useState(0)

  useEffect(() => {
    if (!isGradientAnimated) return

    const interval = setInterval(() => {
      setGradientPos((prev) => (prev + 1) % 100)
    }, 50)

    return () => clearInterval(interval)
  }, [isGradientAnimated])

  return (
    <div className="flex-shrink-0 w-96 h-full">
      {/* Column header - sticky */}
      <div className="bg-[#0f1326] rounded-xl border border-[#1a1f3a] p-4 mb-4 sticky top-[140px] z-40">
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#1a1f3a]">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <span className="text-xs font-mono text-yellow-400 bg-[#1a1f3a] px-2.5 py-1 rounded-md">
              ⚡ {tokens.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1a1f3a] rounded transition-colors">
              ≡
            </button>
            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1a1f3a] rounded transition-colors">
              ⇅
            </button>
            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1a1f3a] rounded transition-colors">
              ⋮
            </button>
          </div>
        </div>
      </div>

      <div
        className={`space-y-3 pb-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 custom-scrollbar ${
          isGradientAnimated ? 'animated-gradient-bg' : ''
        }`}
        style={
          isGradientAnimated
            ? {
                backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.05) ${gradientPos}%, transparent 100%)`,
                backgroundSize: '200% 100%',
                backgroundPosition: `${gradientPos * 2}% 0`,
              }
            : {}
        }
      >
        {tokens.map((token) => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
    </div>
  )
}

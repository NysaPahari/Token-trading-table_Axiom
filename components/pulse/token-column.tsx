'use client'

import { memo, useMemo } from 'react'
import { Token } from '@/store/slices/token-slice'
import { TokenCard } from './token-card'

interface TokenColumnProps {
  title: string
  tokens: Token[]
  category: string
  borderColor: string
  isShimmering?: boolean
}

export const TokenColumn = memo(function TokenColumn({
  title,
  tokens,
  category,
  borderColor,
  isShimmering,
}: TokenColumnProps) {
  const categoryEmoji = useMemo(() => {
    const map: Record<string, string> = {
      'new-pairs': '⚡',
      'final-stretch': '🔥',
      'migrated': '✓',
    }
    return map[category] || ''
  }, [category])

  return (
    <div className="flex-1 flex flex-col border-l border-[#1a1f3a] first:border-l-0">
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-[#1a1f3a]">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <span>{categoryEmoji}</span>
          {title}
          <span className="text-xs text-gray-400">⚡ 5</span>
        </h2>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-white text-sm">≡</button>
          <button className="text-gray-400 hover:text-white text-sm">↕</button>
          <button className="text-gray-400 hover:text-white text-sm">⋮</button>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto gap-px flex flex-col ${isShimmering ? 'shimmer-bg' : ''}`}>
        {tokens.map((token) => (
          <TokenCard 
            key={token.id} 
            token={token} 
            borderColor={borderColor}
            category={category}
          />
        ))}
      </div>
    </div>
  )
})

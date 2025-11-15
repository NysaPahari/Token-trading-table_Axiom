'use client'

import { memo, useMemo } from 'react'
import { Token } from '@/store/slices/token-slice'
import { TokenCard } from './token-card'

interface TokenColumnProps {
  title: string
  tokens: Token[]
  category: string
}

export const TokenColumn = memo(function TokenColumn({
  title,
  tokens,
  category,
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span>{categoryEmoji}</span>
          {title}
        </h2>
        <span className="text-xs text-gray-400 bg-gray-900 px-2 py-1 rounded">
          {tokens.length}
        </span>
      </div>

      <div className="space-y-3">
        {tokens.map((token) => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
    </div>
  )
})

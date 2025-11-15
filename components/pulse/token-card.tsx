'use client'

import { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { selectToken } from '@/store/slices/ui-slice'
import { Token } from '@/store/slices/token-slice'
import { TokenPopover } from './token-popover'

interface TokenCardProps {
  token: Token
  borderColor: string
  category: string
}

export const TokenCard = memo(function TokenCard({ 
  token, 
  borderColor,
  category 
}: TokenCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [showPopover, setShowPopover] = useState(false)
  const isPositive = token.priceChange24h >= 0

  const handleClick = () => {
    dispatch(selectToken(token.id))
  }

  return (
    <div className="flex-shrink-0 px-4 py-3 border-b border-[#1a1f3a] last:border-b-0">
      <button
        onClick={handleClick}
        className="w-full text-left group cursor-pointer transition-all"
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
      >
        <div
          className={`bg-[#0a0e27] border ${borderColor} p-3 hover:bg-[#101530] transition-colors relative`}
        >
          {/* Token icon with colored border */}
          <div className="flex items-start gap-3 mb-2">
            <div className={`w-12 h-12 flex-shrink-0 border-2 ${borderColor} flex items-center justify-center text-xl font-bold`}>
              {token.icon}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-sm text-white">{token.symbol}</h3>
                <span className="text-xs text-gray-400">🔒</span>
              </div>
              <p className="text-xs text-gray-400">{token.name}</p>
            </div>
          </div>

          {/* Top stats row */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1 text-gray-400">
              <span>⏱</span>
              <span>{token.timeframe}s</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">MC</span>
              <span className="text-blue-400">${(token.marketCap / 1000).toFixed(1)}K</span>
            </div>
          </div>

          {/* Metrics row - colored indicators */}
          <div className="flex items-center gap-1 text-xs mb-2 flex-wrap">
            <span className="text-gray-400">⏱</span>
            <span className="text-yellow-400">●</span>
            <span className="text-green-400">👥 5</span>
            <span className="text-red-400">●</span>
            <span className="text-gray-400">⊕ 0</span>
            <span className="text-green-400">⊙ 0</span>
            <span className="text-red-400">● 0</span>
            <span className="text-gray-400">🔒 0</span>
          </div>

          {/* Changes row - green and red indicators */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-green-400">▲ {Math.abs(token.priceChange24h).toFixed(1)}%</span>
            <span className="text-red-400">▼ 0%</span>
            <span className="text-green-400">▲ {Math.abs(token.priceChange24h).toFixed(1)}%</span>
            <span className="text-gray-400">◆ 0%</span>
          </div>

          {/* Price and SOL badge */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1a1f3a]">
            <span className="text-xs text-gray-400">F = 0.0 TX 1</span>
            {category === 'migrated' && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold">
                0 SOL
              </span>
            )}
          </div>

          {showPopover && <TokenPopover token={token} category={category} />}
        </div>
      </button>
    </div>
  )
})

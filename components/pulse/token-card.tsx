'use client'

import { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { selectToken } from '@/store/slices/ui-slice'
import { Token } from '@/store/slices/token-slice'
import { TokenTooltip } from './token-tooltip'
import { TokenPopover } from './token-popover'

interface TokenCardProps {
  token: Token
}

export const TokenCard = memo(function TokenCard({ token }: TokenCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [showPopover, setShowPopover] = useState(false)
  const isPositive = token.priceChange24h >= 0

  const handleClick = () => {
    dispatch(selectToken(token.id))
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="w-full group cursor-pointer transition-all duration-200 hover:scale-105"
      >
        <div
          className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1220] border border-[#2a3050] rounded-lg p-4 hover:border-[#4a5070] hover:from-[#242945] hover:to-[#141829] transition-all"
          onMouseEnter={() => setShowPopover(true)}
          onMouseLeave={() => setShowPopover(false)}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded border border-[#3a4060] flex items-center justify-center bg-[#0f1220] text-sm font-bold flex-shrink-0">
              {token.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{token.symbol}</h3>
              <p className="text-xs text-gray-400 truncate">{token.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-gray-400 mb-1">Market Cap</p>
              <p className="font-mono text-sm">${(token.marketCap / 1000).toFixed(1)}K</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Price</p>
              <p className={`font-mono text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                ${parseFloat(token.price.toString()).toFixed(4)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs mt-3 pt-3 border-t border-[#2a3050]">
            <div>
              <p className="text-gray-400 mb-1">24h Change</p>
              <p
                className={`font-mono ${isPositive ? 'text-green-400' : 'text-red-400'}`}
              >
                {isPositive ? '+' : ''}{parseFloat(token.priceChange24h.toString()).toFixed(4)}%
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Holders</p>
              <p className="font-mono">{parseFloat(token.holders.toString()).toFixed(0)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#2a3050]">
            <span className="text-xs text-gray-500">{token.timeframe}</span>
            <div className="flex items-center gap-2">
              <TokenTooltip token={token} />
              {showPopover && <TokenPopover token={token} />}
            </div>
          </div>
        </div>
      </button>
    </div>
  )
})

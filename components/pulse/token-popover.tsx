'use client'

import { memo } from 'react'
import { Token } from '@/store/slices/token-slice'

interface TokenPopoverProps {
  token: Token
}

export const TokenPopover = memo(function TokenPopover({
  token,
}: TokenPopoverProps) {
  return (
    <div className="absolute bottom-full right-0 mb-2 bg-[#1a1f3a] border border-[#3a4060] rounded-lg p-3 w-48 text-xs z-50 shadow-lg pointer-events-none">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Volume 24h:</span>
          <span className="text-white">${(token.volume24h / 1000).toFixed(4)}K</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Liquidity:</span>
          <span className="text-white">${(token.liquidity / 1000).toFixed(4)}K</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Bonding Progress:</span>
          <span className="text-white">{token.bondingProgress}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Trades:</span>
          <span className="text-white">{token.trades}</span>
        </div>
      </div>
    </div>
  )
})

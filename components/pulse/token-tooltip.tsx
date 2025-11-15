'use client'

import { memo } from 'react'
import { Token } from '@/store/slices/token-slice'

interface TokenTooltipProps {
  token: Token
}

export const TokenTooltip = memo(function TokenTooltip({
  token,
}: TokenTooltipProps) {
  const getRiskColor = (risk: string) => {
    const colors: Record<string, string> = {
      low: 'bg-green-500/20 text-green-400',
      medium: 'bg-yellow-500/20 text-yellow-400',
      high: 'bg-red-500/20 text-red-400',
    }
    return colors[risk] || colors.medium
  }

  return (
    <div
      className="group relative inline-block"
      title={`Risk: ${token.risk}`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRiskColor(
          token.risk
        )}`}
      >
        {token.risk.charAt(0).toUpperCase()}
      </div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
        <div className="bg-[#1a1f3a] border border-[#3a4060] rounded px-2 py-1 text-xs whitespace-nowrap text-gray-200">
          Risk: {token.risk}
        </div>
      </div>
    </div>
  )
})

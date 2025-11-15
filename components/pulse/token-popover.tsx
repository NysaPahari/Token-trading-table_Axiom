'use client'

import { memo } from 'react'
import { Token } from '@/store/slices/token-slice'

interface TokenPopoverProps {
  token: Token
  category: string
}

export const TokenPopover = memo(function TokenPopover({
  token,
  category,
}: TokenPopoverProps) {
  const isBondingColumn = category === 'new-pairs'
  const isMigrationColumn = category === 'migrated'
  const isFinalStretch = category === 'final-stretch'

  return (
    <div className="absolute bottom-full left-0 mb-2 bg-[#0a0e27] border border-[#1a1f3a] p-4 w-56 text-xs z-50 shadow-xl">
      {/* Bonding info for New Pairs column */}
      {isBondingColumn && (
        <div className="space-y-3">
          <div className="text-green-400 font-semibold text-sm">
            Bonding: {token.bondingProgress || 30.69}%
          </div>
          <div className="border-t border-[#1a1f3a] pt-3 space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <span>🌍</span>
              <span>📎</span>
              <span>🔍</span>
              <span>👥</span>
              <span className="text-white ml-auto">18</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>⊕</span>
              <span>1</span>
              <span>⊙</span>
              <span>0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">🏛</span>
              <span className="text-blue-400">DS</span>
              <span className="text-gray-400">2mo</span>
              <span className="text-green-400">⊙ 0%</span>
              <span className="text-green-400">⊕ 0%</span>
            </div>
          </div>
        </div>
      )}

      {/* Migration info for Migrated column */}
      {isMigrationColumn && (
        <div className="space-y-3">
          <div className="text-green-400 font-semibold text-sm">
            Migrated: Ready
          </div>
          <div className="border-t border-[#1a1f3a] pt-3 space-y-2">
            <div className="text-gray-400 text-xs">
              This token has completed migration to Solana mainnet
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-xs px-2 py-1 bg-blue-900 rounded">
                ◎ SOL Migrated
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Final Stretch info */}
      {isFinalStretch && (
        <div className="space-y-3">
          <div className="text-purple-400 font-semibold text-sm">
            Final Stretch
          </div>
          <div className="border-t border-[#1a1f3a] pt-3 space-y-2">
            <div className="text-gray-400 text-xs">
              Token approaching graduation to Raydium
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

'use client'

import { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { closeModal } from '@/store/slices/ui-slice'
import { Token } from '@/store/slices/token-slice'

interface TokenModalProps {
  tokenId: string
}

export const TokenModal = memo(function TokenModal({
  tokenId,
}: TokenModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  const tokens = useSelector((state: RootState) => state.tokens.tokens)
  const token = useMemo(
    () => tokens.find((t) => t.id === tokenId),
    [tokens, tokenId]
  )

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeModal())
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [dispatch])

  if (!token) return null

  const isPositive = token.priceChange24h >= 0

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={() => dispatch(closeModal())}
    >
      <div
        className="bg-[#1a1f3a] border border-[#3a4060] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1f3a] border-b border-[#2a3050] p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded border border-[#3a4060] flex items-center justify-center bg-[#0f1220] text-2xl font-bold">
              {token.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{token.symbol}</h2>
              <p className="text-gray-400">{token.name}</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Price Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0f1220] border border-[#2a3050] rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Current Price</p>
              <p className="text-2xl font-bold">${token.price.toFixed(6)}</p>
            </div>
            <div className="bg-[#0f1220] border border-[#2a3050] rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">24h Change</p>
              <p
                className={`text-2xl font-bold ${
                  isPositive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {isPositive ? '+' : ''}{token.priceChange24h.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard label="Market Cap" value={`$${(token.marketCap / 1000).toFixed(1)}K`} />
            <StatCard label="Volume 24h" value={`$${(token.volume24h / 1000).toFixed(1)}K`} />
            <StatCard label="Liquidity" value={`$${(token.liquidity / 1000).toFixed(1)}K`} />
            <StatCard label="Holders" value={token.holders.toString()} />
            <StatCard label="Trades" value={token.trades.toString()} />
            <StatCard label="Bonding" value={`${token.bondingProgress}%`} />
          </div>

          {/* Additional Info */}
          <div className="bg-[#0f1220] border border-[#2a3050] rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Category</span>
                <span className="font-semibold capitalize">
                  {token.category.replace('-', ' ')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Risk Level</span>
                <span
                  className={`font-semibold px-2 py-1 rounded text-sm ${
                    token.risk === 'low'
                      ? 'bg-green-500/20 text-green-400'
                      : token.risk === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {token.risk.charAt(0).toUpperCase() + token.risk.slice(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Verified</span>
                <span className="font-semibold">
                  {token.verified ? '✓ Yes' : '✗ No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

interface StatCardProps {
  label: string
  value: string
}

const StatCard = memo(function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-[#0f1220] border border-[#2a3050] rounded-lg p-4">
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  )
})

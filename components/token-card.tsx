'use client'

import { useState } from 'react'

interface TokenCardProps {
  token: {
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
  category?: 'new-pairs' | 'final-stretch' | 'migrated'
}

export function TokenCard({ token, category = 'new-pairs' }: TokenCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getIconBorderColor = () => {
    switch (category) {
      case 'new-pairs':
        return 'border-yellow-500'
      case 'final-stretch':
        return 'border-green-500'
      case 'migrated':
        return 'border-red-500'
      default:
        return 'border-gray-500'
    }
  }

  const getHoverLabel = () => {
    switch (category) {
      case 'new-pairs':
        return 'Bonding'
      case 'final-stretch':
        return 'Migrating'
      case 'migrated':
        return 'Migrated'
      default:
        return ''
    }
  }

  const getIconColor = (gradient: string) => {
    const colors: Record<string, string> = {
      'from-blue-500 to-blue-600': 'bg-blue-500',
      'from-purple-400 to-pink-400': 'bg-purple-400',
      'from-amber-300 to-orange-400': 'bg-yellow-400',
      'from-green-400 to-emerald-500': 'bg-green-500',
      'from-yellow-400 to-orange-500': 'bg-yellow-400',
      'from-cyan-400 to-blue-500': 'bg-cyan-400',
      'from-lime-300 to-green-500': 'bg-lime-400',
      'from-pink-400 to-rose-500': 'bg-pink-400',
      'from-slate-400 to-slate-600': 'bg-gray-500',
      'from-red-400 to-red-600': 'bg-red-500',
      'from-red-500 to-orange-600': 'bg-red-500',
      'from-orange-400 to-amber-500': 'bg-orange-400',
      'from-yellow-500 to-yellow-600': 'bg-yellow-500',
    }
    return colors[gradient] || 'bg-gray-500'
  }

  const getLabelValue = () => {
    switch (category) {
      case 'new-pairs':
        return '6.44%'
      case 'final-stretch':
        return '50%'
      case 'migrated':
        return 'Migrated'
      default:
        return ''
    }
  }

  return (
    <div
      className="relative p-2.5 bg-[#050810] hover:bg-[#0a0e1f] transition-all duration-150 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label above the box - shown on hover */}
      {isHovered && (category === 'new-pairs' || category === 'final-stretch') && (
        <div className="absolute -top-8 right-0 bg-[#1a1f3a] border border-[#2a2f4a] text-white text-xs font-semibold px-2 py-1 rounded-lg z-50 pointer-events-none">
          <span className="text-white">{getHoverLabel()}: </span>
          <span className="text-green-400">{getLabelValue()}</span>
        </div>
      )}

      <div className="relative z-10">
        {/* Token card with icon on left and all content on right */}
        <div className="flex items-center gap-3">
          {/* Icon with border color */}
          <div
            className={`w-[72px] h-[72px] flex items-center justify-center text-xl font-bold flex-shrink-0 border-[1px] rounded p-[3px] ${getIconBorderColor()}`}
          >
            <div className={`w-full h-full flex items-center justify-center rounded ${getIconColor(
              token.gradient
            )} text-white`}>
              {token.icon}
            </div>
          </div>

          {/* All content to the right of icon */}
          <div className="flex-1 min-w-0">
            {/* Top row: Name, lock icon, MC, V */}
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-white text-sm">{token.name}</span>
              <span className="text-xs text-gray-400">🔐</span>
              <span className="text-xs text-gray-500 truncate">{token.fullName}</span>
              <div className="ml-auto flex items-center gap-2">
                <div className="text-xs">
                  <span className="text-gray-500 text-xs">MC</span>{' '}
                  <span className="text-blue-400 font-mono font-semibold text-sm">{token.mc}</span>
                </div>
                <div className="text-xs text-gray-600 font-mono">
                  V <span className="text-gray-400">{token.price}</span>
                </div>
              </div>
            </div>

            {/* Middle row: Time, icons, metrics, F */}
            <div className="flex items-center gap-1 text-xs mb-1">
              <span className="text-gray-400">{token.time}</span>
              <span className="w-1 h-1 rounded-full bg-yellow-400"></span>
              <span className="text-gray-500">👥</span>
              <span className="text-green-400">{token.holders}</span>
              <span className="w-1 h-1 rounded-full bg-red-400"></span>
              <span className="text-gray-500">Ⓣ</span>
              <span className="text-green-400">{token.transactions}</span>
              <span className="text-gray-500">👁</span>
              <span className={token.visitors > 0 ? 'text-green-400' : 'text-gray-500'}>
                {token.visitors}
              </span>
              <span className="text-gray-500">🔐</span>
              <span className={token.lpLocked > 0 ? 'text-green-400' : 'text-gray-500'}>
                {token.lpLocked}
              </span>
              <div className="ml-auto text-right text-xs text-gray-500">
                F ≡ {token.fee} TX {token.tx}
              </div>
            </div>

            {/* Bottom row: Change percentages and button */}
            <div className="flex gap-1.5 flex-wrap items-center text-xs">
              <span className={token.dayChange > 0 ? 'text-green-400' : 'text-red-500'}>
                {token.dayChange > 0 ? '▲' : '▼'} {Math.abs(token.dayChange)}%
              </span>
              <span className={token.hourChange > 0 ? 'text-green-400' : 'text-red-500'}>
                {token.hourChange > 0 ? '▲' : '▼'} {Math.abs(token.hourChange)}%
              </span>
              <span className={token.minChange > 0 ? 'text-green-400' : 'text-red-500'}>
                {token.minChange > 0 ? '▲' : '▼'} {Math.abs(token.minChange)}%
              </span>
              <span className={token.volume > 0 ? 'text-green-400' : 'text-gray-500'}>
                {token.volume > 0 ? '📊' : '○'} {token.volume}%
              </span>

              {(token.hasBadge || category === 'migrated' || category === 'new-pairs') && (
                <button className="ml-auto bg-[#667AFF] text-black text-xs font-semibold px-2 py-0.5 rounded-lg transition-colors flex items-center gap-1">
                  <span className="text-black">⚡</span>
                  <span className="text-black">0 SOL</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Corner icon for final-stretch column (pic1 -> pic2 on hover) */}
      {category === 'final-stretch' && (
        <div className="absolute bottom-2 right-2 z-20">
          {!isHovered ? (
            <div className="flex items-center gap-[8px]">{/* reduced gap to match rect width */}
              <div className="w-[12px] h-[12px] rounded-full border-2 border-red-500 bg-transparent" />
              <span className="text-green-400 font-semibold text-xs">&gt;</span>
              <div className="w-[12px] h-[12px] rounded-full border-2 border-yellow-400 bg-transparent" />
            </div>
          ) : (
            <div className="w-[52px] h-[16px] rounded-full flex items-center justify-center border-2 border-[#667AFF] bg-transparent">
              <span className="text-[#667AFF] text-xs font-semibold">+ 0 SOL</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

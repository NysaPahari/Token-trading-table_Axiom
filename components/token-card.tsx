'use client'

import { useState, useCallback, memo } from 'react'
import {
  getIconBorderColor,
  getHoverLabel,
  getIconColor,
  getLabelValue,
  Category,
} from '../lib/token-helpers'

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
  category?: Category
}

function TokenCardComponent({ token, category = 'new-pairs' }: TokenCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  // helper functions moved to lib/token-helpers.ts

  return (
    <div
      className="relative p-2.5 bg-[#050810] hover:bg-[#0a0e1f] transition-all duration-150 cursor-pointer overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Small label above the box on hover */}
      {isHovered && (
        <div
          className={`absolute -top-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none rounded px-2 py-0.5 text-xs font-semibold bg-transparent border whitespace-nowrap ${
            category === 'final-stretch'
              ? 'border-green-400 text-green-400'
              : category === 'migrated'
              ? 'border-white/20 text-white opacity-90'
              : 'border-red-500 text-red-500'
          }`}
        >
          {category === 'final-stretch'
            ? 'Migrating %'
            : category === 'migrated'
            ? 'Virtual Curve'
            : 'Bonding %'}
        </div>
      )}

      <div className="relative z-10">
        {/* Token card with icon on left and all content on right */}
        <div className="flex items-center gap-3">
          {/* Icon with border color */}
          <div
            className={`w-[72px] h-[72px] flex items-center justify-center text-xl font-bold flex-shrink-0 border-[1px] rounded p-[3px] ${getIconBorderColor(
                category
              )}`}
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
            <div className="w-[60px] h-[18px] rounded-full flex items-center justify-center border-2 border-[#667AFF] bg-transparent">
              <span className="text-[#667AFF] text-xs font-semibold">+ 0 SOL</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export const TokenCard = memo(TokenCardComponent)

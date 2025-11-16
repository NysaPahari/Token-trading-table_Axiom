'use client'

import { useState, useCallback, memo, useEffect, useRef } from 'react'
import {
  getIconBorderColor,
  getHoverLabel,
  getIconColor,
  getLabelValue,
  Category,
} from '../lib/token-helpers'
import { formatNumber, formatPercentage } from '../lib/number-format'

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
  const [isUpdating, setIsUpdating] = useState(false)
  const [hasDynamicNumbers, setHasDynamicNumbers] = useState(false)
  const prevValuesRef = useRef({
    dayChange: token.dayChange,
    hourChange: token.hourChange,
    minChange: token.minChange,
  })

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  // Detect value changes and trigger animation
  useEffect(() => {
    const hasChanged = 
      prevValuesRef.current.dayChange !== token.dayChange ||
      prevValuesRef.current.hourChange !== token.hourChange ||
      prevValuesRef.current.minChange !== token.minChange

    if (hasChanged) {
      setIsUpdating(true)
      setHasDynamicNumbers(true)
      const timer = setTimeout(() => setIsUpdating(false), 600)
      
      prevValuesRef.current = {
        dayChange: token.dayChange,
        hourChange: token.hourChange,
        minChange: token.minChange,
      }
      
      return () => clearTimeout(timer)
    }
  }, [token.dayChange, token.hourChange, token.minChange])

  // Check if token has dynamic numbers (for 2nd column label display)
  // For 2nd column: tokens with coin graphic should have migrating label
  // More tokens in 2nd column can have coin graphic now
  const migratingTokens = ['velon', 'nvidia', 'hoejak', 'cpt', 'kirk', 'seahorse2', 'uscr', 'fight', 'blob', 'geometric']
  const isMigratingToken = category === 'final-stretch' && migratingTokens.includes(token.id)
  // If token has coin graphic (isMigratingToken) AND has dynamic numbers, show migrating label
  const hasActiveUpdates = category === 'final-stretch' && isMigratingToken && hasDynamicNumbers
  // Coin graphic always visible for migrating tokens in 2nd column
  const showCoinGraphic = isMigratingToken

  // helper functions moved to lib/token-helpers.ts

  return (
    <div
      className="relative p-2.5 bg-[#050810] hover:bg-[#0a0e1f] transition-all duration-150 cursor-pointer overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Small label above the box on hover - 2nd column specific logic */}
      {isHovered && category === 'final-stretch' && (
        <div
          className={`absolute -top-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none rounded px-2 py-0.5 text-xs font-semibold bg-transparent border whitespace-nowrap ${
            hasActiveUpdates
              ? 'border-blue-400 text-blue-400'
              : token.dayChange > 0 
                ? 'border-green-400 text-green-400'
                : 'border-red-500 text-red-500'
          }`}
        >
          {hasActiveUpdates ? 'Migrating %' : 'Bonding %'}
        </div>
      )}
      {/* Labels for other columns */}
      {isHovered && category !== 'final-stretch' && (
        <div
          className={`absolute -top-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none rounded px-2 py-0.5 text-xs font-semibold bg-transparent border whitespace-nowrap ${
            category === 'migrated'
              ? 'border-white/20 text-white opacity-90'
              : category === 'new-pairs'
              ? token.dayChange > 0 
                ? 'border-green-400 text-green-400'
                : 'border-red-500 text-red-500'
              : 'border-gray-400 text-gray-400'
          }`}
        >
          {category === 'migrated'
            ? 'Virtual Curve'
            : category === 'new-pairs'
            ? 'Bonding %'
            : ''}
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
              <span className="text-green-400">{formatNumber(token.holders)}</span>
              <span className="w-1 h-1 rounded-full bg-red-400"></span>
              <span className="text-gray-500">Ⓣ</span>
              <span className="text-green-400">{formatNumber(token.transactions)}</span>
              <span className="text-gray-500">👁</span>
              <span className={token.visitors > 0 ? 'text-green-400' : 'text-gray-500'}>
                {formatNumber(token.visitors)}
              </span>
              <span className="text-gray-500">🔐</span>
              <span className={token.lpLocked > 0 ? 'text-green-400' : 'text-gray-500'}>
                {formatNumber(token.lpLocked)}
              </span>
              <div className="ml-auto text-right text-xs text-gray-500">
                F ≡ {token.fee} TX {token.tx}
              </div>
            </div>

            {/* Bottom row: Change percentages and button */}
            <div className="flex gap-1.5 flex-wrap items-center text-xs">
              <span 
                className={`price-change transition-all duration-300 ${
                  token.dayChange > 0 ? 'text-green-400' : 'text-red-500'
                } ${isUpdating && Math.abs(token.dayChange - prevValuesRef.current.dayChange) > 0.1 ? 'price-update-' + (token.dayChange > 0 ? 'positive' : 'negative') : ''}`}
              >
                {token.dayChange > 0 ? '▲' : '▼'} {formatPercentage(Math.abs(token.dayChange))}%
              </span>
              <span 
                className={`price-change transition-all duration-300 ${
                  token.hourChange > 0 ? 'text-green-400' : 'text-red-500'
                } ${isUpdating && Math.abs(token.hourChange - prevValuesRef.current.hourChange) > 0.1 ? 'price-update-' + (token.hourChange > 0 ? 'positive' : 'negative') : ''}`}
              >
                {token.hourChange > 0 ? '▲' : '▼'} {formatPercentage(Math.abs(token.hourChange))}%
              </span>
              <span 
                className={`price-change transition-all duration-300 ${
                  token.minChange > 0 ? 'text-green-400' : 'text-red-500'
                } ${isUpdating && Math.abs(token.minChange - prevValuesRef.current.minChange) > 0.1 ? 'price-update-' + (token.minChange > 0 ? 'positive' : 'negative') : ''}`}
              >
                {token.minChange > 0 ? '▲' : '▼'} {formatPercentage(Math.abs(token.minChange))}%
              </span>
              <span className={`price-change transition-all duration-300 ${token.volume > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                {token.volume > 0 ? '📊' : '○'} {formatPercentage(token.volume)}%
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
      {/* Corner icon for final-stretch column - always visible for migrating tokens, changes on hover */}
      {showCoinGraphic && (
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

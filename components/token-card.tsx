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
    address?: string
  }
  columnIndex: number
}

export function TokenCard({ token, columnIndex }: TokenCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Get border color based on column
  const getBorderColor = () => {
    if (columnIndex === 0) return 'border-green-500' // New Pairs - green
    if (columnIndex === 1) return 'border-purple-500' // Final Stretch - purple
    return 'border-yellow-500' // Migrated - yellow
  }

  // Get indicator circle color
  const getIndicatorColor = (value: number) => {
    if (value > 0) return 'bg-green-500'
    if (value < 0) return 'bg-red-500'
    return 'bg-gray-500'
  }

  // Format address
  const formatAddress = (addr?: string) => {
    if (!addr) return '3Bnx...pump'
    if (addr.length > 8) return `${addr.slice(0, 4)}...${addr.slice(-4)}`
    return addr
  }

  // Get change color
  const getChangeColor = (value: number) => {
    if (value > 0) return 'text-green-400'
    if (value < 0) return 'text-red-500'
    return 'text-gray-500'
  }

  // Calculate progress percentage (mock calculation)
  const progress = Math.min(100, Math.max(0, (token.holders / 100) * 100))

  return (
    <div
      className="relative border-b border-[#1a1f3a] bg-[#0a0e27] hover:bg-[#0f1326] transition-colors cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-2 sm:p-3">
        {/* Top section: Icon, Name, Address */}
        <div className="flex items-start gap-3 mb-2">
          {/* Token Icon with colored border */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 border-2 ${getBorderColor()} bg-black flex items-center justify-center text-white font-bold text-base sm:text-lg`}
            >
              {token.icon}
            </div>
            {/* Small indicator circle at bottom-right */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-1 bg-white"></div>
                <div className="w-0.5 h-1 bg-white"></div>
                <div className="w-0.5 h-1 bg-white"></div>
              </div>
            </div>
          </div>

          {/* Name and Address */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-white font-semibold text-sm">{token.name}</span>
              <span className="text-gray-500 text-xs">{token.fullName}</span>
              <button className="text-gray-500 hover:text-gray-400 text-xs ml-1">📋</button>
            </div>
            <div className="text-gray-500 text-xs font-mono">{formatAddress(token.address)}</div>
          </div>
        </div>

        {/* Middle section: Time, Metrics, MC, V, F, TX */}
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            <span className="text-green-400 text-[10px] sm:text-xs font-mono">{token.time}</span>
            
            {/* Search icon */}
            <span className="text-gray-500 text-[10px] sm:text-xs">Q</span>
            <span className="text-gray-400 text-[10px] sm:text-xs">{token.visitors || 0}</span>
            
            {/* Holders icon */}
            <span className="text-gray-500 text-[10px] sm:text-xs">👥</span>
            <span className={`text-[10px] sm:text-xs font-mono ${token.holders > 0 ? 'text-white' : 'text-gray-500'}`}>
              {token.holders}
            </span>
            
            {/* Chart icon */}
            <span className="text-gray-500 text-[10px] sm:text-xs">📊</span>
            <span className="text-gray-500 text-[10px] sm:text-xs">0</span>
            
            {/* Trophy icon */}
            <span className="text-gray-500 text-[10px] sm:text-xs">🏆</span>
            <span className="text-gray-500 text-[10px] sm:text-xs">0</span>
            
            {/* Crown icon */}
            <span className="text-gray-500 text-[10px] sm:text-xs">👑</span>
            <span className="text-gray-500 text-[10px] sm:text-xs">0/1</span>
          </div>

          {/* Right side: MC, V, F, TX */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
            <div>
              <span className="text-gray-500">MC</span>{' '}
              <span className="text-blue-400 font-mono font-semibold">{token.mc}</span>
            </div>
            <div>
              <span className="text-gray-500">V</span>{' '}
              <span className="text-blue-400 font-mono">{token.price}</span>
            </div>
            <div>
              <span className="text-gray-500">F</span>{' '}
              <span className="text-blue-400 font-mono">≡ {token.fee}</span>
            </div>
            <div>
              <span className="text-gray-500">TX</span>{' '}
              <span className="text-blue-400 font-mono">{token.tx}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-[#1a1f3a] mb-2 relative overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom section: Percentage changes and SOL box */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            {/* Star icon with percentage */}
            <div className="flex items-center gap-0.5">
              <span className="text-gray-500 text-[10px] sm:text-xs">⭐</span>
              <span className={`text-[10px] sm:text-xs font-semibold ${getChangeColor(token.dayChange)}`}>
                {token.dayChange}%
              </span>
            </div>

            {/* Chef hat with percentage and time */}
            <div className="flex items-center gap-0.5">
              <span className="text-gray-500 text-[10px] sm:text-xs">👨‍🍳</span>
              <span className={`text-[10px] sm:text-xs font-semibold ${getChangeColor(token.hourChange)}`}>
                {token.hourChange}%
              </span>
              <span className="text-gray-500 text-[10px] sm:text-xs">2mo</span>
            </div>

            {/* Target icon */}
            <div className="flex items-center gap-0.5">
              <span className="text-gray-500 text-[10px] sm:text-xs">🎯</span>
              <span className={`text-[10px] sm:text-xs font-semibold ${getChangeColor(token.minChange)}`}>
                {token.minChange}%
              </span>
            </div>

            {/* Ghost icon */}
            <div className="flex items-center gap-0.5">
              <span className="text-gray-500 text-[10px] sm:text-xs">👻</span>
              <span className={`text-[10px] sm:text-xs font-semibold ${getChangeColor(token.volume)}`}>
                {token.volume}%
              </span>
            </div>

            {/* Clover icon */}
            <div className="flex items-center gap-0.5">
              <span className="text-gray-500 text-[10px] sm:text-xs">🍀</span>
              <span className="text-[10px] sm:text-xs font-semibold text-green-400">0%</span>
            </div>

            {/* Indicator circles */}
            <div className="flex items-center gap-0.5 sm:gap-1 ml-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-500 text-[10px] sm:text-xs">>>></span>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full"></div>
            </div>
          </div>

          {/* SOL box */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded transition-colors flex items-center gap-0.5">
            <span>4</span>
            <span>O</span>
            <span>SOL</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Also export as default for compatibility
export default TokenCard

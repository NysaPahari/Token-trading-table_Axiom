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
}

export function TokenCard({ token }: TokenCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getChangeColor = (value: number) => {
    if (value > 50) return 'text-red-500'
    if (value > 0) return 'text-green-400'
    return 'text-gray-500'
  }

  const getIconColor = (gradient: string) => {
    const colors: Record<string, string> = {
      'from-blue-500 to-blue-600': 'border-blue-500',
      'from-purple-400 to-pink-400': 'border-purple-400',
      'from-amber-300 to-orange-400': 'border-yellow-400',
      'from-green-400 to-emerald-500': 'border-green-500',
      'from-yellow-400 to-orange-500': 'border-yellow-400',
      'from-cyan-400 to-blue-500': 'border-cyan-400',
      'from-lime-300 to-green-500': 'border-lime-400',
      'from-pink-400 to-rose-500': 'border-pink-400',
      'from-slate-400 to-slate-600': 'border-gray-400',
      'from-red-400 to-red-600': 'border-red-400',
      'from-red-500 to-orange-600': 'border-red-500',
      'from-orange-400 to-amber-500': 'border-orange-400',
      'from-yellow-500 to-yellow-600': 'border-yellow-500',
    }
    return colors[gradient] || 'border-gray-400'
  }

  return (
    <div
      className="relative p-3 rounded-xl border border-[#1a1f3a] bg-[#0f1326] hover:border-[#2a3f5a] transition-all duration-200 group cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
            : 'transparent',
        }}
      />

      <div className="relative z-10 space-y-2">
        {/* Token header with icon and name */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0 border-2 ${getIconColor(
              token.gradient
            )} bg-gradient-to-br ${token.gradient}`}
          >
            {token.icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-white text-sm">{token.name}</span>
              <span className="text-xs text-gray-500 bg-[#1a1f3a] px-2 py-0.5 rounded">
                🔐
              </span>
            </div>
            <div className="text-xs text-gray-500 truncate">{token.fullName}</div>
          </div>

          {/* Price section on right */}
          <div className="text-right flex-shrink-0">
            <div className="text-sm">
              <span className="text-gray-500 text-xs">MC</span>{' '}
              <span className="text-blue-400 font-mono font-semibold">{token.mc}</span>
            </div>
            <div className="text-xs text-gray-600 font-mono">
              v <span className="text-gray-400">{token.price}</span>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="h-px bg-[#1a1f3a]" />

        <div className="flex items-center justify-between text-xs gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-gray-400">{token.time}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
            <span className="text-gray-500">👥</span>
            <span className="text-green-400 font-semibold">{token.holders}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            <span className="text-gray-500">Ⓣ</span>
            <span className="text-green-400 font-semibold">{token.transactions}</span>
            <span className="text-gray-500">👁</span>
            <span className={`${token.visitors > 0 ? 'text-green-400' : 'text-gray-500'}`}>
              {token.visitors}
            </span>
            <span className="text-gray-500">🔐</span>
            <span className={`${token.lpLocked > 0 ? 'text-green-400' : 'text-gray-500'}`}>
              {token.lpLocked}
            </span>
          </div>

          {/* Right side info */}
          <div className="text-right">
            <span className="text-gray-400 text-xs">
              F <span className="text-gray-500">≡</span> {token.fee}
            </span>
            <span className="text-gray-600 mx-1">TX</span>
            <span className="text-gray-400 font-mono text-xs">{token.tx}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex gap-1.5 flex-wrap">
            <span className={`${token.dayChange > 0 ? 'text-green-400' : 'text-red-500'} text-xs font-semibold`}>
              {token.dayChange > 0 ? '▲' : '▼'} {Math.abs(token.dayChange)}%
            </span>
            <span className={`${token.hourChange > 0 ? 'text-green-400' : 'text-red-500'} text-xs font-semibold`}>
              {token.hourChange > 0 ? '▲' : '▼'} {Math.abs(token.hourChange)}%
            </span>
            <span className={`${token.minChange > 0 ? 'text-green-400' : 'text-red-500'} text-xs font-semibold`}>
              {token.minChange > 0 ? '▲' : '▼'} {Math.abs(token.minChange)}%
            </span>
            <span className={`text-xs ${token.volume > 0 ? 'text-green-400' : 'text-gray-500'}`}>
              {token.volume > 0 ? '📊' : '○'} {token.volume}%
            </span>
          </div>

          {token.hasBadge && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-md transition-colors">
              0 SOL
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

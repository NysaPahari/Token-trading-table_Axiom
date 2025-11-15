'use client'

import { TokenCard } from './token-card'
import { useEffect, useState } from 'react'

interface Token {
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

interface ColumnSectionProps {
  title: string
  tokens: Token[]
  isGradientAnimated?: boolean
  columnIndex: number
}

export function ColumnSection({ title, tokens, isGradientAnimated, columnIndex }: ColumnSectionProps) {
  const [gradientPos, setGradientPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!isGradientAnimated) return

    let startTime: number | null = null
    let isPaused = false
    let pauseStartTime: number | null = null
    const animationDuration = 2000 // 2 seconds to cross
    const pauseDuration = 1000 // 1 second pause

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime
      }

      if (isPaused) {
        if (pauseStartTime === null) {
          pauseStartTime = currentTime
        }
        if (currentTime - pauseStartTime >= pauseDuration) {
          // Resume animation
          isPaused = false
          pauseStartTime = null
          startTime = currentTime
          setIsVisible(true)
          setGradientPos(0)
        }
      } else {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / animationDuration, 1)
        const newPos = progress * 150 - 50 // Move from -50% to 100%

        if (progress >= 1) {
          // Animation complete, pause
          setIsVisible(false)
          isPaused = true
          pauseStartTime = currentTime
          setGradientPos(100)
        } else {
          setGradientPos(newPos)
        }
      }

      requestAnimationFrame(animate)
    }

    const frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [isGradientAnimated])

  return (
    <div className="flex flex-col h-full border-r border-[#1a1f3a] last:border-r-0 overflow-hidden">
      {/* Column header - fixed */}
      <div className="bg-[#0a0e27] border-b border-[#1a1f3a] px-2 sm:px-4 py-2 sm:py-2.5 flex-shrink-0">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <h2 className="text-xs sm:text-sm font-semibold text-white">{title}</h2>
            <span className="text-[10px] sm:text-xs font-mono text-yellow-400">⚡ {tokens.length}</span>
            <span className="text-[10px] sm:text-xs text-gray-500">O</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[10px] sm:text-xs text-gray-500">P1</span>
            <span className="text-[10px] sm:text-xs text-gray-500">P2</span>
            <span className="text-[10px] sm:text-xs text-gray-500">P3</span>
            <button className="p-0.5 sm:p-1 text-gray-400 hover:text-white text-[10px] sm:text-xs">⇅</button>
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        {isGradientAnimated && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)`,
              transform: `translateX(${gradientPos}%)`,
              width: '50%',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        )}
        <div className="space-y-0">
          {tokens.map((token) => (
            <TokenCard key={token.id} token={token} columnIndex={columnIndex} />
          ))}
        </div>
      </div>
    </div>
  )
}

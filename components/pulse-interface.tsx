'use client'

import React, { useEffect } from 'react';
import { Header } from './header'
import { ColumnSection } from './column-section'
import { BottomBar } from './bottom-bar'
import { MobileColumnIndicator } from './mobile-column-indicator'
import { MOCK_TOKENS } from '../lib/mock-data'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { setSortBy } from '@/store/slices/token-slice'
import { useTokenUpdates } from '@/hooks/useTokenUpdates'

export function PulseInterface() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  // Initialize default sort
  useEffect(() => {
    dispatch(setSortBy('market-cap'))
  }, [dispatch])

  // Start real-time updates
  useTokenUpdates(2000)

  const columns = [
    { title: 'New Pairs', tokens: MOCK_TOKENS.newPairs, category: 'new-pairs' },
    { title: 'Final Stretch', tokens: MOCK_TOKENS.finalStretch, category: 'final-stretch', isGradientAnimated: true },
    { title: 'Virtual Curve', tokens: MOCK_TOKENS.migrated, category: 'migrated' }
  ]

  return (
    <div className="h-screen bg-[#000000] text-white flex flex-col overflow-hidden">
      <Header />
      <div className="px-[0.5cm] py-[0.5cm] flex-1 overflow-hidden min-h-0">
        <div className="w-full h-full bg-[#050810] rounded-lg border border-[#1a1f3a] overflow-hidden flex flex-col">
            <div ref={containerRef} className="flex flex-1 overflow-x-auto md:overflow-visible min-h-0 snap-x snap-mandatory">
              {columns.map((col) => (
                <ColumnSection
                  key={col.category}
                  title={col.title}
                  tokens={col.tokens}
                  category={col.category as any}
                  isGradientAnimated={col.isGradientAnimated}
                />
              ))}
          </div>
            <div className="lg:hidden px-4 py-3 border-t border-[#1a1f3a] flex justify-center">
              <MobileColumnIndicator columns={columns} containerRef={containerRef} />
            </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <BottomBar />
      </div>
    </div>
  )
}

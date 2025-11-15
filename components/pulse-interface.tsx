'use client'

import { Header } from './header'
import { ColumnSection } from './column-section'
import { BottomBar } from './bottom-bar'
import { MOCK_TOKENS } from '../lib/mock-data'

export function PulseInterface() {
  return (
    <div className="h-screen bg-[#000000] text-white flex flex-col overflow-hidden">
      <Header />
      <div className="px-[0.5cm] py-[0.5cm] flex-1 overflow-hidden min-h-0">
        <div className="w-full h-full bg-[#050810] rounded-lg border border-[#1a1f3a] overflow-hidden flex flex-col">
          <div className="flex flex-1 overflow-x-auto md:overflow-visible min-h-0 snap-x snap-mandatory">
            <ColumnSection
              title="New Pairs"
              tokens={MOCK_TOKENS.newPairs}
              category="new-pairs"
            />
            <ColumnSection
              title="Final Stretch"
              tokens={MOCK_TOKENS.finalStretch}
              category="final-stretch"
              isGradientAnimated={true}
            />
            <ColumnSection
              title="Migrated"
              tokens={MOCK_TOKENS.migrated}
              category="migrated"
            />
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <BottomBar />
      </div>
    </div>
  )
}

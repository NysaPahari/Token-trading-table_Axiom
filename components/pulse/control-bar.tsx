'use client'

import { memo } from 'react'

interface ControlBarProps {
  sortBy: string
  filterCategory: string
  displayMode: string
  onSortChange: (sort: 'market-cap' | 'price-change' | 'volume') => void
  onFilterChange: (
    filter: 'all' | 'new-pairs' | 'final-stretch' | 'migrated'
  ) => void
  onDisplayChange: (display: 'grid' | 'list') => void
}

export const ControlBar = memo(function ControlBar({
  sortBy,
  filterCategory,
  displayMode,
  onSortChange,
  onFilterChange,
  onDisplayChange,
}: ControlBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-[#1a1f3a] border border-[#2a3050] rounded-lg p-4">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-400">Sort:</label>
        <select
          value={sortBy}
          onChange={(e) =>
            onSortChange(
              e.target.value as 'market-cap' | 'price-change' | 'volume'
            )
          }
          className="bg-[#0f1220] border border-[#3a4060] rounded px-3 py-1.5 text-sm text-white hover:border-[#5a6080] transition-colors"
        >
          <option value="market-cap">Market Cap</option>
          <option value="price-change">Price Change</option>
          <option value="volume">Volume</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-400">Filter:</label>
        <select
          value={filterCategory}
          onChange={(e) =>
            onFilterChange(
              e.target.value as
                | 'all'
                | 'new-pairs'
                | 'final-stretch'
                | 'migrated'
            )
          }
          className="bg-[#0f1220] border border-[#3a4060] rounded px-3 py-1.5 text-sm text-white hover:border-[#5a6080] transition-colors"
        >
          <option value="all">All Tokens</option>
          <option value="new-pairs">New Pairs</option>
          <option value="final-stretch">Final Stretch</option>
          <option value="migrated">Migrated</option>
        </select>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <label className="text-sm text-gray-400">Display:</label>
        <div className="flex gap-1 bg-[#0f1220] border border-[#3a4060] rounded p-1">
          <button
            onClick={() => onDisplayChange('grid')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              displayMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => onDisplayChange('list')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              displayMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            List
          </button>
        </div>
      </div>
    </div>
  )
})

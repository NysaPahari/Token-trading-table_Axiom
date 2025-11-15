'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { RootState, AppDispatch } from '@/store'
import { setTokens, setSortBy, setFilterCategory } from '@/store/slices/token-slice'
import { setDisplayMode } from '@/store/slices/ui-slice'
import { fetchTokens, subscribeToTokenUpdates } from '@/lib/token-service'
import { TokenColumn } from './token-column'
import { ControlBar } from './control-bar'
import { TokenModal } from './token-modal'
import { LoadingState } from './loading-state'

export function PulseTable() {
  const dispatch = useDispatch<AppDispatch>()
  const { tokens, sortBy, filterCategory } = useSelector(
    (state: RootState) => state.tokens
  )
  const { showModal, selectedTokenId, displayMode } = useSelector(
    (state: RootState) => state.ui
  )

  const { data, isLoading, error } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    refetchInterval: 5000,
  })

  useEffect(() => {
    if (data) {
      dispatch(setTokens(data))
    }
  }, [data, dispatch])

  useEffect(() => {
    const unsubscribe = subscribeToTokenUpdates((updatedToken) => {
      dispatch({
        type: 'tokens/updateTokenPrice',
        payload: {
          id: updatedToken.id,
          price: updatedToken.price,
          change: updatedToken.priceChange24h,
        },
      })
    })

    return () => unsubscribe()
  }, [dispatch])

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-400">Failed to load tokens</div>
      </div>
    )
  }

  const newPairs = tokens.filter((t) => t.category === 'new-pairs')
  const finalStretch = tokens.filter((t) => t.category === 'final-stretch')
  const migrated = tokens.filter((t) => t.category === 'migrated')

  return (
    <div className="h-screen bg-[#0a0e27] overflow-hidden flex flex-col">
      <div className="flex-shrink-0 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Pulse</h1>
      </div>

      <div className="flex-shrink-0 px-6 pb-4 border-b border-[#1a1f3a]">
        <ControlBar
          sortBy={sortBy}
          filterCategory={filterCategory}
          displayMode={displayMode}
          onSortChange={(sort) => dispatch(setSortBy(sort))}
          onFilterChange={(filter) => dispatch(setFilterCategory(filter))}
          onDisplayChange={(display) => dispatch(setDisplayMode(display))}
        />
      </div>

      <div className="flex-1 overflow-hidden flex gap-0 px-4 py-4">
        <TokenColumn title="New Pairs" tokens={newPairs} category="new-pairs" borderColor="border-yellow-500" />
        <TokenColumn
          title="Final Stretch"
          tokens={finalStretch}
          category="final-stretch"
          borderColor="border-purple-500"
          isShimmering
        />
        <TokenColumn title="Migrated" tokens={migrated} category="migrated" borderColor="border-green-500" />
      </div>

      {showModal && selectedTokenId && (
        <TokenModal tokenId={selectedTokenId} />
      )}
    </div>
  )
}

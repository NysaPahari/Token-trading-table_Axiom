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
    const unsubscribe = subscribeToTokenUpdates((update) => {
      dispatch({
        type: 'tokens/updateTokenPrice',
        payload: {
          id: update.id,
          priceChange: update.priceChange,
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
    <div className="h-full min-h-screen bg-[#0a0e27] p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Pulse</h1>
        <p className="text-gray-400 text-sm">Real-time token discovery</p>
      </div>

      <ControlBar
        sortBy={sortBy}
        filterCategory={filterCategory}
        displayMode={displayMode}
        onSortChange={(sort) => dispatch(setSortBy(sort))}
        onFilterChange={(filter) => dispatch(setFilterCategory(filter))}
        onDisplayChange={(display) => dispatch(setDisplayMode(display))}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        <TokenColumn title="New Pairs" tokens={newPairs} category="new-pairs" />
        <TokenColumn
          title="Final Stretch"
          tokens={finalStretch}
          category="final-stretch"
        />
        <TokenColumn title="Migrated" tokens={migrated} category="migrated" />
      </div>

      {showModal && selectedTokenId && (
        <TokenModal tokenId={selectedTokenId} />
      )}
    </div>
  )
}

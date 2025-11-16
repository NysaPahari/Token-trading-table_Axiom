import { useMemo } from 'react'

interface Token {
  id: string
  name: string
  mc: string
  dayChange: number
  volume: number
  [key: string]: any
}

type SortBy = 'market-cap' | 'price-change' | 'volume' | 'none'

/**
 * Custom hook for sorting tokens
 * @param tokens - Array of tokens to sort
 * @param sortBy - Sort criteria
 * @returns Sorted array of tokens
 */
export function useTokenSorting(tokens: Token[], sortBy: SortBy | string): Token[] {
  return useMemo(() => {
    if (!tokens || tokens.length === 0 || sortBy === 'none') {
      return tokens
    }

    const sorted = [...tokens]

    switch (sortBy) {
      case 'market-cap':
        return sorted.sort((a, b) => {
          const aMc = parseFloat(String(a.mc || '0').replace(/[^0-9.]/g, '')) || 0
          const bMc = parseFloat(String(b.mc || '0').replace(/[^0-9.]/g, '')) || 0
          return bMc - aMc
        })

      case 'price-change':
        return sorted.sort((a, b) => {
          const aChange = a.dayChange || 0
          const bChange = b.dayChange || 0
          return bChange - aChange
        })

      case 'volume':
        return sorted.sort((a, b) => {
          const aVol = a.volume || 0
          const bVol = b.volume || 0
          return bVol - aVol
        })

      default:
        return sorted
    }
  }, [tokens, sortBy])
}


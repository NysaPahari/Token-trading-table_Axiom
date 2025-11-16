import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { updateTokenPrice } from '@/store/slices/token-slice'
import { MOCK_TOKENS } from '@/lib/mock-data'

interface PriceUpdate {
  id: string
  priceChange: number
  timestamp: number
}

/**
 * Custom hook for real-time token price updates
 * Polls the API for price updates and updates both Redux and mock data
 */
export function useTokenUpdates(interval: number = 500) {
  const dispatch = useDispatch<AppDispatch>()
  const lastUpdateRef = useRef<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const updatedTokensRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('/api/tokens/updates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lastUpdate: lastUpdateRef.current,
          }),
        })

        if (!response.ok) return

        const data = await response.json()
        const updates: PriceUpdate[] = data.updates || []

        updates.forEach((update) => {
          // Update mock data tokens (for UI that uses MOCK_TOKENS directly)
          updateMockTokenPrice(update.id, update.priceChange)

          // Dispatch update to Redux (for components using Redux)
          dispatch(
            updateTokenPrice({
              id: update.id,
              priceChange: update.priceChange,
            })
          )

          // Track updated tokens for visual feedback
          updatedTokensRef.current.add(update.id)
          
          // Clear the highlight after animation
          setTimeout(() => {
            updatedTokensRef.current.delete(update.id)
          }, 1000)
        })

        if (updates.length > 0) {
          lastUpdateRef.current = Date.now()
        }
      } catch (error) {
        console.error('Error fetching token updates:', error)
      }
    }

    // Initial fetch immediately
    fetchUpdates()

    // Set up polling interval - very fast for maximum visibility
    intervalRef.current = setInterval(fetchUpdates, interval)
    
    // Force multiple rapid updates in first 10 seconds for visibility
    const rapidUpdates = setInterval(() => {
      fetchUpdates()
    }, 300)
    
    const rapidTimeout = setTimeout(() => clearInterval(rapidUpdates), 10000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      clearInterval(rapidUpdates)
      clearTimeout(rapidTimeout)
    }
  }, [dispatch, interval])
}

/**
 * Update mock token price change
 */
function updateMockTokenPrice(tokenId: string, priceChange: number) {
  // Search through all token categories
  const allTokens = [
    ...MOCK_TOKENS.newPairs,
    ...MOCK_TOKENS.finalStretch,
    ...MOCK_TOKENS.migrated,
  ]

  const token = allTokens.find((t) => t.id === tokenId)
  if (token) {
    // Update dayChange with the price change
    token.dayChange = (token.dayChange || 0) + priceChange
    
    // Also update hourChange and minChange proportionally
    token.hourChange = (token.hourChange || 0) + priceChange * 0.5
    token.minChange = (token.minChange || 0) + priceChange * 0.2
  }
}


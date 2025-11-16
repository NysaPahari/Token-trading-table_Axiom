import { Token } from '@/store/slices/token-slice'
import { MOCK_TOKENS } from './mock-data'

/**
 * Fetch tokens from REST API
 * @param category - Optional category filter
 * @param sortBy - Optional sort criteria
 * @returns Promise with tokens array
 */
export async function fetchTokens(
  category?: string,
  sortBy?: string
): Promise<Token[]> {
  try {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (sortBy) params.append('sortBy', sortBy)

    const response = await fetch(`/api/tokens?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch tokens')
    }

    const data = await response.json()
    return data.tokens || []
  } catch (error) {
    console.error('Error fetching tokens:', error)
    // Fallback to mock data if API fails
    return getMockTokensAsReduxFormat()
  }
}

/**
 * Fetch a single token by ID
 * @param id - Token ID
 * @returns Promise with token
 */
export async function fetchTokenById(id: string): Promise<Token | null> {
  try {
    const response = await fetch(`/api/tokens/${id}`)
    
    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.token ? convertToReduxToken(data.token) : null
  } catch (error) {
    console.error('Error fetching token:', error)
    return null
  }
}

/**
 * Subscribe to real-time token price updates
 * Uses polling to simulate WebSocket behavior
 * @param callback - Function called with updated token
 * @returns Unsubscribe function
 */
export function subscribeToTokenUpdates(
  callback: (token: { id: string; priceChange: number }) => void
): () => void {
  let lastUpdate = 0
  let isActive = true

  const pollUpdates = async () => {
    if (!isActive) return

    try {
      const response = await fetch('/api/tokens/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lastUpdate }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch updates')
      }

      const data = await response.json()
      const updates = data.updates || []

      updates.forEach((update: { id: string; priceChange: number }) => {
        callback(update)
      })

      if (updates.length > 0) {
        lastUpdate = Date.now()
      }
    } catch (error) {
      console.error('Error fetching updates:', error)
    }

    if (isActive) {
      setTimeout(pollUpdates, 2000)
    }
  }

  // Start polling
  pollUpdates()

  // Return unsubscribe function
  return () => {
    isActive = false
  }
}

/**
 * Convert mock data token to Redux Token format
 */
function convertToReduxToken(mockToken: any): Token {
  const mcValue = parseFloat(mockToken.mc.replace(/[^0-9.]/g, '')) || 0
  const priceValue = parseFloat(mockToken.price.replace(/[^0-9.]/g, '')) || 0

  return {
    id: mockToken.id,
    symbol: mockToken.name,
    name: mockToken.fullName,
    icon: mockToken.icon,
    marketCap: mcValue * 1000, // Convert K to actual value
    price: priceValue / 1000, // Convert K to actual value
    priceChange24h: mockToken.dayChange || 0,
    volume24h: (mockToken.volume || 0) * 1000,
    liquidity: (mockToken.lpLocked || 0) * 1000,
    timeframe: mockToken.time,
    holders: mockToken.holders || 0,
    bondingProgress: 0, // Not in mock data
    category: mockToken.category || 'new-pairs',
    trades: mockToken.transactions || 0,
    verified: mockToken.hasBadge || false,
    risk: 'medium', // Default risk
  }
}

/**
 * Get all mock tokens in Redux format
 */
function getMockTokensAsReduxFormat(): Token[] {
  const allTokens = [
    ...MOCK_TOKENS.newPairs.map(t => ({ ...t, category: 'new-pairs' })),
    ...MOCK_TOKENS.finalStretch.map(t => ({ ...t, category: 'final-stretch' })),
    ...MOCK_TOKENS.migrated.map(t => ({ ...t, category: 'migrated' })),
  ]

  return allTokens.map(convertToReduxToken)
}

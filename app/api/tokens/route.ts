import { NextResponse } from 'next/server'
import { MOCK_TOKENS } from '@/lib/mock-data'
import { API_CONFIG, getApiUrl } from '@/lib/api-config'

// GET /api/tokens - Fetch all tokens
// This endpoint serves mock data by default.
// To use a real API, set NEXT_PUBLIC_API_URL in .env.local
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const sortBy = searchParams.get('sortBy')

    // If API_URL is set, proxy to real API
    if (!API_CONFIG.useMockData && API_CONFIG.baseUrl) {
      try {
        const params = new URLSearchParams()
        if (category) params.append('category', category)
        if (sortBy) params.append('sortBy', sortBy)

        const response = await fetch(
          `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tokens}?${params}`,
          {
            headers: API_CONFIG.headers,
            signal: AbortSignal.timeout(API_CONFIG.timeout),
          }
        )

        if (response.ok) {
          const data = await response.json()
          return NextResponse.json({
            tokens: data.tokens || data,
            timestamp: Date.now(),
          })
        }
      } catch (apiError) {
        console.warn('Real API failed, falling back to mock data:', apiError)
        // Fall through to mock data
      }
    }

    // Use mock data (default or fallback)
    let tokens = [
      ...MOCK_TOKENS.newPairs.map(t => ({ ...t, category: 'new-pairs' })),
      ...MOCK_TOKENS.finalStretch.map(t => ({ ...t, category: 'final-stretch' })),
      ...MOCK_TOKENS.migrated.map(t => ({ ...t, category: 'migrated' })),
    ]

    // Filter by category if provided
    if (category && category !== 'all') {
      tokens = tokens.filter(t => t.category === category)
    }

    // Sort tokens
    if (sortBy) {
      tokens = sortTokens(tokens, sortBy)
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    return NextResponse.json({ tokens, timestamp: Date.now() })
  } catch (error) {
    console.error('Error fetching tokens:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    )
  }
}

// Helper function to sort tokens
function sortTokens(tokens: any[], sortBy: string) {
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
}


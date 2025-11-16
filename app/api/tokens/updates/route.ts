import { NextResponse } from 'next/server'
import { API_CONFIG } from '@/lib/api-config'

// POST /api/tokens/updates - WebSocket-like endpoint for real-time updates
// This simulates WebSocket behavior via polling
// To use a real API, set NEXT_PUBLIC_API_URL in .env.local
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { lastUpdate } = body

    // If API_URL is set, proxy to real API
    if (!API_CONFIG.useMockData && API_CONFIG.baseUrl) {
      try {
        const response = await fetch(
          `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.updates}`,
          {
            method: 'POST',
            headers: API_CONFIG.headers,
            body: JSON.stringify({ lastUpdate }),
            signal: AbortSignal.timeout(API_CONFIG.timeout),
          }
        )

        if (response.ok) {
          const data = await response.json()
          return NextResponse.json({
            updates: data.updates || data,
            timestamp: Date.now(),
          })
        }
      } catch (apiError) {
        console.warn('Real API failed, falling back to mock updates:', apiError)
        // Fall through to mock updates
      }
    }

    // Use mock updates (default or fallback)
    // Simulate price updates for random tokens
    const updates = generatePriceUpdates(lastUpdate)

    return NextResponse.json({ updates, timestamp: Date.now() })
  } catch (error) {
    console.error('Error fetching updates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 }
    )
  }
}

function generatePriceUpdates(lastUpdate: number) {
  const tokenIds = [
    'mario', 'game4legs', 'brrs', 'grokguys', 'jlm',
    'velon', 'nvidia', 'hoejak', 'cpt', 'kirk',
    'mario-migrated', 'scrappy', 'invest', 'mayhem', 'govslop'
  ]

  const updates = []
  const now = Date.now()
  
  // Only return updates if enough time has passed (simulate real-time)
  if (!lastUpdate || now - lastUpdate > 1000) {
    const randomCount = Math.floor(Math.random() * 3) + 1
    
    for (let i = 0; i < randomCount; i++) {
      const tokenId = tokenIds[Math.floor(Math.random() * tokenIds.length)]
      const priceChange = (Math.random() - 0.5) * 10 // -5% to +5%
      
      updates.push({
        id: tokenId,
        priceChange,
        timestamp: now,
      })
    }
  }

  return updates
}


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
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout)
        
        const response = await fetch(
          `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.updates}`,
          {
            method: 'POST',
            headers: API_CONFIG.headers,
            body: JSON.stringify({ lastUpdate }),
            signal: controller.signal,
          }
        )
        
        clearTimeout(timeoutId)

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
  
  // Return updates very frequently for maximum visibility
  if (!lastUpdate || now - lastUpdate > 200) {
    // Update 5-8 tokens per request (very visible)
    const randomCount = Math.floor(Math.random() * 4) + 5
    
    // Prioritize final-stretch tokens for visibility
    const finalStretchIds = ['velon', 'nvidia', 'hoejak', 'cpt', 'kirk']
    const otherIds = tokenIds.filter(id => !finalStretchIds.includes(id))
    
    // Get unique random tokens, prioritizing final-stretch
    const shuffledFinal = [...finalStretchIds].sort(() => Math.random() - 0.5)
    const shuffledOther = [...otherIds].sort(() => Math.random() - 0.5)
    const selectedTokens = [...shuffledFinal.slice(0, Math.min(3, randomCount)), ...shuffledOther.slice(0, randomCount - 3)]
    
    for (const tokenId of selectedTokens) {
      // Much larger price changes for maximum visibility (-12% to +12%)
      const priceChange = parseFloat(((Math.random() - 0.5) * 24).toFixed(4))
      
      updates.push({
        id: tokenId,
        priceChange,
        timestamp: now,
      })
    }
  }

  return updates
}


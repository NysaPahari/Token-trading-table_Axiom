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
  // All token IDs organized by column
  const newPairsIds = ['mario', 'game4legs', 'brrs', 'grokguys', 'jlm', 'rrock', 'lilpepe', 'ups', 'fartrocket', 'doge2', 'moon', 'star']
  const finalStretchIds = ['velon', 'nvidia', 'hoejak', 'cpt', 'kirk', 'seahorse2', 'uscr', 'fight', 'blob', 'geometric']
  const migratedIds = ['mario-migrated', 'scrappy', 'invest', 'mayhem', 'govslop', 'ups-migrated', 'elord', 'hakimi', 'cr5', 'prizepicks', 'wifejak', 'nvidia-migrated']
  
  const allTokenIds = [...newPairsIds, ...finalStretchIds, ...migratedIds]
  const updates = []
  const now = Date.now()
  
  // Return updates very frequently for maximum visibility
  if (!lastUpdate || now - lastUpdate > 200) {
    // Update 8-12 tokens per request (more visible, shuffling across columns)
    const randomCount = Math.floor(Math.random() * 5) + 8
    
    // Shuffle tokens from all columns for variety
    const shuffledNewPairs = [...newPairsIds].sort(() => Math.random() - 0.5)
    const shuffledFinalStretch = [...finalStretchIds].sort(() => Math.random() - 0.5)
    const shuffledMigrated = [...migratedIds].sort(() => Math.random() - 0.5)
    
    // Distribute updates across all 3 columns (more to 2nd column)
    const newPairsCount = Math.floor(randomCount * 0.3) // ~30% to column 1
    const finalStretchCount = Math.floor(randomCount * 0.4) // ~40% to column 2 (more dynamic)
    const migratedCount = randomCount - newPairsCount - finalStretchCount // Rest to column 3
    
    const selectedTokens = [
      ...shuffledNewPairs.slice(0, newPairsCount),
      ...shuffledFinalStretch.slice(0, finalStretchCount),
      ...shuffledMigrated.slice(0, migratedCount),
    ]
    
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


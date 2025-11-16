import { NextResponse } from 'next/server'
import { MOCK_TOKENS } from '@/lib/mock-data'

// GET /api/tokens/[id] - Fetch single token
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const allTokens = [
      ...MOCK_TOKENS.newPairs,
      ...MOCK_TOKENS.finalStretch,
      ...MOCK_TOKENS.migrated,
    ]

    const token = allTokens.find(t => t.id === params.id)

    if (!token) {
      return NextResponse.json(
        { error: 'Token not found' },
        { status: 404 }
      )
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200))

    return NextResponse.json({ token, timestamp: Date.now() })
  } catch (error) {
    console.error('Error fetching token:', error)
    return NextResponse.json(
      { error: 'Failed to fetch token' },
      { status: 500 }
    )
  }
}


import { Token } from '@/store/slices/token-slice'

// Mock token data generator
function generateMockTokens(): Token[] {
  const symbols = [
    'MARIO', 'VELON', 'NVIDIA', 'HOEJAK', 'CPT', 'KIRK', 
    'GAME4LEGS', 'brrs', 'GrokGuys', 'JLM', 'SCRAPPY', 'INVEST', 
    'MAYHEM', 'Govslop'
  ]
  
  const names = [
    'Official Mario Coin', 'Velon', 'NVIDIA MEME Token', 'Hoejak',
    'Empulser Enterprises', 'Official Charlie Kirk Coin', 'Game4Legs',
    'ugly phnx', 'Just a Grok Guy', 'Jesus Language Model', 'Arc Raiders Mascot',
    "I'm Telling You Now Is The Time", 'Mayhem Mode', 'Govslop'
  ]

  const categories: ('new-pairs' | 'final-stretch' | 'migrated')[] = [
    'new-pairs', 'final-stretch', 'migrated'
  ]

  return symbols.map((symbol, i) => ({
    id: `token-${i}`,
    symbol,
    name: names[i],
    icon: symbol.charAt(0),
    marketCap: Math.floor(Math.random() * 5000000) + 10000,
    price: Math.random() * 10,
    priceChange24h: (Math.random() - 0.5) * 100,
    volume24h: Math.floor(Math.random() * 500000),
    liquidity: Math.floor(Math.random() * 200000),
    timeframe: ['5s', '10h', '21s', '27s', '14h', '6h', '20s', '10s', '34s', '1m'].sort(() => Math.random() - 0.5)[0],
    holders: Math.floor(Math.random() * 10000),
    bondingProgress: Math.floor(Math.random() * 100),
    category: categories[i % 3],
    trades: Math.floor(Math.random() * 10000),
    verified: Math.random() > 0.5,
    risk: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
  }))
}

let mockTokens = generateMockTokens()

export async function fetchTokens(): Promise<Token[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTokens)
    }, 500)
  })
}

export function subscribeToTokenUpdates(
  callback: (token: Token) => void
): () => void {
  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * mockTokens.length)
    const token = mockTokens[randomIndex]
    
    // Simulate price update
    const newPrice = token.price * (1 + (Math.random() - 0.5) * 0.1)
    const priceChange = ((newPrice - token.price) / token.price) * 100
    
    token.price = newPrice
    token.priceChange24h += priceChange / 10
    
    callback(token)
  }, 2000)

  return () => clearInterval(interval)
}

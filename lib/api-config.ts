/**
 * API Configuration
 * 
 * Configure your API endpoints here.
 * Set NEXT_PUBLIC_API_URL in .env.local to use a real backend.
 */

export const API_CONFIG = {
  // Base URL for your API
  // Set in .env.local: NEXT_PUBLIC_API_URL=https://your-api.com/api
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',

  // API endpoints
  endpoints: {
    tokens: '/tokens',
    tokenById: (id: string) => `/tokens/${id}`,
    updates: '/tokens/updates',
  },

  // Default headers for API requests
  headers: {
    'Content-Type': 'application/json',
    // Uncomment and add your API key if needed:
    // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    // 'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
  },

  // Request timeout in milliseconds
  timeout: 10000,

  // Whether to use mock data (if true, uses lib/mock-data.ts)
  useMockData: !process.env.NEXT_PUBLIC_API_URL,
}

/**
 * Helper to build full API URL
 */
export function getApiUrl(endpoint: string): string {
  if (API_CONFIG.useMockData) {
    // Use Next.js API routes (which serve mock data)
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  }
  
  // Use external API
  const base = API_CONFIG.baseUrl.replace(/\/$/, '')
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${base}${path}`
}


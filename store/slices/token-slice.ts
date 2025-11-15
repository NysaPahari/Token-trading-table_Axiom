import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Token {
  id: string
  symbol: string
  name: string
  icon: string
  marketCap: number
  price: number
  priceChange24h: number
  volume24h: number
  liquidity: number
  timeframe: string
  holders: number
  bondingProgress: number
  category: 'new-pairs' | 'final-stretch' | 'migrated'
  trades: number
  verified: boolean
  risk: 'low' | 'medium' | 'high'
}

interface TokenState {
  tokens: Token[]
  sortBy: 'market-cap' | 'price-change' | 'volume'
  filterCategory: 'all' | 'new-pairs' | 'final-stretch' | 'migrated'
}

const initialState: TokenState = {
  tokens: [],
  sortBy: 'market-cap',
  filterCategory: 'all',
}

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload
    },
    updateTokenPrice: (
      state,
      action: PayloadAction<{ id: string; price: number; change: number }>
    ) => {
      const token = state.tokens.find((t) => t.id === action.payload.id)
      if (token) {
        token.price = action.payload.price
        token.priceChange24h = action.payload.change
      }
    },
    setSortBy: (
      state,
      action: PayloadAction<'market-cap' | 'price-change' | 'volume'>
    ) => {
      state.sortBy = action.payload
    },
    setFilterCategory: (
      state,
      action: PayloadAction<'all' | 'new-pairs' | 'final-stretch' | 'migrated'>
    ) => {
      state.filterCategory = action.payload
    },
  },
})

export const { setTokens, updateTokenPrice, setSortBy, setFilterCategory } =
  tokenSlice.actions
export default tokenSlice.reducer

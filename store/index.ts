import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './slices/token-slice'
import uiReducer from './slices/ui-slice'

export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

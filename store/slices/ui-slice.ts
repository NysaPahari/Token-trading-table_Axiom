import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  selectedTokenId: string | null
  showModal: boolean
  displayMode: 'grid' | 'list'
}

const initialState: UIState = {
  selectedTokenId: null,
  showModal: false,
  displayMode: 'grid',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectToken: (state, action: PayloadAction<string>) => {
      state.selectedTokenId = action.payload
      state.showModal = true
    },
    closeModal: (state) => {
      state.showModal = false
      state.selectedTokenId = null
    },
    setDisplayMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.displayMode = action.payload
    },
  },
})

export const { selectToken, closeModal, setDisplayMode } = uiSlice.actions
export default uiSlice.reducer

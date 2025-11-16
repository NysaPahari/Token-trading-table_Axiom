import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { selectToken, closeModal } from '@/store/slices/ui-slice'

/**
 * Custom hook for modal state management
 * @returns Modal state and control functions
 */
export function useModal() {
  const dispatch = useDispatch<AppDispatch>()
  const { showModal, selectedTokenId } = useSelector(
    (state: RootState) => state.ui
  )

  const openModal = (tokenId: string) => {
    dispatch(selectToken(tokenId))
  }

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  return {
    showModal,
    selectedTokenId,
    openModal,
    closeModal: handleCloseModal,
  }
}


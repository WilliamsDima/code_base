import {
  useFetchAddCodeListUserMutation,
  useFetchCodeListUserQuery,
  useFetchDeleteCodeItemMutation,
  useFetchUpdateCodeItemMutation,
} from '@services/UserServices'
import { useMemo } from 'react'

export const useRTKQuery = () => {
  const [deleteItem, deleteData] = useFetchDeleteCodeItemMutation()
  const [updateItem, updateData] = useFetchUpdateCodeItemMutation()
  const [addItemCode, addItemData] = useFetchAddCodeListUserMutation()
  const { data: codes, isLoading } = useFetchCodeListUserQuery('')

  const value = useMemo(() => {
    return {
      deleteItem,
      updateItem,
      addItemCode,
      deleteData,
      updateData,
      addItemData,
      codes,
      isLoading,
    }
  }, [
    addItemCode,
    addItemData,
    codes,
    deleteData,
    deleteItem,
    isLoading,
    updateData,
    updateItem,
  ])

  return value
}

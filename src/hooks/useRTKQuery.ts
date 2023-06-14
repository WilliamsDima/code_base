import {
  useAddCodeMutation,
  useDeleteCodeItemMutation,
  useGetCodesRoomsQuery,
  useUpdateCodeItemMutation,
} from '@services/CodesServices'
import { useMemo } from 'react'
import { useAppSelector } from './hooks'

export const useRTKQuery = () => {
  const { room } = useAppSelector((store) => store.main)

  const [deleteItem, deleteData] = useDeleteCodeItemMutation()
  const [updateItem, updateData] = useUpdateCodeItemMutation()
  const [addItemCode, addItemData] = useAddCodeMutation()
  const { data: codes, isLoading } = useGetCodesRoomsQuery(room.value as string)

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

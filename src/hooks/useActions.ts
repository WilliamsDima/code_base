import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { actions } from '../store/redusers/main/main'
import { useAppDispatch } from './hooks'

const allActions = {
  ...actions,
}

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}

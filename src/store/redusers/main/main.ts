import { createSlice } from '@reduxjs/toolkit'
import { mainActions } from '../../actions/mainActions'
import { IStore } from './types'

const initialState: IStore = {
  codeBase: [],
  loading: false,
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    ...mainActions,
  },
  extraReducers: {},
})

export const mainReducer = (state = initialState, action: any) => {
  return mainSlice.reducer(state, action)
}

export const actions = mainSlice.actions

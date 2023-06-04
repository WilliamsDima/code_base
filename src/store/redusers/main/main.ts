import { createSlice } from '@reduxjs/toolkit'
import { mainActions } from '../../actions/mainActions'
import { IStore } from './types'
import { sistemsRooms } from '@services/constans'

const initialState: IStore = {
  room: sistemsRooms[0],
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

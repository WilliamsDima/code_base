import { PayloadAction } from '@reduxjs/toolkit'
import { IStore } from '@store/redusers/main/types'
import { IItemSelect } from '@storybook/molecules/Select/types'

export type MainActions = {
  setRoom: (state: IStore, payload: PayloadAction<IItemSelect>) => void
}

export const mainActions: MainActions = {
  setRoom: (state, { payload }) => {
    state.room = payload
  },
}

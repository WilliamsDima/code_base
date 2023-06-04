import { PayloadAction } from '@reduxjs/toolkit'
import { IStore } from '@store/redusers/main/types'
import { IItemSelect } from '@storybook/molecules/Select/types'

export type MainActions = {
  setTab: (state: IStore, payload: PayloadAction<IItemSelect>) => void
}

export const mainActions: MainActions = {
  setTab: (state, { payload }) => {
    state.tab = payload
  },
}

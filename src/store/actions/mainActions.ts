import { PayloadAction } from '@reduxjs/toolkit'
import { addCode } from '../../api/firebase'
import { IItemCode } from '../../appTypes/types'
import { IStore } from '../redusers/main/types'

export type MainActions = {
  setCodeBase: (state: IStore, payload: PayloadAction<IItemCode[]>) => void
  editeItem: (state: IStore, payload: PayloadAction<IItemCode>) => void
  copyCode: (state: IStore, payload: PayloadAction<number>) => void
  deleteCode: (state: IStore, payload: PayloadAction<number>) => void
}

export const mainActions: MainActions = {
  setCodeBase: (state, { payload }) => {
    state.codeBase = payload
  },
  editeItem: (state, { payload }) => {
    state.codeBase = state.codeBase.map((item: IItemCode) => {
      if (item.id === payload.id) {
        item.code = payload.code
        item.description = payload.description
        item.tags = payload.tags
        item.title = payload.title
      }
      return item
    })
    addCode(state.codeBase)
  },
  copyCode: (state, { payload }) => {
    state.codeBase = state.codeBase?.map((c: any) => {
      if (c.id === payload) {
        c.copy = c.copy + 1
      }
      return c
    })

    if (state.codeBase?.length) {
      addCode(state.codeBase)
    }
  },
  deleteCode: (state, { payload }) => {
    state.codeBase = state.codeBase?.filter((c: any) => c.id !== payload)

    addCode(state.codeBase)
  },
}

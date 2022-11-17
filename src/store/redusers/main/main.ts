import { createSlice } from '@reduxjs/toolkit'
import { addCode } from '../../../api/firebase'
import { IStore } from './types'

const initialState: IStore = {
    user: null,
    codeBase: [],
}

const counterSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload
        },
        setCodeBase: (state, { payload }) => {
            state.codeBase = payload
        },
        copyCode: (state, { payload }) => {
            state.codeBase = state.codeBase.map((c) => {
                if (c.id === payload) {
                    c.copy = c.copy + 1
                }
                return c
            })

            if (state.user) {
                addCode(state.user, state.codeBase)
            }
        },
        deleteCode: (state, { payload }) => {
            state.codeBase = state.codeBase.filter((c) => c.id !== payload)

            if (state.user) {
                addCode(state.user, state.codeBase)
            }
        },
    },
})

export const mainReducer = (state = initialState, action: any) => {
    return counterSlice.reducer(state, action);
};

export const { setUser, setCodeBase, copyCode, deleteCode } = counterSlice.actions;
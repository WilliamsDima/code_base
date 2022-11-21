import { createSlice } from '@reduxjs/toolkit'
import { addCode } from '../../../api/firebase'
import { IStore } from './types'

const initialState: IStore = {
    user: null,
    codeBase: [],
    filterList: null,
}

const counterSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload
        },
        addCodeBase: (state, { payload }) => {
            state.codeBase?.push(payload)

            if (state.user && state.codeBase) {
                console.log('addCodeBase');
                
                addCode(state.user, state.codeBase)
            }
        },
        setCodeBase: (state, { payload }) => {
            console.log('setCodeBase');
            state.codeBase = payload
        },
        copyCode: (state, { payload }) => {
            state.codeBase = state.codeBase?.map((c: any) => {
                if (c.id === payload) {
                    c.copy = c.copy + 1
                }
                return c
            })

            if (state.user && state.codeBase?.length) {
                addCode(state.user, state.codeBase)
            }
        },
        deleteCode: (state, { payload }) => {
            state.codeBase = state.codeBase?.filter((c: any) => c.id !== payload)

            if (state.user && state.codeBase) {
                addCode(state.user, state.codeBase)
            }
        },
        setFilterData: (state, { payload }) => {
            state.filterList = payload
        },
    },
})

export const mainReducer = (state = initialState, action: any) => {
    return counterSlice.reducer(state, action);
};

export const { setUser, setCodeBase, copyCode, deleteCode, setFilterData, addCodeBase } = counterSlice.actions;
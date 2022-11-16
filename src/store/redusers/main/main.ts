import { createSlice } from '@reduxjs/toolkit'
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
        }
    },
})

export const mainReducer = (state = initialState, action: any) => {
    return counterSlice.reducer(state, action);
};

export const { setUser, setCodeBase } = counterSlice.actions;
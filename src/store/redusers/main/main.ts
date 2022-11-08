import { createSlice } from '@reduxjs/toolkit'
import { IStore } from './types'

const initialState: IStore = {
    user: null,
}

const counterSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload
        }
    },
})

export const mainReducer = (state = initialState, action: any) => {
    return counterSlice.reducer(state, action);
};

export const { setUser } = counterSlice.actions;
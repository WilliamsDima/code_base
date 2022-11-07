import { handler } from './../../../hooks/helpers'
import { createSlice } from '@reduxjs/toolkit'
import { IStore } from './types'

const initialState: IStore = {
    template: 'React Williams Template'
}

const counterSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        handlers: handler
    },
})

export const mainReducer = (state = initialState, action: any) => {
    return counterSlice.reducer(state, action);
};

export const { handlers } = counterSlice.actions;
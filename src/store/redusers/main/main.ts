import { createSlice } from '@reduxjs/toolkit'
import { mainActions } from '../../actions/mainActions'
import { IStore } from './types'

const initialState: IStore = {
    user: null,
    codeBase: [],
    filterList: null,
    loading: false,
}

const counterSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        ...mainActions
    },
    extraReducers: {}
})

export const mainReducer = (state = initialState, action: any) => {
    return counterSlice.reducer(state, action);
};

export const { setUser, setCodeBase, copyCode, deleteCode, setFilterData, setLoading } = counterSlice.actions;
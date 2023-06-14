import { userAPI } from '@services/UserServices'
import { mainReducer } from './redusers/main/main'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { codesAPI } from '@services/CodesServices'

const rootReducer = combineReducers({
  main: mainReducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [codesAPI.reducerPath]: codesAPI.reducer,
})

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userAPI.middleware, codesAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

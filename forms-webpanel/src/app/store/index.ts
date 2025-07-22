import loginReducer from '@entities/LoginData/model/slice'
import usersReducer from '@entities/UserData/model/slice'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        users: usersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import type { LoginData, LoginResData, LoginMyData } from './types'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// eslint-disable-next-line prefer-template
const API_ROOT = import.meta.env.VITE_API_ROOT + 'auth'

// https://redux-toolkit.js.org/api/createAsyncThunk
// Сначала описываем Thunk-и (обёртки логики для fetch, я так понимаю)

const login = createAsyncThunk(
    'login/login',
    async (
        { ld }: { ld: LoginData },
    ): Promise<LoginResData> => {
        const json = await fetch(
            `${API_ROOT}/login`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ld),
            },
        )

        if (!json.ok) { throw new Error(json.toString()) }

        const data: LoginResData = await json.json()
        return data
    },
)

const logout = createAsyncThunk(
    'login/logout',
    async (): Promise<LoginResData> => {
        const json = await fetch(
            `${API_ROOT}/logout`,
            {
                method: 'POST',
            },
        )

        if (!json.ok) { throw new Error(json.toString()) }

        const data: LoginResData = await json.json()
        return data
    },
)

const getMyData = createAsyncThunk(
    'login/me',
    async (): Promise<LoginMyData> => {
        const json = await fetch(
            `${API_ROOT}/me`,
        )

        if (!json.ok) { throw new Error(json.toString()) }

        const data: LoginMyData = await json.json()
        return data
    },
)

// Теперь все наши Thunk-и оборачиваем в особые редюсеры, которые
// можут иметь доступ к действия, произошедшим не внутри слайса
interface LoginState {
    myData: LoginMyData,
}
const loginInitialState: LoginState = {
    myData: {} as LoginMyData,
}

const usersSlice = createSlice({
    name: 'users',

    initialState: loginInitialState,

    reducers: {},

    extraReducers(builder) {
        builder
            .addCase(getMyData.fulfilled, (state, action) => {
                state.myData = action.payload
            })
            .addCase(getMyData.rejected, (state, action) => {
                if (action.error.code === '401') {
                    state.myData = {} as LoginMyData
                }
            })
    },
})

// То есть логика в том, что мы вызываем сами внешние фукнции,
// (которые тоже возвращают какие-то данные), а extra reducer
// их наблюдает, и, когда они выполняются, делает определённые
// действия со значенинем внутри слайса.
export {
    getMyData,
    login,
    logout,
}

export default usersSlice.reducer

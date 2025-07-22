import type { UserCreatedData, UserData, UserResData } from './types'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// eslint-disable-next-line prefer-template
const API_ROOT = import.meta.env.VITE_API_ROOT + 'users'

// https://redux-toolkit.js.org/api/createAsyncThunk
// Сначала описываем Thunk-и (обёртки логики для fetch, я так понимаю)

const getUsers = createAsyncThunk(
    'users/getUsers',
    async (): Promise<UserData[]> => {
        const json = await fetch(
            API_ROOT,
        )

        if (!json.ok) { throw new Error(json.toString()) }

        const data: UserData[] = await json.json()
        return data
    },
)

const createUser = createAsyncThunk(
    'users/createUser',
    async (
        { ud }: { ud: UserData },
    ): Promise<UserCreatedData> => {
        const json = await fetch(
            API_ROOT,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ud),
            },
        )

        if (!json.ok) { throw new Error(json.toString()) }

        const data: UserCreatedData = await json.json()
        return data
    },
)

const updateUser = createAsyncThunk(
    'users/updateUser',
    async (
        { ud, uid }: { ud: UserData, uid: UserResData['id'] },
    ): Promise<UserResData> => {
        const json = await fetch(
            `${API_ROOT}/${uid}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ud),
            },
        )

        if (!json.ok) { throw new Error(json.toString()) }

        const data: UserResData = await json.json()
        return data
    },
)

const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (
        { uid }: { uid: UserResData['id'] },
    ): Promise<void> => {
        const json = await fetch(
            `${API_ROOT}/${uid}`,
            {
                method: 'DELETE',
            },
        )

        if (!json.ok) { throw new Error(json.toString()) }
    },
)

// Теперь все наши Thunk-и оборачиваем в особые редюсеры, которые
// можут иметь доступ к действия, произошедшим не внутри слайса
interface UsersState {
    value: UserData[],
}
const usersInitialState: UsersState = {
    value: [],
}

const usersSlice = createSlice({
    name: 'users',

    initialState: usersInitialState,

    reducers: {},

    extraReducers(builder) {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                console.log(state, action)
            })
            .addCase(getUsers.rejected, (state, action) => {
                alert(action.error?.message || 'Произошла чудовищная ошибка!')
            })
            .addCase(createUser.fulfilled, (state, action) => {
                console.log(state, action)
            })
            .addCase(createUser.rejected, (state, action) => {
                alert(action.error?.message || 'Произошла чудовищная ошибка!')
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log(state, action)
            })
            .addCase(updateUser.rejected, (state, action) => {
                alert(action.error?.message || 'Произошла чудовищная ошибка!')
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log(state, action)
            })
            .addCase(deleteUser.rejected, (state, action) => {
                alert(action.error?.message || 'Произошла чудовищная ошибка!')
            })
    },
})

// То есть логика в том, что мы вызываем сами внешние фукнции,
// (которые тоже возвращают какие-то данные), а extra reducer
// их наблюдает, и, когда они выполняются, делает определённые
// действия со значенинем внутри слайса.
export {
    createUser,
    deleteUser,
    getUsers,
    updateUser,
}

export default usersSlice.reducer

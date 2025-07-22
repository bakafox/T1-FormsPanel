import type { UserCreatedData, UserData, UserResData } from './types'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// eslint-disable-next-line prefer-template
const API_ROOT = import.meta.env.VITE_API_ROOT + 'users'

// https://redux-toolkit.js.org/api/createAsyncThunk
// Сначала описываем Thunk-и (обёртки логики для fetch, я так понимаю)

const getUsers = createAsyncThunk(
    'users/getUsers',
    async (): Promise<UserResData[]> => {
        const json = await fetch(
            API_ROOT,
        )

        if (!json.ok) { throw new Error(json.toString()) }

        const data: UserResData[] = await json.json()
        return data
    },
)

const getUser = createAsyncThunk(
    'users/getUser',
    async (
        { uid, setAsMyUser = false }: { uid: UserResData['id'], setAsMyUser: boolean },
    ): Promise<UserResData> => {
        const json = await fetch(
            `${API_ROOT}/${uid}`,
        )

        if (!json.ok) { throw new Error(json.toString()) }

        const data: UserResData = await json.json()

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
    allUsers: UserResData[],
    myUser: UserResData
}
const usersInitialState: UsersState = {
    allUsers: [],
    myUser: {} as UserResData
}

const usersSlice = createSlice({
    name: 'users',

    initialState: usersInitialState,

    reducers: {},

    extraReducers(builder) {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                if (action.meta.arg.setAsMyUser) {
                    state.myUser = action.payload
                }
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload
            })
            .addCase(createUser.fulfilled, (state, action) => {
                const newUser = { ...action.meta.arg.ud, ...action.payload }
                state.allUsers.push(newUser)
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.allUsers = state.allUsers.map(
                    (user) => user.id === action.payload.id
                        ? action.payload
                        : user
                )
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.allUsers = state.allUsers.filter(
                    (user) => user.id !== action.meta.arg.uid
                )
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
    getUser,
    updateUser,
}

export default usersSlice.reducer

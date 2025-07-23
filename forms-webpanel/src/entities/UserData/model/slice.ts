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
            { credentials: 'include', },
        )

        if (!json.ok) { throw new Error(json.toString()) }

        const data: UserResData[] = await json.json()
        return data
    },
)

const getUser = createAsyncThunk(
    'users/getUser',
    async (
        { uid, setAsMyUser = false }: { uid: UserResData['id'], setAsMyUser?: boolean },
    ): Promise<UserResData> => {
        const res = await fetch(
            `${API_ROOT}/${uid}`,
            { credentials: 'include', },
        )

        if (!setAsMyUser) { setAsMyUser = false }

        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.message)
        }

        const data: UserResData = await res.json()
        return data
    },
)

const createUser = createAsyncThunk(
    'users/createUser',
    async (
        { ud }: { ud: UserData },
    ): Promise<UserCreatedData> => {
        const res = await fetch(
            API_ROOT,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ud),
                credentials: 'include',
            },
        )

        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.message)
        }

        const data: UserCreatedData = await res.json()
        return data
    },
)

const updateUser = createAsyncThunk(
    'users/updateUser',
    async (
        { uid, ud  }: { uid: UserResData['id'], ud: UserData },
    ): Promise<void> => {
        const res = await fetch(
            `${API_ROOT}/${uid}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ud),
                credentials: 'include',
            },
        )

        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.message)
        }

        return
    },
)

const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (
        { uid }: { uid: UserResData['id'] },
    ): Promise<void> => {
        const res = await fetch(
            `${API_ROOT}/${uid}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        )

        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.message)
        }
    },
)

// Теперь все наши Thunk-и оборачиваем в особые редюсеры, которые
// можут иметь доступ к действия, произошедшим не внутри слайса
interface UsersState {
    allUsers: UserResData[],
    myUser: UserResData,
}
const usersInitialState: UsersState = {
    allUsers: [],
    myUser: {} as UserResData,
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
                const newUser = {
                    ...action.meta.arg.ud,
                    birthDate: action.meta.arg.ud.birthDate.toString(),
                    ...action.payload
                }
                state.allUsers.push(newUser)
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.allUsers = state.allUsers.map(
                    (ud: UserResData) => ud.id === action.meta.arg.uid
                        ? action.meta.arg.ud
                        : ud,
                )
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.allUsers = state.allUsers.filter(
                    (ud: UserResData) => ud.id !== action.meta.arg.uid,
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
    getUser,
    getUsers,
    updateUser,
}

export default usersSlice.reducer

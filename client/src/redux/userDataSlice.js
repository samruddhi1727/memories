import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    userData:"",
    loading: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
    },
})

export const { setIsLoggedIn, setLoading, setUserData } = userSlice.actions

export default userSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userDataSlice'
import postReducer from './allPostSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer
    },
})
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchedQuery: "",
    page: 1,
    postDetails: null,
    allPosts: [],
    postCount: "",
    formType:'create',
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setPostDetails: (state, action) => {
            state.postDetails = action.payload
        },
        setAllPosts: (state, action) => {
            state.allPosts = action.payload
        },
        setPostCount: (state, action) => {
            state.postCount = action.payload
        },
        setFormType: (state, action) => {
            state.formType = action.payload
        },
    },
})

export const { setSearchedQuery, setPage, setPostDetails, setAllPosts, setPostCount, setFormType } = postSlice.actions
export default postSlice.reducer
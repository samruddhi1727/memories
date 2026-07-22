import React from 'react'
import { Pagination } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from "../redux/allPostSlice";

const PagePagination = () => {

    const dispatch = useDispatch()
    const count = useSelector((state) => state.post.postCount)

    const pageChange = (event, value) => {
        dispatch(setPage(value))
    }

    return (
        <>
            {/* paginationnnn */}
            <Pagination onChange={pageChange} count={count} color='primary' />
        </>
    )
}
export default PagePagination

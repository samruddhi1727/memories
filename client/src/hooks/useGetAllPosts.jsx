import { useState, useEffect } from "react"
import axios from "axios"
import toast from 'react-hot-toast';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { setSearchedQuery, setAllPosts,setPostCount } from "../redux/allPostSlice";

const useGetAllPosts = () => {
    const { searchedQuery, page, postCount } = useSelector((state) => state.post)

    const dispatch = useDispatch()
    axios.defaults.withCredentials = true;
    const bendurl = import.meta.env.VITE_BEND_URL;
    console.log("getallpost hook sq and page check")
console.log(searchedQuery, page);
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const { data } = await axios.get(`${bendurl}/post/getAllposts?keyword=${searchedQuery}&page=${page}`);
                data.success ? (dispatch(setAllPosts(data.posts)), dispatch(setPostCount(data.postCount)))  : toast.error(data.message);
              
            } catch (error) {
                toast.error(error.message);
            }
        }
        fetchAllPosts();
    }, [page, searchedQuery])

}

export default useGetAllPosts
/*import { shallowEqual, useSelector } from 'react-redux';

const { searchedQuery, anotherProp } = useSelector(
  (state) => ({
    searchedQuery: state.post.searchedQuery,
    anotherProp: state.post.anotherProp
  }),
  shallowEqual
);
*/
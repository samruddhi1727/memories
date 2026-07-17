import { useState, useEffect } from "react"
import axios from "axios"
import toast from 'react-hot-toast';
import { shallowEqual, useDispatch } from 'react-redux'
import { setPostDetails} from "../redux/allPostSlice";

const useGetPostById = (postId) => {
    const dispatch = useDispatch()
    axios.defaults.withCredentials = true;
    const bendurl = import.meta.env.VITE_BEND_URL;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`${bendurl}/post/getPost/${postId}`);
                data.success ? dispatch(setPostDetails(data.post)): toast.error(data.message);
            // (dispatch(setPostDetails(data.post)), dispatch(setComments(data.post.comments)))
            // (console.log( data.post.comments),console.log("got the data"))

            } catch (error) {
                toast.error(error.message);
            }
        }
        fetchPost();
    }, [])

}

export default useGetPostById
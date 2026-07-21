import { useEffect } from "react"
import axios from "axios"
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { setPostDetails } from "../redux/allPostSlice";

const useGetPostById = (postId) => {
    const dispatch = useDispatch()
    axios.defaults.withCredentials = true;
    const bendurl = import.meta.env.VITE_BEND_URL;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                console.log("custom post data by id hook")
                const { data } = await axios.get(`${bendurl}/post/getPost/${postId}`);
                data.success ? dispatch(setPostDetails(data.post)) : toast.error(data.message);

            } catch (error) {
                toast.error(error.message);
            }
        }
        fetchPost();
    }, [])

}

export default useGetPostById
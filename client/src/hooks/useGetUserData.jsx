import { useEffect } from "react"
import axios from "axios"
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { setUserData } from "../redux/userDataSlice";

const useGetUserData = async () => {

    const dispatch = useDispatch()
    axios.defaults.withCredentials = true;
    const bendurl = import.meta.env.VITE_BEND_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(bendurl + '/user/data');
                data.success ? dispatch(setUserData(data.userData)) : toast.error(data.message);

            } catch (error) {
                toast.error(error.message);
            }
        }
        fetchUserData();
    }, [])
}
export default useGetUserData;

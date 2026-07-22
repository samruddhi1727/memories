import React from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import useGetAllPosts from '../hooks/useGetAllPosts'
import { GoArrowLeft } from "react-icons/go";
import { setFormType } from '../redux/allPostSlice';

const Create = () => {
    const params = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    axios.defaults.withCredentials = true;

    const bendurl = import.meta.env.VITE_BEND_URL;
    const userId = useSelector((state) => state.user.userData.id)
    const formType = useSelector((state) => state.post.formType)


    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    const onCreate = async (inputData) => {
        try {

            const formData = new FormData();
            formData.append("title", inputData.title);
            formData.append("caption", inputData.caption);
            formData.append("tags", inputData.tags);
            // because input type=file returns an array
            formData.append("image", inputData.image[0]);
            axios.defaults.withCredentials = true

            if (formType === 'create') {
                const { data } = await axios.post(bendurl + '/post/create', formData,
                    { headers: { "Content-Type": "multipart/form-data", }, }
                )
                if (data.success) {
                    toast.success("Post Created successfully");
                    setTimeout(() => {
                        navigate('/home')
                    }, 1000);
                } else {
                    toast.error("Post not created");
                }
            } else {
                // patch('/edit/:id'
                const { data } = await axios.patch(bendurl + `/post/edit/${params.id}`, formData,
                    { headers: { "Content-Type": "multipart/form-data", }, }
                )
                if (data.success) {
                    dispatch(setFormType("create"));
                    toast.success(data.message);
                    dispatch(setFormType("edit"));
                    setTimeout(() => {
                        navigate('/home')
                    }, 1000);
                } else {
                    toast.error("Post not Edited");
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="create-page">

            <div className="create-form-wrapper">
                <h2 className="create-title">{formType} Post</h2>
                <p className="create-subtitle">Share something with the world</p>

                <form className="create-form" onSubmit={handleSubmit(onCreate)}>

                    <input placeholder="Title" type="text"
                        {...register("title")}
                    ></input>

                    <input placeholder="Caption" type="text"
                        {...register("caption")}
                    ></input>

                    <input placeholder="Tags" type="text"
                        {...register("tags")}
                    ></input>

                    <input placeholder="Image" type="file"
                        {...register("image")}
                    ></input>
                    <button className="create-btn" type="submit" disabled={isSubmitting}>
                        {formType}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Create

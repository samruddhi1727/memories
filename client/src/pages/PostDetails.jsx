import React from "react"
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import useGetPostById from "../hooks/useGetPostById"
import { useForm } from "react-hook-form";
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { setPostDetails } from "../redux/allPostSlice";

const postDetails = () => {
   const params = useParams()
   useGetPostById(params.id)

  const dispatch = useDispatch()
  const { postDetails } = useSelector((state) => state.post)
  const user = useSelector((state) => state.user.userData)//:{usersam.name}
  axios.defaults.withCredentials = true;
  const bendurl = import.meta.env.VITE_BEND_URL;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const addComment = async (dataa) => {
    try {
      const { commentt } = dataa;
      const { data } = await axios.post(
        `${bendurl}/post/comment/${params.id}`,
        { value: `${user.name}: ${commentt}` }
      );
      // dispatch(setSearchedQuery(searchvalue))
      // navigate('/searchPosts')
      console.log(commentt)

      dispatch(setPostDetails(data));
    } catch (error) { toast.error(error.message) }
  }

  const handleComment = async () => {
    try {
      const { commentt } = data;
      const { data } = await axios.post(
        `${bendurl}/post/comment/${params.id}`,
        { value: `${user.name}: ${commentt}` }
      );

      dispatch(setPostDetails(data));

    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      post details

      {postDetails?.comments?.map((c, i) => (
        <p key={i} >
          <strong>{c.split(': ')[0]}</strong>
          {c.split(':')[1]}
        </p>
      ))}
      <h1> Add Comment here</h1>
      <form onSubmit={handleSubmit(addComment)}>
        <input placeholder="comment.." type="text"
          {...register("commentt", {
            required: { value: true, message: "This field is required", },

          })}
        ></input>
        <button className="btn" type="submit" disabled={isSubmitting}>add my comment</button>
      </form>
    </>
  )
}

export default postDetails

import React from "react"
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import useGetPostById from "../hooks/useGetPostById"
import { useForm } from "react-hook-form";
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { setPostDetails } from "../redux/allPostSlice";


const Comments = () => {

  const params = useParams()
  useGetPostById(params.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { postDetails } = useSelector(
    (state) => ({
      postDetails: state.post.postDetails,
    }), shallowEqual
  )
  const user = useSelector((state) => state.user.userData)//:{user.name}
  axios.defaults.withCredentials = true;
  const bendurl = import.meta.env.VITE_BEND_URL;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();


  const handleComment = async (dataa) => {
    try {
      const { commentt } = dataa;

      const { data } = await axios.post(
        `${bendurl}/post/comment/${params.id}`,
        { value: `${user.name}: ${commentt}` }
      );

      dispatch(setPostDetails(data.updatedPost));
      reset();
    } catch (error) { toast.error(error.message) }
  }
  return (

    <div className="comments-component">
      <div className="comments-header">Comments</div>

      <div className="comments-list">
        {postDetails?.comments?.map((c, i) => {
          const [user, ...textParts] = c.split(": ");
          return (
            <div className="comment-item" key={i}>
              <span className="comment-user">{user}</span>
              <span className="comment-text">{textParts.join(": ")}</span>
            </div>
          );
        })}
      </div>
      <form className="comment-form" onSubmit={handleSubmit(handleComment)}>
        <input
          type="text"
          placeholder="Add Comments..."
          {...register("commentt", { required: "This field is required" })}
        />
        <button type="submit" disabled={isSubmitting}>
          Post
        </button>
      </form>
    </div>

  )
}

export default Comments

import React, { useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useGetAllPosts from '../hooks/useGetAllPosts'
import PagePagination from './Pagination';
import { setAllPosts, setFormType } from "../redux/allPostSlice";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  axios.defaults.withCredentials = true;
  const bendurl = import.meta.env.VITE_BEND_URL;

  const userId = useSelector((state) => state.user.userData.id)
  const { allPosts } = useSelector((state) => state.post)

  const [likes, setLikes] = useState(post?.likes || []);
  const hasLiked = likes.includes(userId);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${bendurl}/post/delete/${post._id}`);
      data.success ? toast.success(data.message) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleEdit = async () => {
    try {
      dispatch(setFormType("edit"));
      navigate(`/edit/${post._id}`)
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleLike = async () => {
    try {

      if (hasLiked) {
        setLikes(post.likes.filter((id) => id !== userId));
      } else {
        setLikes([...post.likes, userId]);
      }

      const { data } = await axios.patch(
        `${bendurl}/post/likePost/${post._id}`
      );

      // updated post 
      // dispatch(
      //   setAllPosts(
      //     allPosts.map((post) =>
      //       post._id === data._id ? data : post
      //     )
      //   )
      // );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const Likess = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <>❤️&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <>⭐{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <>👌</>;
  };
  return (
    <>
      Post
      {console.log("log post in post")}{console.log(post)}
      {console.log("post id to print")}

      <img src={post.selectedFile} alt="" /><br />
      <img src={`${bendurl}/${post.image}`} alt="" />
      name:{post.name}<br />
      title:{post.title}<br />
      message:{post.message}<br />
      tags:{post.tags}<br />
      <button onClick={handleLike}><Likess /></button><br />
      <Link to={`/post/${post._id}`}>show details</Link><br />
      {(userId === post?.creator) && (
        <button onClick={handleDelete} > delete</button >
      )}<br />
      {/* <Link to={`/edit/${post._id}`}>edit post</Link> */}

      {(userId === post?.creator) && (
        <button onClick={handleEdit}>edit post</button>
      )}<br />
      <hr />
    </>
  )
}
export default Post


// const Likess = () => {
//   if (likes.length > 0) {
//     return likes.find((like) => like === userId)
//       ? (
//         <>❤️{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
//       ) : (
//         <>⭐{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
//       );
//   }

//   return <>👌</>;
// };
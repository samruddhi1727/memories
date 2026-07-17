import React, { useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import useGetAllPosts from '../hooks/useGetAllPosts'
import PagePagination from './Pagination';
import { setPostDetails, setAllPosts } from "../redux/allPostSlice";
import Post from './Post.jsx'

const Posts = () => {
  useGetAllPosts();
 const {  allPosts } = useSelector((state) => state.post)

  return (
    <>
      <p>Im postttssss </p>

      {console.log("post using slice")}
      {console.log(allPosts)}

      {allPosts?.map((post) => (
        <div key={post._id}>
          <Post post={post} />
          {/* postId={post._id} */}
          {/* <img src={post.selectedFile} alt="" /><br />
          name:{post.name}<br />
          title:{post.title}<br />
          message:{post.message}<br />
          tags:{post.tags}<br />
          <button onClick={handleLike(post._id)}>Like</button>
          <Link to={`/post/${post._id}`}>show details</Link> */}
        </div>
      ))}

      <PagePagination />

    </>
  )
}
export default Posts


//const hasLikedPost = post.likes.find((like) => like === userId); const [likes, setLikes] = useState(post?.likes); <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}> <Likes /> </Button> const handleLike = async () => { dispatch(likePost(post._id)); if (hasLikedPost) { setLikes(post.likes.filter((id) => id !== userId)); } else { setLikes([...post.likes, userId]); } }; const Likes = () => { if (likes.length > 0) { return likes.find((like) => like === userId) ? (<><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? You and ${likes.length - 1} others : ${likes.length} like${likes.length > 1 ? 's' : ''} }</>) : (<><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>); } return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>; this is post component.it has userid postid haslikedpost likes state handlelike() and likes() for ui icon and like count to show.write code for me. 
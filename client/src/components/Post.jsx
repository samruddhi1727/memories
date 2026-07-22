import React, { useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

const Post = ({ post }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const bendurl = import.meta.env.VITE_BEND_URL;

  const userId = useSelector((state) => state.user.userData.id)
  const { allPosts } = useSelector((state) => state.post)

  const [likes, setLikes] = useState(post?.likes || []);
  const hasLiked = likes.includes(userId);

  const handleLike = async () => {
    try {
      if (hasLiked) {
        setLikes(likes.filter((id) => id !== userId));
      } else {
        setLikes([...likes, userId]);
      }
      await axios.patch(`${bendurl}/post/likePost/${post._id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const LikesDisplay = () => {
    if (likes.length === 0) {
      return <FaRegHeart className="like-icon" />;
    }
    if (hasLiked) {
      return (
        <>
          <FaHeart className="like-icon liked" />
          <span className="like-count">
            {likes.length > 2
              ? `You and ${likes.length - 1} others`
              : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
          </span>
        </>
      );
    }
    return (
      <>
        <FaRegHeart className="like-icon" />
        <span className="like-count">{likes.length} Likes</span>
      </>
    );
  };

  return (
    <article className="post-card">
      <header className="post-header">
        <div className="user-meta">
          <span className="username">{post.name}</span>
          <span className="time">{new Date(post.updatedAt).toISOString().split("T")[0]}</span> 
        </div>
      </header>

      <img
        src={post.selectedFile || `${bendurl}/${post.image}`}
        alt="post image"
        className="post-image"
        onClick={() => navigate(`/post/${post._id}`)}
      />

      <div className="post-actions">
        <Link to={`/post/${post._id}`}>
          <FaComment className="action-icon" />
        </Link>
        <button onClick={handleLike} className="like-btn">
          <LikesDisplay />
        </button>
      </div>

      <div className="post-body">
        <p className="caption">
          <span className="username">{post.title}</span> {post.caption}
        </p>
        <p className="tags">{post.tags?.map((t) => `#${t} `)}</p>
      </div>
    </article>

  )
}
export default Post


import React from "react"
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import useGetPostById from "../hooks/useGetPostById"
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { setAllPosts, setFormType } from "../redux/allPostSlice";
import Comments from "../components/Comments";
import { GoArrowLeft, GoKebabHorizontal } from "react-icons/go";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

const postDetails = () => {
  const params = useParams()
  useGetPostById(params.id)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  axios.defaults.withCredentials = true;
  const bendurl = import.meta.env.VITE_BEND_URL;

  const userId = useSelector((state) => state.user.userData.id)
  const { postDetails } = useSelector((state) => state.post)

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${bendurl}/post/delete/${params.id}`);

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate('/home')
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleEdit = async () => {
    try {
      dispatch(setFormType("edit"));
      navigate(`/edit/${params.id}`)
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!postDetails) return <p>Loading...</p>;

  const LikesDisplay = () => {
    if (!postDetails?.likes) return <FaRegHeart className="like-icon" />;
    const hasLiked = postDetails?.likes.includes(userId);
    return hasLiked ? <FaHeart className="like-icon liked" /> : <FaRegHeart className="like-icon" />;
  };

  return (
    <>

      <div className="post-details-page">
        <header className="top-bar">
          <GoArrowLeft size={25} onClick={() => navigate("/home")} className="back-btn" />
        </header>

        <div className="post-details-layout">
          <div className="post-section">
            <div className="post-header">
              <div className="user-meta">
                <span className="username">{postDetails.name}</span>
                <span className="time">{new Date(postDetails.updatedAt).toISOString().split("T")[0]}</span>
              </div>
              {userId === postDetails?.creator && (
                <div className="options-menu">
                  <GoKebabHorizontal size={24} className="options-icon" />
                  <ul className="dropdown">
                    <li onClick={handleEdit}>Edit</li>
                    <li onClick={handleDelete}>Delete</li>
                  </ul>
                </div>
              )}
            </div>
            <img
              src={postDetails.selectedFile || `${bendurl}/${postDetails.image}`}
              alt="post image"
              className="post-image"
            />

            <div className="post-actions">
              <FaComment className="action-icon" />
              <LikesDisplay />
            </div>

            <div className="post-body">
              <p className="likes-count"><b>{postDetails.likes.length}</b> likes</p>
              <p className="caption">
                <span className="username">{postDetails.title}</span> {postDetails.caption}
              </p>
              <p className="tags">{postDetails.tags?.map((t) => `#${t} `)}</p>
            </div>
          </div>

          <div className="comments-section">
            <Comments postDetails={postDetails} />
          </div>
        </div>
      </div>
    </>
  )
}

export default postDetails

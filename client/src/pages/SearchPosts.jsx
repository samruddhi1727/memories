import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/allPostSlice'
import useGetAllPosts from '../hooks/useGetAllPosts'
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Post from '../components/Post';

const SearchPosts = () => {
  useGetAllPosts();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const allSearchedPosts = useSelector((state) => state.post.allPosts)

  return (
    <div className="search-page">
      <header className="top-bar">
        <GoArrowLeft
          size={25} className="back-btn"
          onClick={() => { navigate("/home"); dispatch(setSearchedQuery("")); }}
        />
      </header>

      <div className="posts-container">
        {allSearchedPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>

  )
}

export default SearchPosts

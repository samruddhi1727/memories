import React from 'react'
import { useSelector } from 'react-redux'
import useGetAllPosts from '../hooks/useGetAllPosts'
import PagePagination from './Pagination';
import Post from './Post.jsx'

const Posts = () => {
  useGetAllPosts();
  const { allPosts } = useSelector((state) => state.post)

  return (
    <div className="posts-container">
      {allPosts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      <div className="pagination-container">
        <PagePagination />
      </div>

    </div>
  )
}
export default Posts

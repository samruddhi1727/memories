import React from 'react'
import useGetAllPosts from '../hooks/useGetAllPosts'
import { useSelector } from 'react-redux'

const SearchPosts = () => {
  useGetAllPosts();
  const allpostinpostsearc = useSelector((state) => state.post.allPosts)
  const sQinsp = useSelector((state) => state.post.searchedQuery)

  return (
    <div>
      search Posstsss only
      {/* {console.log("post using slice in searchposts..")}
      {console.log(allpostinpostsearc)}
      {console.log(allpostinpostsearc[0].title)}
      {console.log("searchhqueryin sp")}{console.log(sQinsp)}
      <br /><br />
      {allpostinpostsearc[0].name}<br></br>
      {allpostinpostsearc[0].title}<br />
      {allpostinpostsearc[0].message}<br />
      {allpostinpostsearc[0].tags}<br /> */}

      {allpostinpostsearc.map(post => (
        <div key={post._id}>
          <img src={post.selectedFile} alt="" /><br />
          name:{post.name}<br />
          title:{post.title}<br />
          message:{post.message}<br />
          tages:{post.tags}<br />
        </div>
      ))}
    </div>
  )
}

export default SearchPosts

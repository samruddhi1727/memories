import React from 'react'
import useGetUserData from '../hooks/useGetUserData'
import { useDispatch } from 'react-redux'
import { setSearchedQuery, setPage } from '../redux/allPostSlice'
import Posts from '../components/Posts'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetUserData();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSearch = async (data) => {
    try {
      const { searchvalue } = data;
      dispatch(setPage(1));
      dispatch(setSearchedQuery(searchvalue))
      navigate('/posts/search')
    } catch (error) { toast.error(error.message) }
  }

  return (
    <div className="home-page">

      <div className="search-bar">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a8a8a8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <form onSubmit={handleSubmit(onSearch)} className="search-form">
          <input
            type="text"
            placeholder="Search for anything.."
            {...register("searchvalue", { required: true })}
          />
          <button type="submit" disabled={isSubmitting} className="search-btn">
            Search
          </button>
        </form>
      </div>

      <Posts />
    </div>
  )
}

export default Home

  // < div className = "HomeContainer" >
  //       <p>Find anything you want</p>
  //       <form onSubmit={handleSubmit(onSearch)}>
  //         <input placeholder="search.." type="text"
  //           {...register("searchvalue", {
  //             required: { value: true, message: "This field is required", },

  //           })}
  //         ></input>
  //         <button className="btn" type="submit" disabled={isSubmitting}>Search</button>
  //       </form>
  //     </div >
  // <Posts /> 
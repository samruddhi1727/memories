import React, { useState } from 'react'
import useGetUserData from '../hooks/useGetUserData'
import useGetAllPosts from '../hooks/useGetAllPosts'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchedQuery,setPage } from '../redux/allPostSlice'
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
      navigate('/searchPosts')
    } catch (error) { toast.error(error.message) }
  }
  return (
    <>
      Homee
      <form onSubmit={handleSubmit(onSearch)}>
        <input placeholder="search.." type="text"
          {...register("searchvalue", {
            required: { value: true, message: "This field is required", },

          })}
        ></input>
        <button className="btn" type="submit" disabled={isSubmitting}>Searchh</button>
      </form>
    
      <Posts />
    </>
  )
}

export default Home

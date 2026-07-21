import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import useGetUserData from '../hooks/useGetUserData';

const Login = () => {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const bendurl = import.meta.env.VITE_BEND_URL;

  const [state, setState] = useState('SignUp');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmitHandler = async (data) => {
    try {
      const { name, email, password } = data;
      axios.defaults.withCredentials = true

      if (state === 'SignUp') {
        const { data } = await axios.post(bendurl + '/auth/signup', { name, email, password })
        if (data.success) {

          setTimeout(() => {
            navigate('/home')
          }, 1000);
          toast.success("Sign Up successfully");
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(bendurl + '/auth/signin', { email, password })
        if (data.success) {
          setTimeout(() => {
            navigate('/home')
          }, 1000);
          toast.success("Sign In successfully");
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (

    <div className="login-page">
      <div className="login-form-wrapper">
        {isSubmitting && <p className="login-loading">Loading...</p>}

        <h2 className="login-title">
          {state === "SignUp" ? "Create Account" : "Login"}
        </h2>
        <p className="login-subtitle">
          {state === "SignUp" ? "Create your account" : "Login to your account"}
        </p>

        <form className="login-form" onSubmit={handleSubmit(onSubmitHandler)}>
          {state === "SignUp" && (
            <>
              <input
                placeholder="Name"
                type="text"
                {...register("name", {
                  required: "This field is required",
                  minLength: { value: 3, message: "Minimum 3 characters required" },
                  maxLength: { value: 25, message: "Maximum 25 characters allowed" },
                  pattern: { value: /^[A-Za-z ]+$/, message: "Only letters and spaces allowed" },
                })}
              />
              {errors.name && <p className="login-error">{errors.name.message}</p>}
            </>
          )}

          <input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "This field is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
          />
          {errors.email && <p className="login-error">{errors.email.message}</p>}

          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "This field is required",
            })}
          />
          {errors.password && <p className="login-error">{errors.password.message}</p>}

          <button className="login-btn" type="submit" disabled={isSubmitting}>
            {state}
          </button>

          <p className="login-toggle">
            {state === "SignUp" ? (
              <>have an account? <span onClick={() => setState("Login")}>Login here</span></>
            ) : (
              <>Don't have an account? <span onClick={() => setState("SignUp")}>Sign up</span></>
            )}
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login

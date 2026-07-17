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
            navigate('/posts')
          }, 1000);
          toast.success("Sign Up successfully");
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(bendurl + '/auth/signin', { email, password })
        if (data.success) {
          setTimeout(() => {
            navigate('/posts')
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
    <>
      <div className="bodyy">
        <div className="formContainer">
          {isSubmitting && <p className="InputFieldError">Loading...</p>}
          <h2>{state === 'SignUp' ? 'Create Account ' : 'Login'}</h2>
          <p>{state === 'SignUp' ? 'Create your account ' : 'Login to your account'}</p>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            {state === 'SignUp' && (
              <>
                <input placeholder="Name" type="text"
                  {...register("name", {
                    required: { value: true, message: "This field is required", },
                    minLength: { value: 3, message: "Minimum 3 characters required", },
                    maxLength: { value: 25, message: "Maximum 25 characters allowed", },
                    pattern: { value: /^[A-Za-z]+$/, message: "Only letters and spaces allowed", },
                  })}
                ></input> {errors.name && <p className="InputFieldError">{errors.name.message}</p>}
              </>
            )}

            <input placeholder="Email" type="email" {...register("email", {
              required: { value: true, message: "This field is required", },
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format", },
            })}></input> {errors.email && <p className="InputFieldError">{errors.email.message}</p>}


            <input placeholder="Password" type="password"
              {...register("password", {
                required: { value: true, message: "This field is required", },

              })}
            ></input> {errors.password && <p className="InputFieldError">{errors.password.message}</p>}
            <button className="btn" type="submit" disabled={isSubmitting}>{state}</button>

            {state === 'SignUp' ? (<p> have an account ?? <span style={{ color: 'blue' }} onClick={() => setState('Login')}>Login here</span></p>)
              : (<p>Don't have an account? <span style={{ color: 'blue' }} onClick={() => setState('SignUp')}>Sign up</span></p>)}

          </form>
        </div>
      </div>
    </>
  )
}

export default Login

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { IoAddOutline } from "react-icons/io5";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { setFormType } from '../redux/allPostSlice';

const Navbar = () => {

  const user = useSelector((state) => state.user.userData)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const bendurl = import.meta.env.VITE_BEND_URL;

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true

      const { data } = await axios.post(bendurl + '/auth/logout')
      if (data.success) {
        setTimeout(() => {
          navigate('/')
        }, 1000);
        toast.success(data.message);
      } else {
        toast.error(data.message)
      }
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <nav className="navbar">
        <div className="nav-user-wrapper">
          <span className="nav-user">{user.name}</span>
          <div className="user-menu">
            <ul>
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        </div>

        <Link to={'/create'} onClick={() => { dispatch(setFormType("create")); }}>
          <IoAddOutline size={25} />
        </Link>

      </nav>
    </>
  )
}

export default Navbar


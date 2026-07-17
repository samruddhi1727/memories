import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

const Navbar = () => {
const usersam = useSelector((state) => state.user.userData)
  return (
    <div>
      navbar
userdata from Navbar :{usersam.name}
<Link to={`/create`}>create new post</Link>
    </div>
  )
}

export default Navbar

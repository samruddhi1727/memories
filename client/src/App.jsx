import React from 'react';
import { Toaster } from "react-hot-toast";
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostDetails from './pages/PostDetails.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SearchPosts from './pages/SearchPosts.jsx';
import Create from './pages/Create.jsx';
import { useSelector } from 'react-redux'

const App = () => {
  const user = useSelector((state) => state.user.userData)
  return (
    <>
      <Toaster />

      {user && (<Navbar />)}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/posts/search" element={<SearchPosts />} />
        <Route path="create" element={<Create />} />
        <Route path="edit/:id" element={<Create />} />
      </Routes>

    </>
  );
};

export default App;


/*
import React from 'react'

const App = () => {
  return (
    <div>
      hello
    </div>
  )
}

export default App
*/
import React from 'react';
import { Toaster } from "react-hot-toast";
import {Navigate, BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import PostDetails from './pages/PostDetails.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx'
import SearchPosts from './pages/SearchPosts.jsx';
import Create from './pages/Create.jsx';
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
 
  return (
    
      <>
        <Toaster/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/posts"  element={<Home />} />
          <Route path="/posts/search"  element={<Home />} />
          <Route path="/post/:id"  element={<PostDetails />} />
          <Route path="/searchPosts"  element={<SearchPosts />} />
          <Route path="create" element={<Create />} />
          <Route path="edit/:id" element={<Create />} />
          <Route path="/auth" exact component={() => (!user ? <Login /> : <Navigate to="/posts" />)} />
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
import React from 'react';
import { Container } from '@mui/material';
import {Navigate, BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import PostDetails from './pages/PostDetails.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/login/Login.jsx'
import CreatorOrTag from './pages/CreatorOrTag.jsx';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
 
  return (
    
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts"  element={<Home />} />
          <Route path="/posts/search"  element={<Home />} />
          <Route path="/posts/:id"  element={<PostDetails />} />
          <Route path="/creators/:name"  element={<CreatorOrTag />} />
          <Route path="/tags/:name"  element={<CreatorOrTag />} />
          <Route path="/auth" exact component={() => (!user ? <Login /> : <Navigate to="/posts" />)} />
        </Routes>
      </Container>
    
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
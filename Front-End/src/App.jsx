import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import FallBack from './pages/FallBack.jsx';
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

import Signup from './components/Signup.jsx';
import Navigator from './pages/Navigator.jsx';
import Login from './components/Login.jsx';
import {Toaster} from "react-hot-toast"
import Developer from './components/Developer.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
const App = () => {
  const { scrollYProgress } = useScroll();
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"
      />
      <Navigator />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path = '/signup' element={<Signup />} />
        <Route path = '/login' element={<Login />} />
        <Route path = '*' element={<FallBack />} />
        <Route path = '/developer/:username' element={
          <ProtectedRoute>
          <Developer />
          </ProtectedRoute>
          } />
      </Routes>
    </Router>
  )
}

export default App
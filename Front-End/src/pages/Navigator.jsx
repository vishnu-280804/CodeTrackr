import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';
import.meta.env.VITE_API_URL

import logo from '../assets/logo.png';

const Navigator = () => {
  const { loggedin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="bg-black w-full h-[60px] flex items-center justify-between px-4 sm:px-8 relative">
      
      {/* Logo (left) */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 sm:h-10" />
      </div>

      {/* Center title - visible on all screens */}
      <div className="text-white font-bold text-lg sm:text-xl font-['Oswald'] mx-auto md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
        CodeTrackr
      </div>

      {/* Nav links (right) */}
      <div className="flex gap-4 text-white text-sm sm:text-lg font-semibold font-['Oswald']">
        <Link to="/">Home</Link>
        {!loggedin && <Link to="/signup">Signup</Link>}
        {loggedin ? (
          <p onClick={handleLogout} className="cursor-pointer">Logout</p>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navigator;

import React from 'react'
import { useState } from 'react'
import.meta.env.VITE_API_URL;

import axios from 'axios';
import { useEffect } from 'react';
const ProtectedRoute = ({children}) => {
  const [isAuth,setAuth] = useState(null);
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/api/protect-route`,{withCredentials:true})
    .then((res)=>setAuth(true))
    .catch(()=>setAuth(false));
  },[]);

   if(isAuth === null) return <p>Loading...</p>
   if(isAuth === false) return <h1>You are unauthorized user</h1>
   return children;
}

export default ProtectedRoute;
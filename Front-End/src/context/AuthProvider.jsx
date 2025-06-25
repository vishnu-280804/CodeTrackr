import { createContext,useContext,useState,useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [loggedin,setLoggedin] = useState(false);
  
useEffect(() => {
  const checkLogin = async()=>{
    try {
        const res = await axios.get("http://localhost:3000/api/protect-route",{withCredentials:true});

        setLoggedin(true);
    } catch (error) {
        console.log(error);
        setLoggedin(false);
    }
  }
  
    checkLogin();
  }, []);

  const logout = async ()=>{
    try {
      const res = await axios.post("http://localhost:3000/api/logout",{},{withCredentials:true});
      setLoggedin(false);
      console.log(res);

    } catch (error) {
      console.log(error);
    }
    
  }
  

  return (
    <AuthContext.Provider value={{loggedin,setLoggedin,logout}}>
            {children}
    </AuthContext.Provider>
  )
}

export const useAuth = ()=>useContext(AuthContext);
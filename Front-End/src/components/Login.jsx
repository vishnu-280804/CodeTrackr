import React,{useState} from 'react';
import axios from "axios";
import { useAuth } from '../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const {setLoggedin} = useAuth();
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/login",{
                username,password
            },{withCredentials:true});
            console.log(res);
            setLoggedin(true);
            toast.success('Login successful! 👋');

            navigate(`/developer/${username}`);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Login failed! ❌');
        }
    }

   return (
    <div className='bg-[#c8c8cc]'>
        <div className='h-screen flex items-center justify-center bg-gray'>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow flex flex-col gap-4 w-80">
                <h2 className='text-xl font-bold text-center'>
                    Login
                </h2>
                <input type="text"
                    name='username'
                    className='p-2 rounded border'
                    value={username}
                    onChange={(e)=>setUserName(e.target.value)}
                    placeholder='Enter the username'
                    required
                />
                <input type="password"
                    name='password'
                    className='p-2 rounded border'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder='Enter the password'
                    required
                />
                <button type='submit' className='bg-black cursor-pointer text-white rounded py-2 hover:bg-white hover:text-black'>
                    Login
                </button>

            </form>

        </div>
    </div>
  )
}

export default Login
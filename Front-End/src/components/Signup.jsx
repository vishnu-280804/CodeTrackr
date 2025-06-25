import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    // const [username,setUserName] = useState("");
    // const [email,setEmail] = useState("");
    // const [password,setPassword] = useState("");
    // const [lc,setLC] = useState("");
    // const [github,setGitHub] = useState("");
    // const [codeforces,setCodeforces] = useState("");

    const [allValues,setAllValues] = useState({
        username:'',
        email:'',
        password:'',
        lc:'',
        github:'',
        codeforces:'',
        twitter:''
    });

    const changeHandler = (e)=>{
        setAllValues({...allValues,[e.target.name]:e.target.value});
        
    }
    async function handleSubmit(e){
        e.preventDefault();
        try {
           const res = await axios.post("http://localhost:3000/api/signup",allValues,{withCredentials:true});
           console.log(res);
           toast.success('Registered successful! 👋');
           navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Register failed! ❌');
        }
    }
    

  return (
    <div className='bg-[#c8c8cc] min-h-screen'>
    <div >
        <div className='h-screen bg-gray justify-center flex items-center flex-col'>
            <form action="" className="bg-white p-6 rounded shadow flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
                <h2 className='text-xl text-center font-bold'>
                    Signup

                </h2>
                <input type="email"
                    name='email'
                    className='p-2 rounded border'
                    value={allValues.email}
                    onChange={changeHandler}
                    placeholder='Enter the email'
                    required
                />
                <input type="text"
                    name='username'
                    className='p-2 rounded border'
                    value={allValues.username}
                    onChange={changeHandler}
                    placeholder='Enter the username'
                    required
                />
                <input type="password"
                    name='password'
                    className='p-2 rounded border'
                    value={allValues.password}
                    onChange={changeHandler}
                    placeholder='Enter the password'
                    required
                />
                <input type="text"
                    name='lc'
                    className='p-2 rounded border'
                    value={allValues.lc}
                    onChange={changeHandler}
                    placeholder='Enter the LeetCode Username'
                    required
                />
                <input type="text"
                    name='github'
                    className='p-2 rounded border'
                    value={allValues.github}
                    onChange={changeHandler}
                    placeholder='Enter the GitHub Username'
                    required
                />
                <input type="text"
                    name='codeforces'
                    className='p-2 rounded border'
                    value={allValues.codeforces}
                    onChange={changeHandler}
                    placeholder='Enter the Username of Codeforces'
                    required
                />
                <input type="text"
                    name='twitter'
                    className='p-2 rounded border'
                    value={allValues.twitter}
                    onChange={changeHandler}
                    placeholder='Enter the username of X(Twitter)'
                    required
                />
                <button type='submit' className='bg-black cursor-pointer text-white rounded py-2 hover:bg-white hover:text-black'>
                    Register
                </button>
            </form>

        </div>

    </div>
    </div>
  )
}

export default Signup
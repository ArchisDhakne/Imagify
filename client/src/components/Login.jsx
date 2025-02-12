import { useContext, useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext";
import {motion} from 'framer-motion'
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {
    const [state,setState] = useState('Login');
    const {setShowLogin,setToken,setUser} = useContext(AppContext);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSubmitHandler = async(e) =>{
         
        e.preventDefault();
        try {
           if(state === 'Login'){
           const {data} = await axios.post("https://imagifys.onrender.com" + '/api/user/login',{email:email,password:password})
            
           if(data.success){
            console.log(data);

                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token',data.token);
                    setShowLogin(false);
                    toast.success("Login successfull")

           }else{
            toast.error(data.message);

           }
        }else{

            const {data} = await axios.post("https://imagifys.onrender.com" + '/api/user/register',{name:name,email:email,password:password})
            
            if(data.success){
                
                     setToken(data.token);
                     setUser(data.user);
                     localStorage.setItem('token',data.token);
                     setShowLogin(false);
                     toast.success("Signup successful")
            }else{
             toast.error(data.message);
            }
        }  
        } catch (error) {

            toast.error(error.message);

        }

    }
    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.body.style.overflow = 'unset';
        }
    },[])
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 backdrop-blusr-sm bg-black/30 flex justify-center items-center ">
        
     <motion.form onSubmit={onSubmitHandler}
        initial={{opacity:0.2,y:50}}
        transition={{duration:0.5}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
     action="" className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text--neutral-700 font-medium">{state}</h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
       { state !== 'Login' && <div className="border px-6 py-2 flex items-center gap-2  rounded-full mt-4 hover:scale-105">
            <img width={32} src={assets.profile_icon} alt="" />
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Full name"  required className="outline-none text-sm"/>
        </div>}
        <div className="border px-8 py-4 flex items-center gap-2  rounded-full mt-5 hover:transition-all hover:scale-105 ">
            <img width={24} src={assets.email_icon} alt="" />
            <input onChange={(e)=>setEmail(e.target.value)} value={email}  type="email" placeholder="Email id"  required className="outline-none text-sm"/>
        </div>
        <div className="border px-6 py-3 flex items-center gap-2  rounded-full mt-4 hover:scale-105">
            <img width={22} src={assets.lock_icon} alt="" />
            <input onChange={(e)=>setPassword(e.target.value)} value={password}  type="password" placeholder="Password"  required className="outline-none text-sm"/>
        </div>
     
     <p className="text-sm text-blue-600 my-4 cursor-pointer">Forget password?</p>

    <button className="bg-blue-600 w-full text-white py-2 rounded-full">{state === 'Login' ? 'login' : 'create account'}</button>
       
     { state === 'Login' ? <p className="mt-5 text-center">Don't have an account? <span onClick={()=>setState('Sign Up')} className="text-blue-600 cursor-pointer hover:underline">Sign up</span></p>
     : <p className="mt-5 text-center">Already have an account? <span onClick={()=>setState('Login')} className="text-blue-600 cursor-pointer hover:underline">Login</span></p>
      }
     <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className="absolute top-5 right-5 cursor-pointer "/>
     </motion.form>

    </div>
  )
}

export default Login
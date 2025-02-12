import { createContext,useEffect,useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) =>{
    const [user,setUser] = useState(null);
    const [showLogin,setShowLogin] = useState(true);
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [credit,setCredit] = useState(false)
    const backendURL = import.meta.env.VITE_BACKEND_URL || "https://imagifys.onrender.com" ;
    const navigate = useNavigate()

    const loadCreditData = async ()=>{
     try {
        const { data} = await axios.get(backendURL+'/api/user/credits',{headers:{token}})
        if(data.success){
            setCredit(data.credits)
            setUser(data.user);
        }
     } catch (error) {
        console.log(error);
        toast.error(error.message)
        
     }
    }


 const generateImage = async(prompt)=>{

    try {

       const {data} = await axios.post(backendURL+'/api/image/generate-image',{prompt},{headers:{token}});
        
       if(data.success){
        loadCreditData()
        return data.resultImage
       }else{
        toast.error(data.message)
        loadCreditData()
        if(data.creditBalance === 0){
             navigate('/buy');
        }
       }
    } catch (error) {
        toast.error(error.message)
    }

 }
    const logout = () =>{
        localStorage.removeItem('token');
        setToken('');
        setUser(null)
        navigate('/')
    }

    useEffect(()=>{
        if(token){
            loadCreditData()
        }
    },[token])

    const value = {
        user,setUser,
        showLogin,setShowLogin,
        backendURL,token,setToken,
        credit,setCredit,loadCreditData,
        logout,generateImage
    }
    
    return(
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
import { createContext,useContext,useState,useEffect } from "react";
import { loginUser,registerUser } from "../api/authApi";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const[user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const token=localStorage.getItem("access_token")
        const storedUser=localStorage.getItem("user")

        if (token && storedUser){
            try{
                setUser(JSON.parse(storedUser))
            }catch(err){
                console.error("User parse failed:",err)
                localStorage.removeItem("user")
            }
        }
        setLoading(false)
    },[])

    const signup=async(formData)=>{
        const response=await registerUser(formData)
        return response
    }

    const login=async(formData)=>{
        const data=await loginUser(formData)

        localStorage.setItem("access_token",data.access_token);
        setUser(data.user)

        return data
    }

    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user,loading,signup,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
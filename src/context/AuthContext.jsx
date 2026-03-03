import { createContext,useContext,useState,useEffect } from "react";
import { loginUser,registerUser } from "../api/authApi";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [isAuthenticated,setIsAuthenticated]=useState(!!localStorage.getItem("token"))
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
        if (response.access_token){
            localStorage.setItem("token",response.access_token)
            setIsAuthenticated(true)
        }
        return response
    }

    const login=async(formData)=>{
        const data=await loginUser(formData)

        localStorage.setItem("access_token",data.access_token);
        setIsAuthenticated(true)
        setUser(data.user)

        return data
    }

    const logout = () => {
        localStorage.removeItem("access_token");
        setIsAuthenticated(false)
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user,loading,isAuthenticated,signup,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
import { Link } from "react-router-dom"
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorHandler";

const Login = () => {
const {login}=useAuth()
const navigate=useNavigate()

const[formData,setFormData]=useState({
  email:"",
  password:"",
})
const[message,setMessage]=useState("")

const handleSubmit=async (e)=>{
  e.preventDefault()
  try{
    await login(formData)
    setMessage("✅ Login successful")

    setTimeout(()=>{
      navigate("/my_notes")
    },800)
  }catch(err){
    const errMessage=getErrorMessage(err)
    setMessage(`❌ ${errMessage}`)
  }
}

  return(
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-neutral-200">

  <div className="relative w-full max-w-sm bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
    <div className="flex items-center justify-center mb-6">
        <i className="fa-solid fa-user text-3xl px-3"></i> 
    <h2 className="text-3xl font-bold text-gray-800">
      Login
    </h2>
    </div>

    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        onChange={(e)=>setFormData({...formData,email:e.target.value})}
        required />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        onChange={(e)=>setFormData({...formData,password:e.target.value})}
      required />

  <button className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-blue-400 to-purple-600 hover:cursor-pointer text-neutral-100 py-2 rounded-lg transition mt-2" type="submit">
    <i className="fa-solid fa-arrow-right-to-bracket text-lg font-semibold"></i>
    <span className="text-lg font-semibold hover:cursor-pointer">
        Login
      </span>
  </button>

      <div className="flex flex-col items-center mt-6">
            <h5 className="font-semibold">Don't have an account?</h5>
            <Link to="/Signup" className="font-semibold hover:underline hover:cursor-pointer hover:text-purple-700 mt-1">Signup here</Link>
      </div>
         {message && (
                    <p className="text-center text-sm text-gray-600 mt-2">
                        {message}
                    </p>
                )}
    </form>
  </div>
</div>
  );
};

export default Login;
import { Link } from "react-router-dom"
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
const {login}=useAuth()
const navigate=useNavigate()

const[formData,setFormData]=useState({
  email:"",
  password:"",
})

const handleSubmit=async (e)=>{
  e.preventDefault()
  try{
    const data=await login(formData)
    navigate("/my_notes")
  }catch(err){
    console.log(err)
    alert("Login Failed")
  }
}

  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-neutral-200">

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
        className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        onChange={(e)=>setFormData({...formData,email:e.target.value})}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        onChange={(e)=>setFormData({...formData,password:e.target.value})}
      />
  <div className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-blue-300 to-purple-600 hover:cursor-pointer text-neutral-100 py-2 rounded-lg transition mt-2">
    <i className="fa-solid fa-arrow-right-to-bracket text-lg font-semibold"></i>
    <button className="text-lg font-semibold hover:cursor-pointer" type="submit">
        Login
      </button>
  </div>

      <div className="flex flex-col items-center mt-6">
            <h5 className="font-semibold">Don't have an account?</h5>
            <Link to="/Signup" className="font-semibold hover:underline hover:cursor-pointer hover:text-purple-700 mt-1">Signup here</Link>
      </div>
    </form>
  </div>
</div>
  );
};

export default Login;
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Signup = () => {
  const {signup}=useAuth()
  const navigate=useNavigate()

  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
  })

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const data=await signup(formData)
      navigate('/dashboard')
    }catch(err){
      console.log(err)
      alert("Something went wrong")
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-neutral-200">

  <div className="relative w-full max-w-sm bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
    <div className="flex items-center justify-center mb-6">
        <i className="fa-solid fa-user text-3xl px-3"></i> 
    <h2 className="text-3xl font-bold text-gray-800">
        Signup
    </h2>
    </div>

    <form className="space-y-4" onSubmit={handleSubmit}>
        <input
        type="name"
        placeholder="Username"
        className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        onChange={(e)=>setFormData({...formData,name:e.target.value})}
      />

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
        Signup
      </button>
  </div>

      <div className="flex flex-col items-center mt-6">
            <h5 className="font-semibold">Already have an account?</h5>
            <Link to="/Login" className="font-semibold hover:underline hover:cursor-pointer hover:text-purple-700 mt-1">Login here</Link>
      </div>
    </form>
  </div>
</div>
  );
};

export default Signup;
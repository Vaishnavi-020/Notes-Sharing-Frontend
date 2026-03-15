import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UploadNote=()=>{
    const {user,loading:authLoading}=useAuth()
    const navigate=useNavigate()

    useEffect(()=>{
        if(!authLoading && !user){
            navigate("/login")
        }
    },[user,authLoading,navigate])

    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [subject,setSubject]=useState("")
    const [isPrivate,setIsPrivate]=useState(true)
    const [file,setFile]=useState(null)
    const[loading,setLoading]=useState(false)
    const [message,setMessage]=useState("")

    if (authLoading) {
    return <p className="text-center mt-10">Checking authentication...</p>;
    }

    if (!user) {
    return null;
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if (!user) {
        setMessage("❌ Please login first");
        navigate("/login");
        return;
                    }
        if(!file){
            setMessage("Please select a file")
            return
        }
        try{
            setLoading(true)
            setMessage("")
            const formData=new FormData()
            formData.append("title",title)
            formData.append("description",description)
            formData.append("subject",subject)
            formData.append("is_private",isPrivate)
            formData.append("file",file)

            const token=localStorage.getItem("access_token")
            const res=await fetch(`${import.meta.env.VITE_API_URL}/notes/upload`,{
                method:"POST",
                headers:{
                    Authorization:  `Bearer ${token}`
                },
                body: formData,
            });
            const data=await res.json()
            if(!res.ok){
                throw new Error(data.detail || "Upload Failed")
            }
            setMessage("✅ Note uploaded successfully")
            setTimeout(() => {
            navigate("/my_notes")
            }, 800)
            setTitle("")
            setDescription("")
            setSubject("")
            setFile(null)
        }catch(err){
            setMessage(`❌ ${err.message}`)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow mb-20">
            <h2 className="text-2xl font-bold mb-4">Upload Note</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)} 
                className="border p-2 rounded"
                required/>

                <textarea 
                placeholder="Enter description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className="border p-2 rounded"
                rows={4}
                required />

                <input 
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e)=>setSubject(e.target.value)}
                className="border p-2 rounded"
                required/>

                <div className="flex items-center justify-between border p-3 rounded">
                <span className="font-medium">
                    {isPrivate ? "🔒 Private Note" : "🌍 Public Note"}
                </span>

                <button
                    type="button"
                    onClick={() => setIsPrivate(prev => !prev)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                    isPrivate ? "bg-blue-500" : "bg-gray-300"
                    }`}
                >
                    <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                        isPrivate ? "translate-x-6" : "translate-x-0"
                    }`}
                    />
                </button>
                </div>

                <input 
                type="file"
                onChange={(e)=>setFile(e.target.files[0])}
                className="border p-2 rounded hover:cursor-pointer"
                required/>
                
                <button type="submit"
                disabled={loading}
                className="bg-gradient-to-br from-blue-400 to-violet-800 text-white py-2 hover:cursor-pointer disabled:opacity-50">
                    {loading?"Uploading...":"Upload Note"}
                </button>
                {message && (
                    <p className="text-center text-sm text-gray-600 mt-2">
                        {message}
                    </p>
                )}
            </form>
        </div>
    )
}

export default UploadNote
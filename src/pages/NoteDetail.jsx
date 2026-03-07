import { useParams } from "react-router-dom"
import { use, useEffect,useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

const NoteDetail=()=>{

    const navigate=useNavigate()
    const {id}=useParams()
    const [note,setNote]=useState(null)
    const [showConfirm,setShowConfirm]=useState(false)
    const [showAI,setShowAI]=useState(false)
    const [loading,setLoading]=useState(false)
    const[question,setQuestion]=useState("")
    const [messages,setMessages]=useState([])

    useEffect(()=>{
        fetchNote()
    },[])

    const fetchNote=async()=>{
        try{
            const res=await api.get(`/notes/${id}`)
            setNote(res.data)
        }catch(err){
            console.error("Error fetching note",err)
        }
    }

    const handleOpen=()=>{
        window.open(
             `http://127.0.0.1:8000/notes/${id}/download`,
             "_blank"
        )
    }

    const handleDelete=async()=>{
        try{
            await api.delete(`/notes/${id}`)
            setShowConfirm(false)
            navigate('/My_Notes')
        }catch(err){
            console.error("Error deleting note",err)
        }
    }

    const askAI=async()=>{
        if (!question.trim()) return
        try{
            setLoading(true)
            setMessages(prev=>[...prev,
                {role:"user",text:question}
            ])
            const result=await api.post(`/ai/ask/${id}`,{
                 question:question
            })
            setMessages(prev=>[
                ...prev,{role:"ai",text:result.data}
            ]) 

            setQuestion("")
        }catch(err){
            console.error("Error asking AI:",err)
        }finally{
            setLoading(false)
        }
    }

    if (!note) return<p>Loading...</p>

    return (
        <>
         <div className="min-h-screen max-w-xl mx-auto px-19 py-10 shadow-lg rounded my-25 border flex flex-col justify-between">

      <h3 className="text-5xl font-bold mb-4 capitalize">{note.title}</h3>

      <p className="text-gray-500 font-semibold text-lg mt-4 mb-4">
        Subject: {note.subject}
      </p>

      <p className="mb-4">
        Description: {note.description}
      </p>

      <p className="text-sm text-gray-500 mb-5">
        Created at: {new Date(note.created_at).toLocaleDateString()}
      </p>

            <button
            onClick={handleOpen}
            className="mt-2 mb-8 px-3 py-1 bg-gradient-to-br from-indigo-400 to-violet-700 text-stone-100 rounded hover:cursor-pointer"
            >
                Open / Download
            </button>
        <div className="flex justify-between items-center mt-5 text-gray-500 font-semibold text-sm px-10">
            <button className="bg-green-600 text-white rounded p-3 hover:bg-green-700 hover:cursor-pointer"
            onClick={()=>setShowAI(prev=>!prev)}>
            <i className="fa-solid fa-robot mr-2"></i>
            <span>Ask AI</span>
            </button>
            <button className="rounded bg-red-600 text-gray-100 hover:bg-red-700 hover:text-white hover:cursor-pointer p-3" 
            onClick={()=>setShowConfirm(true)}>Delete Note</button>
        </div>

        {showAI && (
            <div className="fixed right-0 top-0 h-full w-96 bg-gray-50 shadow-lg flex flex-col z-50">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                   `{messages.map((msg,index)=>(
                    <div key={index}
                    className={`p-3 rounded-lg max-w-xs ${
                msg.role === "user"
                ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white ml-auto"
                : "bg-gray-100 text-gray-800"
                }`}>
                {msg.text}
                </div>
                   ))}
                </div>
                <div className="flex gap-2 my-2 mx-1">
                    <input 
                    type="text"
                    value={question}
                    onChange={(e)=>setQuestion(e.target.value)}
                    onKeyDown={(e)=>e.key==="Enter" && askAI()}
                    placeholder="Ask AI about this note"
                    className="border p-2 rounded w-full"/>
                
                <button className="bg-green-500 text-white rounded p-3 hover:cursor-pointer"
                onClick={askAI}
                disabled={loading}>
                    {loading?"Thinking...":"Ask"}
                </button>
                </div>
            </div>
        )}





        {showConfirm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-3">
                        Delete Note?
                    </h2>    
                    <p className="mb-4">
                        Are you sure you want to delete this note?
                    </p>
                    <div className="flex gap-3 justify-end">
                        <button className="px-3 py-1 border rounded hover:cursor-pointer" onClick={()=>setShowConfirm(false)}>Cancel</button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:cursor-pointer" onClick={handleDelete}>Delete</button>
                        </div>
            </div>
            </div>
        )}


        </div>
        </>
    )
}

export default NoteDetail
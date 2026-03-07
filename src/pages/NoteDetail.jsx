import { useParams } from "react-router-dom"
import { use, useEffect,useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import AIChatBox from "../components/AiChatBox"

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

    // const handleDelete=async()=>{
    //     try{
    //         await api.delete(`/notes/${id}`)
    //         setShowConfirm(false)
    //         navigate('/My_Notes')
    //     }catch(err){
    //         console.error("Error deleting note",err)
    //     }
    // }

    // const askAI=async()=>{
    //     if (!question.trim()) return
    //     try{
    //         setLoading(true)
    //         setMessages(prev=>[...prev,
    //             {role:"user",text:question}
    //         ])
    //         const result=await api.post(`/ai/ask/${id}`,{
    //              question:question
    //         })
    //         setMessages(prev=>[
    //             ...prev,{role:"ai",text:result.data}
    //         ]) 

    //         setQuestion("")
    //     }catch(err){
    //         console.error("Error asking AI:",err)
    //     }finally{
    //         setLoading(false)
    //     }
    // }

    if (!note) return<p className="min-h-screen text-xl text-stone-700 p-5">Loading...</p>

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
            <AIChatBox note={note} />
        )}

        </div>
        </>
    )
}

export default NoteDetail
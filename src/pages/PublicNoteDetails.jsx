import { useState,useEffect } from "react";
import AIChatBox from "../components/AiChatBox";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const PublicNoteDetails=()=>{
    const {id}=useParams()
    const [showAI,setShowAI]=useState(false)
    const [note,setNote]=useState(null)

    const handleOpen=()=>{
        window.open(
            `${import.meta.env.VITE_API_URL}/notes/${id}/download`,
            "_blank"
        )
    }

    useEffect(()=>{
        const fetchNote=async()=>{
            try{
                const res=await api.get(`/notes/${id}`)
                setNote(res.data)
            }catch(err){
                console.error("Error fetching note",err)
            }
        }
        fetchNote()
    },[id])

    if (!note) return <p className="min-h-screen">Loading...</p>

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
        className="mt-2 mb-4 px-3 py-1 bg-gradient-to-br from-indigo-400 to-violet-700 text-stone-100 rounded hover:cursor-pointer"
        >
            Open / Download
        </button>
        <div className="flex justify-center items-center text-gray-500 font-semibold text-sm">
            <button className="bg-green-600 text-white rounded p-3 hover:bg-green-700 hover:cursor-pointer"
            onClick={()=>setShowAI(prev=>!prev)}>
            <i className="fa-solid fa-robot mr-2"></i>
            <span>Ask AI</span>
            </button>

        </div>
        {showAI && (
            <AIChatBox note={note} />
        )}
        </div>
        </>
    )
}

export default PublicNoteDetails
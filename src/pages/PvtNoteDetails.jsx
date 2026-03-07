import { useState,useEffect } from "react";
import AIChatBox from "../components/AiChatBox";
import DeleteModal from "../components/DeleteModal";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const PvtNoteDetails=()=>{
    const {id}=useParams()
    const [note,setNote]=useState(null)
    const [showAI,setShowAI]=useState(false)
    const [showConfirm,setShowConfirm]=useState(false)

    const navigate=useNavigate()

    const handleOpen=()=>{
        window.open(
            `http://127.0.0.1:8000/notes/${note.id}/download`,
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

    if (!note) return <div className="min-h-screen">Loading...</div>

    const handleDelete=async ()=>{
        try{
        await api.delete(`/notes/${id}`)
        navigate("/my_notes")
        }catch(err){
            console.error("Error deleting note",err)
        } finally{
            setShowConfirm(false)
        }
    }

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
        <div className="flex justify-between items-center mt-5 text-gray-500 font-semibold text-sm px-5">
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

        {showConfirm && (
            <DeleteModal onConfirm={handleDelete}
                       onCancel={()=>setShowConfirm(false)} />
        )}
        </>
    )
}

export default PvtNoteDetails
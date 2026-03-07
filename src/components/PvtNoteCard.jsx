import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

const PvtNoteCard=({note})=>{
    
     
    const navigate=useNavigate()

    const [showConfirm,setShowConfirm]=useState(false)

    const handleDelete=()=>{
        onDelete(note.id)
        setShowConfirm(false)
    }

    return(
        <>
        <button className="rounded-lg p-4 shadow-xl transition duration-150 ease-in-out hover:shadow-2xl hover:cursor-pointer"
         onClick={()=>navigate(`/notes/${note.id}`)}>
            <h3 className="capitalize text-stone-600 font-bold text-lg mb-4">{note.title}</h3>
            <p className="font-semibold text-sm text-gray-500 mb-4">Subject: {note.subject}</p>
            <p className="font-semibold text-sm text-gray-600 mt-2 line-clamp-2">Description: {note.description}</p>
            <p className="text-xs text-gray-500 mt-4">
                Created at: {new Date(note.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p>
            </button>

            {/* <button
            onClick={handleOpen}
            className="mt-3 px-3 py-1 bg-gradient-to-br from-indigo-400 to-violet-700 text-stone-100 rounded hover:cursor-pointer"
            >
                Open / Download
            </button>
        <div className="flex justify-between mt-5 text-gray-500 font-semibold text-sm ">
            <div className="border border-gray-500 rounded mr-10 px-2 py-1 hover:bg-gray-700 hover:text-white hover:cursor-pointer">
            <i class="fa-solid fa-robot mr-2"></i>
            <button className="hover:cursor-pointer">Ask AI</button>
            </div>
            <button className="border border-gray-500 rounded mr-10 px-2 py-1 hover:bg-gray-700 hover:text-white hover:cursor-pointer" onClick={()=>setShowConfirm(true)}>Delete</button>
        </div>
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
         */}
        </>
    )
}

export default PvtNoteCard
import { useState,useEffect } from "react"
import api from "../api/axios"
import PvtNoteCard from "../components/PvtNoteCard"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const MyNotes=()=>{
    const[loading,setLoading]=useState(false)
    const [notes,setNotes]=useState([])
    const [page,setPage]=useState(1)
    // const[query,setQuery]=useState("")

    const {user,loading:authLoading}=useAuth()
    const navigate=useNavigate()

    const LIMIT=10

    const onDelete=async(id)=>{
        try{
            await api.delete(`/notes/${id}`)
            setNotes((prev)=>prev.filter((note)=>note.id!==id))
        }catch(err){
            console.error(err)
        }
    }

    const [showForm,setShowForm]=useState(false)
    const[isEditing,setIsEditing]=useState(false)
    const[editIndex,setEditIndex]=useState(null)
    const[formData,setFormData]=useState({})
    const onEdit=(note,index)=>{
        setIsEditing(true)
        setEditIndex(index)
        setFormData(note)
        setShowForm(true)
    }

    const handleUpdate=async(id,updateData)=>{
        try{
            await api.put(`/notes/${id}`,updateData)
            setNotes((prev)=>prev.map((note)=>
            note.id===id?{...note,...updateData}:note))

            setIsEditing(false)
            setEditIndex(null)
            setShowForm(false)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        if (!authLoading && !user){
            navigate("/login")
        }
    },[user,authLoading])

    const fetchMyNotes=async()=>{
        try{
            setLoading(true)
            const res=await api.get("/notes/my_notes",{params:{page,limit:LIMIT}})
            setNotes(res.data.items)
        }catch(err){
            console.error("Error fetching public notes",err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user){
            fetchMyNotes()
        }
    },[page,user])
    return(
        <>
        <div className="min-h-screen flex flex-col p-6 max-w-6xl mx-auto">
            <div className="flex-grow">
                <h1 className="font-bold text-2xl text-stone-800 mb-8 p-2 border-b border-slate-500">My Notes</h1>

                {loading && <p>Loading Notes...</p>}
            {!loading && notes.length===0 && <p>No notes found!</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note,index)=>(
                    <PvtNoteCard key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} index={index} />
                ))}
            </div>
            </div>
            <div className="flex justify-center gap-3 mt-6">
                <button 
                disabled={page===1}
                onClick={()=>setPage((p)=p-1)}
                className="px-3 py-1 border rounded disabled-opacity:50">
                    Prev
                </button>
                <span>{page}</span>
                <button
                onClick={()=>setPage((p)=p+1)}
                className="px-3 py-1 border rounded">
                    Next
                </button>
            </div>
        </div>
        </>
    )
}

export default MyNotes
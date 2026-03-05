import { useState,useEffect } from "react"
import api from "../api/axios"
import PvtNoteCard from "../components/PvtNoteCard"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const MyNotes=()=>{
    const[loading,setLoading]=useState(false)
    const [notes,setNotes]=useState([])
    const [page,setPage]=useState(1)
    const[query,setQuery]=useState("")

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
            console.error("Error fetching private notes",err)
        }finally{
            setLoading(false)
        }
    }

    const searchNotes=async()=>{
        try{
            setLoading(true)
            setPage(1)
            const res=await api.get("/notes/search",{params:{q:query,page:1,limit:LIMIT}})
            setNotes(res.data.items)
        }catch(err){
            console.error("Search failed",err)
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

            <div className="flex gap-2 mb-6">
                <input
                type="text"
                placeholder="Search Notes..."
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                className="border p-2 rounded w-full" />
                <button onClick={searchNotes}
                className="px-4 py-2 bg-green-600 text-white rounded">
                    Search
                </button>
            </div>


                {loading && <p>Loading Notes...</p>}
            {!loading && notes.length===0 && <p>No notes found!</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note)=>(
                    <PvtNoteCard key={note.id} note={note} onDelete={onDelete} />
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
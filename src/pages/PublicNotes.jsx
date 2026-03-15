import { useEffect,useState } from "react"
import api from "../api/axios"
import NoteCard from "../components/NoteCard"
import { useAuth } from "../context/AuthContext"

const PublicNotes=()=>{

    const {user,isAuthenticated}=useAuth()
    const [notes,setNotes]=useState([])
    const[loading,setLoading]=useState(false)
    const[query,setQuery]=useState("")
    const[page,setPage]=useState(1)
    const[totalPages,setTotalPages]=useState(1)

    const LIMIT=10

  const fetchPublicNotes=async()=>{
    try{
      setLoading(true)
      let res
      if(query.trim()!==""){
        res=await api.get("notes/search",{
          params:{q:query,page,limit:LIMIT}
        })
      } else{
        res=await api.get("notes/public_notes",
          {params:{page,limit:LIMIT}}
        )
      }
      setNotes(res.data.items)
      setTotalPages(res.data.total_pages)
    }catch(err){
        console.error("Error fetching notes",err)
      }finally{
        setLoading(false)
      }
  }

    useEffect(()=>{
      fetchPublicNotes()
    }
    ,[page])

    useEffect(()=>{
        fetchPublicNotes()
    }
  ,[])

  const searchNotes=()=>{
        setPage(1)
        fetchPublicNotes()
  }
    return(
        <>
    <div className="min-h-screen flex flex-col p-6 max-w-6xl mx-auto">
      <div className="flex-grow">
      {isAuthenticated && user && (
        <h1 className="font-bold text-3xl mb-10">
          Hello! 👋🏿 {user.name}
          </h1>)
        }
      
      <h2 className="text-xl font-semibold mb-4">Public Notes</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={searchNotes}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading notes...</p>}

      {!loading && notes.length === 0 && <p>No notes found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
        </>
    )
}

export default PublicNotes;
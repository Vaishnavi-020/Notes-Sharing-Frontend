import { use, useState } from "react"
import api from "../api/axios"

const UpdateNote=({note,onClose,onEdited})=>{
    const [title,setTitle]=useState(note.title)
    const [description,setDescription]=useState(note.description)
    const [loading,setLoading]=useState(false)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            setLoading(true)
            const res=await api.put(`/notes/${note.id}`,{
                title,description
            })
            onEdited(res.data)
            onClose()
        }catch(err){
            console.error("Error updating note",err)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-[400px]">
                <h2 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
                    <i className="fa-solid fa-pen-to-square font-semibold"></i>
                    Edit Note
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col">
                    <label className="mb-1 text-gray-600">Title:</label>
                    <input
                    className="border p-2 rounded"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Title" />
                    </div>
                    <div className="mb-4 flex flex-col">
                    <label className="mb-1 text-gray-600">Description:</label>
                    <input 
                    className="border p-2 rounded"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    placeholder="Description"/>
                    </div>
                    <div className="flex justify-center gap-4 mt-5">
                        <button className="px-3 py-1 border border-gray-500 text-stone-600 rounded"
                        onClick={onClose}
                        type="button">
                            Cancel
                        </button>

                        <button className="px-3 py-1 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded"
                        disabled={loading}
                        type="submit">
                            {loading?"Updating...":"Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateNote
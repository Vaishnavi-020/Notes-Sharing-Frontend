import { useNavigate } from "react-router-dom"

const PvtNoteCard=({note})=>{
    const navigate=useNavigate()

    return(
        <>
        <div className="rounded-lg p-4 shadow-xl transition duration-150 ease-in-out hover:shadow-2xl hover:-translate-y-1 transition hover:cursor-pointer"
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
            </div>
        </>
    )
}

export default PvtNoteCard
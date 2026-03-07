import { useNavigate } from "react-router-dom"

const NoteCard = ({note}) => {
    const navigate=useNavigate()

    return(
        <button className="rounded-lg p-4 shadow-xl transition duration-150 ease-in-out hover:shadow-2xl
  hover:scale-[1.02] hover:cursor-pointer" onClick={()=>navigate(`/public-notes/${note.id}`)}>
            <h3 className="text-lg text-stone-600 font-bold capitalize">{note.title}</h3>
            <p className="text-sm text-gray-500 font-semibold">Subject: {note.subject}</p>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2 font-semibold">Description: {note.description}</p>
            
            <p className="text-sm text-gray-500 mt-4">
                Created at: {new Date(note.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p>
        </button>
    )
}

export default NoteCard
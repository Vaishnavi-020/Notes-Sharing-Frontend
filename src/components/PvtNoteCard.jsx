const PvtNoteCard=({note})=>{
    const handleOpen=()=>{
        window.open(
             `http://127.0.0.1:8000/notes/${note.id}/download`,
             "_blank"
        )
    }
    return(
        <>
        <div className="rounded-lg p-4 shadow-xl transition duration-150 ease-in-out hover:shadow-2xl hover:scale-[1.02]">
            <h3 className="capitalize text-stone-600 font-bold text-lg mb-4">{note.title}</h3>
            <p className="font-semibold text-sm text-gray-500 mb-4">Subject: {note.subject}</p>
            <p className="font-semibold text-sm text-gray-600 mt-2 line-clamp-2">Description: {note.description}</p>
        <div className="flex justify-between mt-12 text-gray-500 font-semibold text-sm ">
            <button className="border border-gray-500 rounded  ml-10 px-2 py-1 hover:bg-gray-700 hover:text-white hover:cursor-pointer">Edit</button>
            <button className="border border-gray-500 rounded mr-10 px-2 py-1 hover:bg-gray-700 hover:text-white hover:cursor-pointer">Delete</button>
        </div>
        </div>
        </>
    )
}

export default PvtNoteCard
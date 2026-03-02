const NoteCard = ({note}) => {
    const handleOpen=()=>{
        window.open(
             `http://127.0.0.1:8000/notes/${note.id}/download`,
             "_blank"
        )
    }

    return(
        <div className="rounded-lg p-4 shadow-xl transition duration-150 ease-in-out hover:shadow-2xl
  hover:scale-[1.02]">
            <h3 className="text-lg font-semibold ">{note.title}</h3>
            <p className="text-sm text-gray-600">{note.subject}</p>
            <p className="text-sm mt-2 line-clamp-2">{note.description}</p>
            <button
            onClick={handleOpen}
            className="mt-3 px-3 py-1 bg-purple-500 text-stone-100 rounded"
            >
                Open / Download
            </button>
        </div>
    )
}

export default NoteCard
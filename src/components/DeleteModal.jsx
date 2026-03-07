const DeleteModal=({onConfirm,onCancel})=>{

    return (<>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-3">
                        Delete Note?
                    </h2>    
                    <p className="mb-4">
                        Are you sure you want to delete this note?
                    </p>
                    <div className="flex gap-3 justify-end">
                        <button className="px-3 py-1 border rounded hover:cursor-pointer" 
                        onClick={onCancel}>Cancel</button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:cursor-pointer" 
                        onClick={onConfirm}>Delete</button>
                        </div>
            </div>
            </div>
        </>
    )
}

export default DeleteModal
import { Link } from "react-router-dom"

const Sidebar = ({isOpen,setIsOpen}) => {
return (
    <>
    {isOpen?(<div className="fixed inset-0 bg-black/20 z-40"
    onClick={()=>setIsOpen(false)} />):null}
    <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-sky-50 to-indigo-200 text-stone-900 z-50 duration-300 ${isOpen?"translate-x-0":"-translate-x-full"}`}>
        <div className="p-5 text-xl font-bold border-b border-slate-700">
            Share Notes
        </div>
        <nav className="p-4 space-y-3">
            <Link className="block p-2 rounded hover:bg-gradient-to-br from-sky-100 to-indigo-500 hover:text-blue-800" to="/">Home</Link>
            <Link className="block p-2 rounded hover:bg-gradient-to-br from-sky-100 to-indigo-500 hover:text-blue-800" to="/My_Notes" >My Notes</Link>
            <Link className="block p-2 rounded hover:bg-gradient-to-br from-sky-100 to-indigo-500 hover:text-blue-800" to="/notes_upload">Upload Notes</Link>
        </nav>  
        <div className="mt-auto p-4 border-t border-slate-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <i className="fa-solid fa-circle-user"></i>
                    <div>
                        <p className="text-sm font-semibold">Vaishnavi Sinha</p>
                        <p className="text-xs text-gray-500 hover:underline cursor-pointer">View Profile</p>
                    </div>
                </div>
                <i className="fa-solid fa-gear text-2xl"></i>
            </div>

        </div>
        </div>
    </>
)
}

export default Sidebar
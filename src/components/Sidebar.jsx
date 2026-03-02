import { Link } from "react-router-dom"

const Sidebar = ({isOpen,setIsOpen}) => {
return (
    <>
    {isOpen?(<div className="fixed inset-0 bg-black/20 z-40"
    onClick={()=>setIsOpen(false)} />):null}
    <div className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 duration-300 ${isOpen?"translate-x-0":"-translate-x-full"}`}>
        <div className="p-5 text-xl font-bold border-b border-slate-700">
            Exam Portal
        </div>
        <nav className="p-4 space-y-3">
            <Link className="block p-2 rounded hover:bg-slate-700" to="#">Dashboard</Link>
            <Link className="block p-2 rounded hover:bg-slate-700" to="#">Users</Link>
            <Link className="block p-2 rounded hover:bg-slate-700" to="#">Settings</Link>
        </nav>  

    </div>
    </>
)
}

export default Sidebar
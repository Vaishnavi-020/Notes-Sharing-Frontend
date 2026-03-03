import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = ({setIsOpen}) => {
    const {isAuthenticated,logout}=useAuth()
    return (
    <nav className="flex items-center justify-between bg-gradient-to-br from-blue-100 to-purple-300 text-stone-700 h-[75px]">
            <div className="flex items-center gap-4 ml-15">
        {isAuthenticated && (
          <button
            onClick={() => setIsOpen(true)}
            className="text-2xl font-bold hover:cursor-pointer"
          >
            ☰
          </button>
        )}

        <h3 className="text-xl font-bold hover:cursor-pointer">
          Share Notes
        </h3>
      </div>
            {!isAuthenticated?(
                <>
                <div className="flex gap-4">
            <i className="fa-solid fa-user font-bold text-3xl"></i>
            <h5 className="flex mr-20 font-semibold text-lg">
                <Link to="/Signup" className="mr-1 hover:cursor-pointer hover:underline">Signup</Link>
                <p> | </p>
                <Link to='/Login' className="ml-1 hover:cursor-pointer hover:underline">Login</Link>
            </h5>
            </div>
            </>
            ):(
                <button onClick={logout} className="text-lg font-semibold mr-25 hover:cursor-pointer hover:underline">Logout</button>
            )}
            
        </nav>
    )
}

export default Navbar
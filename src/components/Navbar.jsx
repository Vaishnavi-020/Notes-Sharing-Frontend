import { Link } from "react-router-dom"

const Navbar = () => {
    return (
    <div className="flex items-center justify-between bg-gradient-to-br from-blue-100 to-purple-300 text-stone-700 h-[75px]">
            <h3 className="m-10 text-xl font-bold hover:cursor-pointer">Share Notes</h3>
            <div className="flex gap-4">
            <i className="fa-solid fa-user font-bold text-3xl"></i>
            <h5 className="flex mr-20 font-semibold text-lg">
                <Link to="/Signup" className="mr-1 hover:cursor-pointer hover:underline">Signup</Link>
                <p> | </p>
                <Link to='/Login' className="ml-1 hover:cursor-pointer hover:underline">Login</Link>
            </h5>
            </div>
        </div>
    )
}

export default Navbar
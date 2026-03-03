import { useAuth } from "../context/AuthContext"

const Footer=()=>{
    const {isAuthenticated}=useAuth()
    return(
        <div>
            {isAuthenticated && (
  <footer className="w-full py-8 bg-gradient-to-br from-blue-100 to-purple-300 text-stone-600 border-t border-white/20">
    <div className="max-w-screen-xl mx-auto px-4 text-center">
      <p className="text-base font-medium">
        Made with <span className="text-pink-500">&hearts;</span> by 
        <span className="font-bold text-stone-800 ml-1">Vaishnavi Sinha</span>
      </p>
      
      <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm opacity-80">
        <p>&copy; {new Date().getFullYear()} Note Sharing App</p>
        <span className="hidden sm:block text-stone-500">|</span>
        <p>Created: 2026</p>
      </div>
    </div>
  </footer>
)}
        </div>
    )
}

export default Footer
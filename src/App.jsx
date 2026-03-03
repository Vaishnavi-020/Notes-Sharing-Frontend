import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import PublicNotes from './pages/PublicNotes'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashbaord from './pages/Dashbaord'
import MyNotes from './pages/MyNotes'
import UploadNote from './pages/UploadNote'
import Footer from './components/Footer'

function App() {

  const [isOpen,setIsOpen]=useState(false)
  const {isAuthenticated}=useAuth()
  return (
    <>
    <Navbar setIsOpen={setIsOpen} />
      
        <div className='flex'>
          {isAuthenticated && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
          <div className='flex-1 p-4'>
            <Routes>
              <Route path="/" element={<PublicNotes />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashbaord />} />
            <Route path="/My_Notes" element={<MyNotes />} />
            <Route path="/notes_upload" element={<UploadNote />} />
            </Routes>
          </div>
        </div>
        <Footer />
    </>
  )
}

export default App

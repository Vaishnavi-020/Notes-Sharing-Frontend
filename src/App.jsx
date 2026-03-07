import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import PrivateRoute from './Layout/PrivateRoute'
import { useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import PublicNotes from './pages/PublicNotes'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashbaord from './pages/Dashbaord'
import MyNotes from './pages/MyNotes'
import PublicNoteDetails from './pages/PublicNoteDetails'
import PvtNoteDetails from './pages/PvtNoteDetails'
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
          <div className='flex-1'>
            <Routes>
            <Route path="/" element={<PublicNotes />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/public-notes/:id" element={<PublicNoteDetails />} />

            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashbaord />} />
            <Route path="/my_notes" element={<MyNotes />} />
             <Route path="/notes_upload" element={<UploadNote />} />
             <Route path="/notes/:id" element={<PvtNoteDetails />} />
            </Route>
  
            </Routes>
          </div>
        </div>
        <Footer />
    </>
  )
}

export default App

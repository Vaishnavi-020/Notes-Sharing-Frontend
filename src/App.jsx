import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import PublicNotes from './pages/PublicNotes'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashbaord from './pages/Dashbaord'
function App() {

  const [isOpen,setIsOpen]=useState(false)

  return (
    <>
    <Navbar />
      {/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/> */}
      <Routes>
        <Route path="/" element={<PublicNotes />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashbaord />} />
      </Routes>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from "react-router-dom"
import apiClient from './apiClient'
import { useAuth } from './AuthProvider'
import { Link } from 'react-router-dom'

function App() {
  const [usernameInput, setUsernameInput] = useState("")
  const navigate = useNavigate()
  const {logout} = useAuth()

  async function chatWithUser(e){
    e.preventDefault()

    const response = await apiClient("/user/"+usernameInput)

    if(!response.data){ 
      setError("User doesnt exist")
      return
    }
    else if(response.data.username == localStorage.getItem('username')){
      setError("really?")
      return
    }

    navigate("/chat/"+usernameInput)
  }

  return (
    <>
    <Link to={"/" + localStorage.getItem('username')} className='link'>My Acc</Link>

    <div className='logo'>
      <img src={localStorage.getItem('pfp_url')} alt="pfp" width={64} height={64} />
      <div>{localStorage.getItem('username')}</div>
    </div>

    <button onClick={logout}>logout</button>
    
    <form onClick={chatWithUser}>
      <input type="text" value={usernameInput} onChange={(e)=>setUsernameInput(e.target.value)}/>
      <button >Chat!</button>
    </form>
    </>
  )
}

export default App

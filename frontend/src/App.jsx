import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from "react-router-dom"
import apiClient from './apiClient'


function App() {
  const [error, setError] = useState("")
  const [usernameInput, setUsernameInput] = useState("")
  const navigate = useNavigate()

  async function chatWithUser(username){
    const response = await apiClient("/user/"+username)

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
    <div>
      {/* <img src={localStorage.getItem('pfp_url')} alt="pfp" width={64} height={64} /> */}
      <div>{localStorage.getItem('username')}</div>
    </div>
    
    <input type="text" value={usernameInput} onChange={(e)=>setUsernameInput(e.target.value)}/>
    <button onClick={()=>chatWithUser(usernameInput)}>Chat!</button>
    {error}
    </>
  )
}

export default App

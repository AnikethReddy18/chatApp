import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from "react-router-dom"
import apiClient from './apiClient'
import { useAuth } from './AuthProvider'
import { useRef } from 'react'

function App() {
  const [usernameInput, setUsernameInput] = useState("")
  const navigate = useNavigate()
  const { logout } = useAuth()
  const dialog = useRef(null)
  const newPfp = useRef(null)

  async function chatWithUser(e) {
    e.preventDefault()

    const response = await apiClient("/user/" + usernameInput)

    if (!response.data) {
      setError("User doesnt exist")
      return
    }
    else if (response.data.username == localStorage.getItem('username')) {
      setError("really?")
      return
    }

    navigate("/chat/" + usernameInput)
  }

  async function updatePFP() {
    const response = await apiClient.put("/user/" + localStorage.getItem('username') + '/pfp', { pfp_url: newPfp.current.value }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });

    localStorage.setItem('pfp_url', newPfp.current.value)
    window.location.reload()
  }

  return (
    <>

      <dialog ref={dialog}>
        <input className='awd' type="text" placeholder='URL of new Profile Picture' ref={newPfp} />
        <button onClick={() => dialog.current.close()} >Close</button>
        <button onClick={updatePFP}>Update</button>
      </dialog>

      <div className='logo'>
        <img src={localStorage.getItem('pfp_url')} alt="pfp" width={64} height={64}
          onClick={() => dialog.current.showModal()} />
        <div>{localStorage.getItem('username')}</div>
        <button onClick={logout}>logout</button>
      </div>


      <form onClick={chatWithUser}>
        <input type="text" placeholder='Chat with' value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
        <button >Chat!</button>
      </form>
    </>
  )
}

export default App

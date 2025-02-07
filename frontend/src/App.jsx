import { useState, useEffect } from 'react'
import './App.css'
import { useAuth } from './AuthProvider'

function App() {
  const auth = useAuth()

  return (
    <>{console.log("Username: " + localStorage.getItem('username') + "\nPFP: "+localStorage.getItem("pfp_url"))}</>
  )
}

export default App

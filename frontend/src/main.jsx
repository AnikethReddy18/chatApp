import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import './index.css'
import { AuthProvider } from './AuthProvider.jsx'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import Chat from './pages/Chat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Routes>

          <Route path='/login' element={<Login />}/>
          <Route path="/" element={<Navigate to="/home" replace/>} />

          <Route element={<PrivateRoute />}>
              <Route path="/home" element={<App />} />
              <Route path="/chat/:username" element={<Chat />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  </StrictMode>,
)

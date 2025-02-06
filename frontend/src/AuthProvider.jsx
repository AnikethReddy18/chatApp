import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "./apiClient"

const authContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()

    async function login(username, password) {
        try{
        const response = await apiClient.post("/login", { username, password },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded'} })
        
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        navigate("/")
        }catch(err){
            return err
        }
    }

    async function logout() {
        setToken(null)
        localStorage.removeItem('token')
    }

    return (<authContext.Provider value={{ login, logout, token }}> {children}</authContext.Provider>);
}

export function useAuth() {
    return useContext(authContext)
}

import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "./apiClient"

const authContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()

    async function login(username, password){
        const response = await apiClient.post("/login", {
            username, password
        })

        setToken(response.data.token)
        localStorage.setItem(token)
        navigate("/")
    }

    async function logout(){
        setToken(null)
        localStorage.removeItem('token')
    }

    return (<authContext.Provider value={{login, logout, token}}> {children}</authContext.Provider>);
}

export function useAuth(){
    return useContext(authContext)
}

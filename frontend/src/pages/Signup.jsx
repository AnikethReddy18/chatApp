import { useState } from "react"
import apiClient from "../apiClient"
import { useAuth } from "../AuthProvider"

function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [errors, setErrors] = useState(null)
    const { login } = useAuth()

    async function handleFormSubmit(e) {
        e.preventDefault()

        try {
            await apiClient.post("/signup", { first_name: firstName, last_name: lastName, username, password }, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })

            await login(username, password)
        } catch (err) {
            setErrors(err.response.data.errors)
        }

        
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <h1>Signup</h1>
            {errors && <div>{
            errors.map((error, index)=><div key={index} className="error">{error.msg}</div>)}
            </div>}
            <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Signup</button>
        </form>
    )
}

export default Signup;
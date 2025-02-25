import { useAuth } from "../AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const auth = useAuth()

    async function handleFormSubmit(e){
        e.preventDefault()

        const err = await auth.login(username, password)
        if(err) setError(err.response.data.error)
    }

    return ( <>
    <form onSubmit={handleFormSubmit}>
        <h1>Login</h1>
        {error && <h1>{error}</h1>}
        <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button>Login</button>
    </form> 

    <Link to="/signup" style={{margin: 'auto'}} className="link">Create Account</Link>
    </>);
}

export default Login;
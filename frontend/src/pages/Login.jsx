import { useAuth } from "../AuthProvider";
import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const auth = useAuth()

    async function handleFormSubmit(e){
        e.preventDefault()

        const err = await auth.login(username, password)
        if(err) console.log(result.response.data.error)
    }

    return ( 
    <form onSubmit={handleFormSubmit}>
        <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button>Login</button>
    </form> );
}

export default Login;
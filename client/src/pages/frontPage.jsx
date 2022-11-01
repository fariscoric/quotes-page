import { useState, useEffect } from "react";
import axios from "axios";


export default function FrontPage()  {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    // useEffect(() => {
    //     axios.post('http://localhost:8000/sessions', {
    //         username: username,
    //         password: password
    //     })
    //         .then(response => {
    //             console.log(response.data)
    //         });
    // }, []);
    
    const handleUserName = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        axios.post('http://localhost:8000/sessions', {
            username: username,
            password: password
        })
    }
    
    return(
        <div>
            <form>
                <input type='text' value={username} onChange={handleUserName}/>
                <input type='password' value={password} onChange={handlePassword}/>
                <input type='submit' value="login" onClick={handleSubmit}/>
            </form>
        </div>
    )
}
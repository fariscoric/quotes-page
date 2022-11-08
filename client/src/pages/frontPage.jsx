import { useState, useEffect, useContext } from "react";
import { TokenContext } from '../context/context'
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function FrontPage()  {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {token, setToken} = useContext(TokenContext)
    const navigate = useNavigate();
    
    const handleUserName = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/sessions', {
            username: username,
            password: password, 
        })
        .then((res) => {
            setToken(res.data.accessToken)
            localStorage.setItem("token", res.data.accessToken)
            navigate("/quotes")
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    return(
        <div>
            <form>
                <input type='text' value={username} onChange={handleUserName}/>
                <input type='password' value={password} onChange={handlePassword}/>
                <Link to="quotes">
                <input type='submit' value="login" onClick={handleSubmit}/>
                </Link>
            </form>
        </div>
    )
}
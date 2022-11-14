import { useState, useEffect, useContext } from "react";
import { TokenContext } from '../context/context'
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./frontPage.css"


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
        <div className="mainCont">
            <form className="loginForm">
                <h1 className="loginTitle">Welcome</h1>
                <input type='text' value={username} onChange={handleUserName} placeholder="Username" className="inputText"/>
                <input type='password' value={password} onChange={handlePassword} placeholder="Password" className="inputPassword"/>
                <Link to="quotes">
                <input type='submit' value="Log In" onClick={handleSubmit} className="loginButton"/>
                </Link>
            </form>
        </div>
    )
}
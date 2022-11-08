import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { TokenContext } from '../../context/context'


export default function Quotes() {
    const {token, setToken} = useContext(TokenContext)
    const [quotes, setQuotes] = useState('')
    const accessToken = token;
    const getApi = () => {
        axios.get('http://localhost:8000/quotes', {
            headers: {Authorization: 'Bearer '+ accessToken}})
        .then((res) => {
            console.log(res.data.quotes)
            setQuotes(res.data.quotes)})
    }
    
    useEffect((
        getApi()
    ),[])
    
    
    return (
        <div>
            {/* {quotes.map((e) => {
                <h1>{e.quotes.}</h1>
            })} */}
        </div>
    )
}
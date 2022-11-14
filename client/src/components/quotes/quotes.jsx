import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { TokenContext } from '../../context/context'
import QuotesScore from "../quotevotes/QuoteVotes";
import "./quotes.css"


export default function Quotes() {
    const {token, setToken} = useContext(TokenContext)
    const [quotes, setQuotes] = useState([])
    const accessToken = token;
    const getApi = async() => {
        axios.get('http://localhost:8000/quotes', {
            headers: {Authorization: 'Bearer '+ localStorage.getItem("token")}})
        .then((res) => {
            console.log(res.data.quotes)
            setQuotes(res.data.quotes)})
    }
    
    useEffect(() => {
        getApi();
    },[])
    
    
    return (
        <div className="quotesContainer">
            {quotes.map((e) => (
                <div className="quoteCont">
                <QuotesScore
                el={e}
                />
                <div className="quote">{e.content}</div>
                </div>
            ))}
        </div>
    )
}
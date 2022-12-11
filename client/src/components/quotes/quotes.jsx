import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { TokenContext } from '../../context/context'
import QuotesScore from "../quotevotes/QuoteVotes";
import "./quotes.css"
import { MultiSelect, Select } from '@mantine/core';
import Modal from '@mui/material/Modal';



export default function Quotes() {
    const {token, setToken} = useContext(TokenContext)
    const [quotes, setQuotes] = useState([])
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState([])
    const [sortedBy, setSortedBy] = useState('upvotesCount')
    const tagString = tag.toString();
    const accessToken = token;
    const getApi = async() => {
        axios.get(`http://localhost:8000/quotes?tags=${tagString}&sortBy=${sortedBy}&sortDirection=${sortDirection}`, {
            headers: {Authorization: 'Bearer '+ localStorage.getItem("token")}})
        .then((res) => {
            console.log(res.data.quotes)
            setQuotes(res.data.quotes)})
    }
    const getTags = async() => {
        axios.get('http://localhost:8000/tags', {
            headers: {Authorization: 'Bearer '+ localStorage.getItem("token")}})
        .then((res) => {
            console.log(res.data)
            setTags(res.data)})
    }
    
    useEffect(() => {
        getApi();
        getTags();
    },[tag, sortedBy])

    const sortDirection =
    sortedBy === "author" || sortedBy === "content" ? "asc" : "desc";

    const data = tags.map((e) => {
        return {
            value: e,
            label: `${e[0].toUpperCase()}${e.slice(1, e.length)}`,
        }
    })

    const dataSort = [
        { value: "author", label: "Author" },
        { value: "content", label: "Content" },
        { value: "createdAt", label: "Newest first" },
        { value: "downvotesCount", label: "Downvotes" },
        { value: "upvotesCount", label: "Upvotes" },
      ];
    
    
    return (
        <div className="quotesContainer">
            <MultiSelect
        onChange={setTag}
        data={data}
        value={tag}
        label="Filter by tags"
        placeholder="Tags"
    />
        <Select
      label="Sort by"
      placeholder="Sort by"
      value={sortedBy}
      clearable
      data={dataSort}
      onChange={setSortedBy}/>
            {quotes.map((e) => (
                <div className="quoteCont">
                <div>
                <QuotesScore
                key={e.id}
                content={e.content}
                authorName={e.author}
                upvotesCount={e.upvotesCount}
                downvotesCount={e.downvotesCount}
                givenVote={e.givenVote}
                id={e.id}
                />
                </div>
                <div className="quoteAuthor">
                <div className="quote">"{e.content}"</div>
                <div className="author">{e.author}</div>
                </div>
                </div>
            ))}
        </div>
    )
}
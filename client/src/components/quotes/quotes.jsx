import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { TokenContext } from '../../context/context'
import QuotesScore from "../quotevotes/QuoteVotes";
import "./quotes.css"
import { MultiSelect, Select, Pagination } from '@mantine/core';



export default function Quotes({ openState }) {
    const {token, setToken} = useContext(TokenContext)
    const [quotes, setQuotes] = useState([])
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState([])
    const [page, setPage] = useState(1)
    const [quoteCount, setQuoteCount] = useState('1')
    const [sortedBy, setSortedBy] = useState('createdAt')
    const pageSize = 5;
    const pageCount = Math.ceil(quoteCount / pageSize);
    const tagString = tag.toString();
    const accessToken = token;
    const getApi = async() => {
        axios.get(`http://localhost:8000/quotes?tags=${tagString}&sortBy=${sortedBy}&sortDirection=${sortDirection}&page=${page}&pageSize=${pageSize}`, {
            headers: {Authorization: 'Bearer '+ localStorage.getItem("token")}})
        .then((res) => {
            console.log(res.data.quotes)
            setQuotes(res.data.quotes)
            setQuoteCount(res.data.quotesCount)
        })
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
    },[tag, sortedBy, openState, page])

    useEffect(() => {
        setPage(1);
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
            <Pagination
            total ={pageCount}
            onChange={setPage}
            onClick={window.scrollTo(0, 0)}
            page={page}
            color="teal"
            />
        </div>
    )
}
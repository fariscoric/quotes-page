import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TokenContext } from "../../context/context";
import axios from "axios";
import "./createQuote.css"
import toast, { Toaster } from 'react-hot-toast';

 
export default function CreateQuote({close, notification}) {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const AT = token;
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [inputContent, setInputContent] = useState();
  const [inputAuthor, setInputAuthor] = useState();
  const [inputTag, setInputTag] = useState();

  const addQuote = () => {
    axios.post(
      `http://localhost:8000/quotes`,
      {
        content: inputContent,
        author: inputAuthor,
        tags: inputTag,
        givenVote: 'none',
        upvotesCount: 0,
        downvotesCount: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      if(response.data) {
      }
    })
    .then(() => {
      close(false)
    })
    .then(() => {
      console.log("bilo sta")
      notification("Successfully added quote")
      console.log(notification)
    })
  };
  return (
    <div className="bigContainer">
      <Toaster/>
      <button onClick={() => (close(false))}>X</button>
      <form
        className="form-class"
        onSubmit={(e) => (
          e.preventDefault(),
          addQuote()
        )}
      >
        
        <label>Enter the author</label>
        <input
          className="input-author"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Enter quote</label>
        <textarea
          className="input-area"
          type="text"
          placeholder="Quote text..."
          rows="20"
          cols="50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label>Tags</label>
        <input
          className="input-tags"
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button
          type="submit"
          className="submit-button"
          onClick={() => (
            setInputContent(content),
            setInputAuthor(author),
            setInputTag(tags.split(","))
          )}
        >
          Add quote
        </button>
      </form>
    </div>
  );
}
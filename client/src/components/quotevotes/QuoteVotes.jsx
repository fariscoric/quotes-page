import { useState, useContext } from "react";
import { TokenContext } from "../../context/context";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useEffect } from "react";
import "./quotevotes.css"
 
export default function QuotesScore({ el }) {
  const { token } = useContext(TokenContext);
  const AT = token;
  const [upVotes, setUpvotes] = useState(el.upvotesCount);
  const [voteArrow, setVoteArrow] = useState(el.givenVote);
  const [downVotes, setDownVotes] = useState(el.downvotesCount);
  const accessToken = "yuim98oq-e275-45a2-bc2e-b3098036d655";
  const numberOfVotes = 100;
  const groupedVotes = upVotes + downVotes;
  console.log(groupedVotes);
  const n = numberOfVotes / groupedVotes;
  const procentage = upVotes === 0 ? 0 : Math.round(n * upVotes);
  console.log(voteArrow);
  const [votes, setVotes] = useState(procentage);
  const postUpVote = (el) => {
    axios
      .post(`http://localhost:8000/quotes/${el.id}/upvote`, null, {
        headers: {
          Authorization: "Bearer " + AT,
        },
      })
      .then((res) => {
        setUpvotes(res.data.upvotesCount);
        setVoteArrow(res.data.givenVote);
        console.log(res.data.givenVote);
        console.log(el);
      });
  };
  const deleteUpVote = (el) => {
    axios
      .delete(`http://localhost:8000/quotes/${el.id}/upvote`, {
        headers: {
          Authorization: "Bearer " + AT,
        },
      })
      .then((res) => {
        setUpvotes(res.data.upvotesCount);
        setVoteArrow(res.data.givenVote);
        console.log(res.data.givenVote);
      });
  };
  const postDownVote = (el) => {
    axios
      .post(`http://localhost:8000/quotes/${el.id}/downvote`, null, {
        headers: {
          Authorization: "Bearer " + AT,
        },
      })
      .then((res) => {
        setDownVotes(res.data.downvotesCount);
        setVoteArrow(res.data.givenVote);
      });
  };
  const deleteDownVote = (el) => {
    axios
      .delete(`http://localhost:8000/quotes/${el.id}/downvote`, {
        headers: {
          Authorization: "Bearer " + AT,
        },
      })
      .then((res) => {
        setDownVotes(res.data.downvotesCount);
        setVoteArrow(res.data.givenVote);
      });
  };
  const upVoteHandler = () => {
    if (voteArrow === "upvote") {
      deleteUpVote(el);
    } else if (voteArrow === "none") {
      postUpVote(el);
    }
  };
  const downVoteHandler = () => {
    if (voteArrow === "downvote") {
      deleteDownVote(el);
    } else if (voteArrow === "none") {
      postDownVote(el);
    }
  };
  useEffect(() => {
    setVotes(procentage);
  }, [procentage]);
  return (
    <div className="votes-count">
      <div>
        <div className="buttons">
          <button
            style={{
              color: voteArrow === "upvote" ? "green" : "black",
              cursor: "pointer",
            }}
            className="button-class"
            onClick={upVoteHandler}
          >
            <ArrowUpIcon/>
          </button>
        </div>
        <div
          className="procent"
          style={{
            color:
              votes >= 90
                ? "green"
                : votes >= 80 && votes < 90
                ? "lightgreen"
                : votes >= 70 && votes < 80
                ? "#00A36C"
                : votes >= 60 && votes < 70
                ? "#F1CB14"
                : votes >= 50 && votes < 60
                ? "#EDAA0E"
                : votes >= 40 && votes < 50
                ? "#D26C17"
                : votes >= 10 && votes < 40
                ? "orange"
                : votes < 10
                ? "red"
                : "",
          }}
        >
          {votes}%
        </div>
        <div className="vote">
          {upVotes}/{downVotes}
        </div>
      </div>
      <div className="buttons">
        <button
          className="button-class"
          style={{
            color: voteArrow === "downvote" ? "red" : "black",
            cursor: "pointer",
          }}
          onClick={downVoteHandler}
        >
          <ArrowDownIcon />
        </button>
      </div>
    </div>
  );
}
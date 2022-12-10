import { useState, useEffect, useContext } from "react";
import { TokenContext } from "../context/context";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./frontPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

export default function FrontPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const handleUserName = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:8000/sessions", {
        username: username,
        password: password,
      })
      .then((res) => {
        setToken(res.data.accessToken);
        localStorage.setItem("token", res.data.accessToken);
        navigate("/quotes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: green[100],
      },
    },
  });

  return (
    <div className="mainCont">
      <ThemeProvider theme={theme}>
      <Box
      className="boxCont"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
        labelClassName="placeholderText"
        fullWidth
          id="outlined"
          label="Username"
          color="primary"
          value={username}
          onChange={handleUserName}
          focused
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          color="primary"
          value={password}
          onChange={handlePassword}
          focused
        />
        <Link to="quotes">
          <Button className="loginButton" variant="contained" color="success" onClick={handleSubmit}>
            Log In
          </Button>
        </Link>
      </Box>
      </ThemeProvider>
    </div>
  );
}

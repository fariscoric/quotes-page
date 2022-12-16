import { useContext } from "react";
import { TokenContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";


export default function Logout() {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  return (
    <div>
      <Button
      variant="contained" 
      color="success"
      className="logoutButton"
      onClick={() => {
        setToken(null);
        localStorage.setItem("token", null);
        navigate("/")
        }}
      >
        Log Out
        </Button>
    </div>
  )
}

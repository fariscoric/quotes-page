import { useContext } from "react";
import { TokenContext } from "../../context/context";
import { NavLink, useNavigate } from "react-router-dom";
import "./logout.css"

export default function Logout() {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  return (
    <div>
      <button
      className="logoutButton"
        onClick={() => {
          setToken(null);
          localStorage.setItem("token", null);
          navigate("/")
        }}
      >
        Log Out
        </button>
    </div>
  )
}

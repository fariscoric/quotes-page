import { useContext } from "react";
import { TokenContext } from "../../context/context";
import { NavLink } from "react-router-dom";

export default function Logout() {
  const { token, setToken } = useContext(TokenContext);
  return (
    <div>
      <button
        onClick={() => {
          setToken(null);
          localStorage.setItem("token", token);
        }}
      >
        <NavLink to="/">Log out</NavLink>
      </button>
    </div>
  )
}

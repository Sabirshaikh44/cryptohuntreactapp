import React from "react";
import { useHistory } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const history = useHistory();
  return (
    <div className="navbar" onClick={()=>{
     history.push('/')
    }}>
      <h1>Crypto tracker App</h1>
    </div>
  );
}

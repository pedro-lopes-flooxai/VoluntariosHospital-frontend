import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import './Logo.css';

export default function Logo() {
  return (
    <aside className="logo">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
      </Link>
    </aside>
  );
}

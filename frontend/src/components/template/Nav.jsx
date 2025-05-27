import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaTasks,
  FaTrophy,
  FaUser
} from 'react-icons/fa'
import './Nav.css'

export default function Nav() {
  return (
    <aside className="menu-area">
      <nav className="menu">
        <Link to="home">
          <FaHome /> Início
        </Link>
        <Link to="/users">
          <FaUsers /> Usuários
        </Link>
        <Link to="/tasks">
          <FaTasks /> Vagas
        </Link>
        <Link to="/leaderboard">
          <FaTrophy /> Pontuação Geral
        </Link>
        <Link to="/profile">
          <FaUser /> Meu perfil
        </Link>
      </nav>
    </aside>
  )
}

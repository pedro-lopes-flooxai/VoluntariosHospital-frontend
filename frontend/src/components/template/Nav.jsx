import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaTasks,
  FaTrophy,
  FaUser
} from 'react-icons/fa';
import './Nav.css';

export default function Nav({ currentUser, onShowLogin, onLogout }) {
  return (
    <aside className="menu-area">
      <nav className="menu">
        <Link to="/home">
          <FaHome /> Início
        </Link>

        {currentUser?.role === 'admin' && (
          <Link to="/users">
            <FaUsers /> Usuários
          </Link>
        )}

        <Link to="/tasks">
          <FaTasks /> Vagas
        </Link>

        <Link to="/board">
          <FaTrophy /> Pontuação Geral
        </Link>

        {currentUser?.role === 'user' || currentUser?.role === 'admin' ? (
          <Link to="/profile">
            <FaUser /> Meu Perfil
          </Link>
        ) : null}


        {!currentUser && (
          <button type="button" onClick={onShowLogin}>
            Entrar
          </button>
        )}

        {currentUser && (
          <button type="button" onClick={onLogout}>
            Sair
          </button>
        )}
      </nav>
    </aside>
  );
}

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaTasks, FaTrophy, FaUser } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import './Nav.css';

export default function Nav({ onShowLogin, onLogout }) {
  const { currentUser } = useContext(AuthContext);

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

        {(currentUser?.role === 'user' || currentUser?.role === 'admin') && (
          <Link to="/profile">
            <FaUser /> Meu Perfil
          </Link>
        )}

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

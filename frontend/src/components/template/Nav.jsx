import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/users">
                <i className="users"></i> Usuários
            </Link>
            <Link to="/register">
                <i className="register"></i> Cadastro de Usuários
            </Link>

            <Link to="/tasks">
                <i className="tasks"></i> Vagas
            </Link>
            <Link to="/leaderboard">
                <i className="board"></i> Pontuação Geral
            </Link>
        </nav>
    </aside>

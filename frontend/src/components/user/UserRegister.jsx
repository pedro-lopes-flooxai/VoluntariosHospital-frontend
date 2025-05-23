import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Main from '../template/Main'
import { FaTimes, FaCheck } from 'react-icons/fa'
import './UserRegister.css'

const headerProps = {
  icon: 'user-plus',
  title: 'Cadastro de Usuários',
  subtitle: 'Tela de Cadastro'
}

export default function UserRegister() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'usuario'
  })

  const navigate = useNavigate()

  function handleInputChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  function handleRegister(e) {
    e.preventDefault()
    const { email, password, role } = form

    if (email && password) {
      alert(`Usuário ${email} cadastrado como ${role}!`)
    } else {
      alert('Por favor, preencha todos os campos.')
    }
  }

  return (
    <Main {...headerProps}>
      <div className="signin-container">
        <form className="signin-card" onSubmit={handleRegister}>
          <div className="signin-info">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleInputChange}
              required
            />

            <label>Senha:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleInputChange}
              required
            />

            <label>Nível:</label>
            <select
              name="role"
              className="form-control"
              value={form.role}
              onChange={handleInputChange}
            >
              <option value="usuario">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="task-details-buttons">
            <button
              type="button"
              className="task-details-btn"
              onClick={() => navigate('/')}
            >
              <FaTimes /> Cancelar
            </button>
            <button type="submit" className="task-details-btn apply-btn">
              <FaCheck /> Cadastrar
            </button>
          </div>
        </form>
      </div>
    </Main>
  )
}

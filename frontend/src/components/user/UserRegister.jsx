import React, { useState } from 'react';
import './UserRegister.css'; 
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Main from "../template/Main";
import "./UserRegister.css";

export default function UserRegister() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
const headerProps = {
  icon: "user-plus",
  title: "Cadastro de Usuários",
  subtitle: "Tela de Cadastro"
};

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }
class UserRegister extends Component {
  state = {
    email: "",
    password: "",
    role: "user"
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted:', formData);
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRegister = (e) => {
    e.preventDefault();
    const { email, password, role } = this.state;

    if (email && password) {
      alert(`Usuário ${email} cadastrado como ${role}!`);
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  render() {
    const { email, password, role } = this.state;

  return (
    <div className="user-register-container">
      <div className="user-register-card">
        <form onSubmit={handleSubmit} className="user-register-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Nível:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button type="submit" className="task-btn full-width">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
    return (
      <Main {...headerProps}>
        <div className="signin-container">
          <form className="signin-card" onSubmit={this.handleRegister}>
            <div className="signin-info">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={this.handleInputChange}
                required
              />

              <label>password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={this.handleInputChange}
                required
              />

              <label>Nível:</label>
              <select
                name="role"
                className="form-control"
                value={role}
                onChange={this.handleInputChange}
              >
                <option value="usuario">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="task-details-buttons">
              <button
                type="button"
                className="task-details-btn"
                onClick={() => this.props.history.push("/")}
              >
                Cancelar
              </button>
              <button type="submit" className="task-details-btn apply-btn">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </Main>
    );
  }
}

export default withRouter(UserRegister);

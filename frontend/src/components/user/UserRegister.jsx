import React, { useState } from 'react';
import './UserRegister.css'; 

export default function UserRegister() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted:', formData);
  }

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
}

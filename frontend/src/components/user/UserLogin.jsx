import React, { useState, useEffect } from 'react';
import './UserLogin.css';
import axios from 'axios';

export default function UserLogin({ show, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      setEmail('');
      setPassword('');
      setError('');
    }
  }, [show]);

  if (!show) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
        email,
        password,
      });

      console.log("Resposta do backend:", res.data);

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      onLogin(user);
    } catch (err) {
      console.error("Erro completo:", err);
      setError(err.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="signin-title">Entrar</h2>

        <form onSubmit={handleLogin}>
          <div className="signin-info">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Senha:</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" className="signin-btn">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

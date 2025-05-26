import React from 'react';
import './UserLogin.css';

export default function UserLogin({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className="signin-title">Entrar</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="signin-info">
            <label>Email:</label>
            <input type="email" className="form-control" required />

            <label>Senha:</label>
            <input type="password" className="form-control" required />

            <a href="#" className="forgot-link">Esqueceu a senha?</a>
          </div>
          <button type="submit" className="signin-btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}

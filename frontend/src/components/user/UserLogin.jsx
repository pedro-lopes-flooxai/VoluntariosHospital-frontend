import React, { useState, useEffect, useContext } from "react";
import "./UserLogin.css";
import axios from "axios";
import API_BASE_URL from "../../api";
import { AuthContext } from "../contexts/AuthContext";
import UserRegister from "./UserRegister";

export default function UserLogin({ show, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (show) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [show]);

  if (!show) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      login(user);
      onClose();
    } catch (err) {
      console.error("Erro completo:", err);
      setError(err.response?.data?.message || "Erro ao fazer login");
    }
  };

  const handleSave = async (newUser) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/users/register-public`,
        newUser
      );
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      login(user);
      onClose();
    } catch (err) {
      console.error("Erro ao registrar:", err);
      setError(err.response?.data?.message || "Erro ao registrar usuário");
    }
  };

  return (
    <>
      {showRegister ? (
        <UserRegister
          show={true}
          onSave={handleSave}
          onClose={() => {
            setShowRegister(false);
          }}
          isAdmin={false}
        />
      ) : (
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

              <div className="switch-to-register">
                Não tem uma conta?{" "}
                <span onClick={() => setShowRegister(true)}>Registre-se</span>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <button type="submit" className="signin-btn">
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

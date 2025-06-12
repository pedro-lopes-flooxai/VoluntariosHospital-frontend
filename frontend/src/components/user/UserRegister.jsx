import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function UserRegister({ show, onSave, onClose, user, isAdmin }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(user?.role || "user");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPassword("");
    setConfirmPassword("");
    setRole(user?.role || "user");
  }, [user]);

  if (!show) return null;

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (!user && password.trim() === "") {
      setError("Senha é obrigatória para novo usuário.");
      return;
    }

    setError("");
    onSave?.({ name, email, password, role });
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {user ? "Editar Usuário" : "Novo Usuário"}
        </h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha {user ? "(deixe vazio para manter)" : ""}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={user ? "Deixe a senha vazia para mantê-la" : ""}
            required={!user}
          />

          <label>Confirmar Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={user ? "Confirme a senha ou deixe vazio" : ""}
            required={!user}
          />

          {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

          {isAdmin && (
            <>
              <label>Nível</label>
              <div className="custom-select">
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
                <FaChevronDown className="select-icon" />
              </div>
            </>
          )}

          <div className="modal-buttons">
            <button type="submit" className="modal-btn save-btn">
              Salvar
            </button>
            <button
              type="button"
              className="modal-btn cancel-btn"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

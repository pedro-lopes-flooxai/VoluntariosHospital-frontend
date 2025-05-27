 import React, { useState } from "react";
import Main from "../template/Main";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "./UserCrud.css";
import { FaChevronDown } from "react-icons/fa";


const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Gerencie os usuários do sistema"
};

export default function UserCrud() {
  const [users, setUsers] = useState([
    { id: 1, name: "Maria Julia da Silva", email: "mjds@empresa.com", role: "usuario" },
    { id: 2, name: "Ana Silva Alt", email: "anasilva@negocio.com.br", role: "admin" }
  ]);

  const [filters, setFilters] = useState({ name: "", email: "" });
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    u.email.toLowerCase().includes(filters.email.toLowerCase())
  );

  function handleSave(user) {
    if (editingUser) {
      setUsers(users.map(u => (u.id === editingUser.id ? { ...user, id: editingUser.id } : u)));
    } else {
      setUsers([...users, { ...user, id: Date.now() }]);
    }
    closeModal();
  }

  function handleEdit(user) {
    setEditingUser(user);
    setShowModal(true);
  }

  function handleDelete(id) {
    setUsers(users.filter(u => u.id !== id));
  }

  function closeModal() {
    setEditingUser(null);
    setShowModal(false);
  }

  return (
    <Main {...headerProps}>
      <div className="user-crud-container">
        <div className="filter-form">
          <input
            type="text"
            placeholder="Digite o nome..."
            value={filters.name}
            onChange={e => setFilters({ ...filters, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Digite o e-mail..."
            value={filters.email}
            onChange={e => setFilters({ ...filters, email: e.target.value })}
          />
          <button className="modal-btn save-btn" onClick={() => setShowModal(true)}>
            <FaPlus /> Adicionar novo
          </button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="icon-btn edit" onClick={() => handleEdit(user)}><FaEdit /></button>
                  <button className="icon-btn delete" onClick={() => handleDelete(user.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <UserModal onSave={handleSave} onClose={closeModal} user={editingUser} />}
    </Main>
  );
}

function UserModal({ onSave, onClose, user }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(user?.role || "usuario");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setError("");
    onSave({ name, email, password, role });
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>{user ? "Editar Usuário" : "Novo Usuário"}</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Nome</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Senha</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

          <label>Confirmar Senha</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

          {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

          <label>Nível</label>
          <div className="custom-select">
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="usuario">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
            <FaChevronDown className="select-icon" />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="modal-btn save-btn">Salvar</button>
            <button type="button" className="modal-btn cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

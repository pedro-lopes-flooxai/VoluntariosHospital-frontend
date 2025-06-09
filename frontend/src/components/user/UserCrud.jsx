import React, { useEffect, useState, useCallback } from "react";
import Main from "../template/Main";
import { FaEdit, FaTrash, FaPlus, FaChevronDown } from "react-icons/fa";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser
} from "./UserServices";
import "./UserCrud.css";

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Gerencie os usuários do sistema"
};

export default function UserCrud() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "" });
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const loadUsers = useCallback(async () => {
    try {
      const data = await fetchUsers(token);
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar usuários. Talvez seu login expirou.");
    }
  }, [token]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      u.email.toLowerCase().includes(filters.email.toLowerCase())
  );

  async function handleSave(user) {
    try {
      if (editingUser) {
        const updated = await updateUser(editingUser._id, user, token);
        setUsers(users.map(u => (u._id === editingUser._id ? updated : u)));
      } else {
        await createUser(user, token);
        loadUsers();
      }
      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erro ao salvar usuário");
    }
  }

  function handleEdit(user) {
    setEditingUser(user);
    setShowModal(true);
    setError(null);
  }

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja deletar este usuário?")) return;
    try {
      await deleteUser(id, token);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erro ao deletar usuário");
    }
  }

  function closeModal() {
    setEditingUser(null);
    setShowModal(false);
    setError(null);
  }

  return (
    <Main {...headerProps}>
      <div className="user-crud-container">
        <div className="filter-form">
          <input
            type="text"
            placeholder="Digite o nome..."
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Digite o e-mail..."
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          />
          <button className="modal-btn save-btn" onClick={() => setShowModal(true)}>
            <FaPlus /> Adicionar novo
          </button>
        </div>

        {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Nível</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="icon-btn edit" onClick={() => handleEdit(user)}>
                    <FaEdit />
                  </button>
                  <button className="icon-btn delete" onClick={() => handleDelete(user._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <UserModal onSave={handleSave} onClose={closeModal} user={editingUser} />
      )}
    </Main>
  );
}

function UserModal({ onSave, onClose, user }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(user?.role || "user");
  const [error, setError] = useState("");

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
    onSave({ name, email, password, role });
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
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

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

          <label>Nível</label>
          <div className="custom-select">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
            <FaChevronDown className="select-icon" />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="modal-btn save-btn">
              Salvar
            </button>
            <button type="button" className="modal-btn cancel-btn" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

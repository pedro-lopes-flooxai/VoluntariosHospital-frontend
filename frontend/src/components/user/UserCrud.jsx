import React, { useEffect, useState, useCallback, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Main from "../template/Main";
import { FaEdit, FaTrash, FaPlus, FaChevronDown } from "react-icons/fa";
import { fetchUsers, createUser, updateUser, deleteUser } from "./UserServices";
import UserRegister from "./UserRegister";
import "./UserCrud.css";

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Gerencie os usuários do sistema",
};

export default function UserCrud() {
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser?.role === "admin";

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
        setUsers(users.map((u) => (u._id === editingUser._id ? updated : u)));
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
          <button
            className="modal-btn save-btn"
            onClick={() => setShowModal(true)}
          >
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
                  <button
                    className="icon-btn edit"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="icon-btn delete"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <UserRegister
          show={showModal}
          onSave={handleSave}
          onClose={closeModal}
          user={editingUser}
          isAdmin={isAdmin}
        />
      )}
    </Main>
  );
}

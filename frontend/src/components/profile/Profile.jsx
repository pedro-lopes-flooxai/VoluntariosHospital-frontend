import React, { useEffect, useState } from "react";
import Main from "../template/Main";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import API_BASE_URL from "../../api";

const headerProps = {
  icon: "user",
  title: "Meu perfil",
  subtitle: ""
};

const Profile = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [acceptedTasks, setAcceptedTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE_URL}/api/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error('Erro ao carregar dados do usuário:', err));

    fetch(`${API_BASE_URL}/api/tasks/applied`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Erro HTTP! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setAcceptedTasks(data);
        } else {
          setAcceptedTasks([]);
        }
        setLoadingTasks(false);
      })
      .catch(err => {
        console.error('Erro ao carregar tarefas candidatas:', err);
        setAcceptedTasks([]);
        setLoadingTasks(false);
      });
  }, [token]);

  if (!userData) return <p>Carregando perfil...</p>;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <Main {...headerProps}>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-section">
            <p><strong>Nome:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            {userData.role === 'user' && (
              <p><strong>Pontos acumulados:</strong> {userData.score || 0}</p>
            )}
          </div>

          <hr />

          {userData.role === 'user' && (
            <div className="profile-section">
              <h4>Tarefas candidatas</h4>
              {loadingTasks ? (
                <p>Carregando tarefas...</p>
              ) : acceptedTasks.length === 0 ? (
                <p>Você ainda não se candidatou a nenhuma tarefa.</p>
              ) : (
                <div className="tasks-list">
                  {acceptedTasks.map(task => {
                    const statusMap = {
                      pending: 'Pendente',
                      approved: 'Aprovada',
                      rejected: 'Rejeitada'
                    };

                    const statusClassMap = {
                      pending: 'status-pending',
                      approved: 'status-approved',
                      rejected: 'status-rejected'
                    };

                    return (
                      <div key={task._id} className="task-card">
                        <p><strong>{task.title}</strong></p>
                        <p className={`task-status ${statusClassMap[task.status]}`}>
                          Status: {statusMap[task.status] || task.status}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <hr />

          <div className="profile-section">
            <button 
              onClick={handleLogout} 
              className="profile-link highlight-exit"
              type="button"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Profile;

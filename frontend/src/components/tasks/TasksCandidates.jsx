import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TasksCandidates.css';
import API_BASE_URL from "../../api";

const statusLabels = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
};

export default function TasksCandidates() {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        setCandidates(data.candidates || []);
        setTaskTitle(data.title || 'Tarefa');
      })
      .catch(err => {
        console.error('Erro ao buscar tarefa:', err);
      });
  }, [id]);

  const updateStatus = (candidateId, status) => {
    fetch(`${API_BASE_URL}/api/tasks/${id}/candidates/${candidateId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })
      .then(res => res.json())
      .then(() => {
        setCandidates(prev =>
          prev.map(c =>
            c.user && c.user._id === candidateId ? { ...c, status } : c
          )
        );
      })
      .catch(err => {
        console.error('Erro ao atualizar status:', err);
      });
  };

  return (
    <div className="candidates-container">
      <h2>Candidatos para: {taskTitle}</h2>
      {candidates.length === 0 && <p>Nenhum candidato ainda.</p>}

      {candidates.map((c, index) => (
        <div key={c.user?._id || index} className="candidate-card">
          <p><strong>Nome:</strong> {c.user?.name || 'Desconhecido'}</p>
          <p><strong>Status:</strong> {statusLabels[c.status]}</p>
          {c.status === 'pending' && (
            <div className="candidate-actions">
              <button className="btn-approve" onClick={() => updateStatus(c.user._id, 'approved')}>
                Aprovar
              </button>
              <button className="btn-reject" onClick={() => updateStatus(c.user._id, 'rejected')}>
                Rejeitar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

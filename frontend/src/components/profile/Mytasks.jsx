import React, { useEffect, useState } from "react";
import Main from "../template/Main";
import './Mytasks.css'; 

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) return;
    fetch('http://localhost:5000/api/tasks')
      .then(res => res.json())
      .then(data => {
        const accepted = data.filter(task =>
          task.candidates.some(c => c.user === user._id && c.status === 'approved')
        );
        setTasks(accepted);
      });
  }, [user]);

  if (!user) return <p>Você precisa estar logado para ver suas tarefas.</p>;

  return (
    <Main icon="user" title="Minhas Tarefas" subtitle="Tarefas aceitas">
      <div className="task-details-container">
        {tasks.length === 0 && <p>Você não tem tarefas aceitas no momento.</p>}

        {tasks.map(task => (
          <div key={task._id} className="task-details-card">
            <h4>{task.title}</h4>

            <div className="task-details-content">
              {task.photo && (
                <img
                  src={task.photo}
                  alt="Foto do paciente"
                  className="task-details-photo"
                />
              )}

              <div className="task-details-info">
                <p><strong>Paciente:</strong> {task.patient}</p>
                <p><strong>Local:</strong> {task.local || '-'}</p>
                <p><strong>Tipo:</strong> {task.type}</p>
                <p><strong>Pontos Ganhos:</strong> {task.score}</p>
                <p><strong>Carga Horária:</strong> {task.hours}</p>
                <p><strong>Requisitos:</strong> {task.requirements}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Main>
  );
}

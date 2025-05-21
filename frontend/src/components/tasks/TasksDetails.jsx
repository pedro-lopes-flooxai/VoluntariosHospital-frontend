import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Main from "../template/Main";
import './TasksDetails.css';
import tasksData from "./tasksData";

export default function TaskDetails() {
    const { id } = useParams();
    const history = useHistory();
    const task = tasksData.find(task => task.id === parseInt(id));

    if (!task) return <p>Tarefa não encontrada.</p>;

    return (
        <Main  icon="calendar" title="Detalhes da Tarefa" subtitle={task.title}>
            <div className="task-details-container">
                <div className="task-details-card">
                    <h4>
                        {task.title}
                    </h4>


                    <div className="task-details-content">
                        <img
                            src={task.photo}
                            alt="Foto do paciente"
                            className="task-details-photo"
                        />

                        <div className="task-details-info">
                            <p><strong>Paciente:</strong> {task.patient}</p>
                            <p><strong>Local:</strong> {task.local}</p>
                            <p><strong>Tipo:</strong> {task.type}</p>
                            <p><strong>Pontuação:</strong> {task.score}</p>
                            <p><strong>Carga Horária:</strong> {task.hours}</p>
                            <p><strong>Requisitos:</strong> {task.requirements}</p>
                            <p><strong>Dias restantes:</strong> {task.daysLeft}</p>
                        </div>
                    </div>

                    <div className="task-details-buttons">
                        <button className="task-details-btn" onClick={() => history.goBack()}>
                            Voltar
                        </button>
                        <button className="task-details-btn apply-btn" onClick={() => alert('Candidatura enviada!')}>
                            Candidatar-se
                        </button>
                    </div>
                </div>
            </div>
        </Main>
    );
}

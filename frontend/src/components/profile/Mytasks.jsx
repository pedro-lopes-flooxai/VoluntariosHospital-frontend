import React from "react";
import Main from "../template/Main";
import tasksData from "../tasks/tasksData";
import './Mytasks.css'; 

export default function MyTasks() {
    return (
        <Main icon="user" title="Minhas Tarefas" subtitle="Tarefas aceitas">
            <div className="task-details-container">
                {tasksData.map(task => (
                    <div key={task.id} className="task-details-card">
                        <h4>{task.title}</h4>

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
                                <p><strong>Potos Ganhos:</strong> {task.score}</p>
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

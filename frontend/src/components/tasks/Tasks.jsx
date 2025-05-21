import React, { Component } from "react";
import Main from "../template/Main";
import { Link } from "react-router-dom";
import './Tasks.css';
import tasks from "./tasksData";

const headerProps = {
  icon: "briefcase",
  title: "Tarefas",
  subtitle: "Tela de Tarefas"
};

export default class Tasks extends Component {
  renderCards() {
    return tasks.map(task => (
      <div key={task.id} className="task-card">
        <h4>{task.title}</h4>
        <div className="task-info">
          <span>{task.local}</span>
          <span>{task.type}</span>
          <span>{task.score}</span>
        </div>
        <Link to={`/tasks/${task.id}`} className="task-btn">
          Ver descrição da tarefa
        </Link>
    
        <div className="task-footer">
          Faltam {task.daysLeft} dias para encerrar esta tarefa
        </div>
      </div>
    ));
  }

  render() {
    return (
      <Main {...headerProps}>
        <div className="tasks-container">{this.renderCards()}</div>
      </Main>
    );
  }
}
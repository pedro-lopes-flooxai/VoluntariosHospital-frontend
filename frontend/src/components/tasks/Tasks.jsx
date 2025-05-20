import React, { Component } from "react"
import Main from "../template/Main"
import './Tasks.css' 

const headerProps = {
  icon: "briefcase", 
  title: "Tarefas",
  subtitle: "Tela de Tarefas"
}

const tasks = [
  {
    id: 1,
    title: "Ajudar paciente com banho",
    local: "São Paulo, SP",
    type: "Cuidados com idosos",
    score: "50 pontos",
    daysLeft: 2
  },
  {
    id: 2,
    title: "Organizar quarto do paciente",
    local: "São Paulo, SP",
    type: "Cuidados com adolescentes",
    score: "30 pontos",
    daysLeft: 3
  },
  {
    id: 3,
    title: "Acompanhar paciente durante o dia",
    local: "São Paulo, SP",
    type: "Cuidados com idosos",
    score: "20 pontos",
    daysLeft: 2
  }
]

export default class Tasks extends Component {
  renderCards() {
    return tasks.map(task => (
      <div key={task.id} className="task-card">
        <h4>{task.title}</h4>
        <div className="task-info">
          <span> {task.local}</span>
          <span> {task.type}</span>
          <span> {task.score}</span>
        </div>
        <button className="task-btn">Ver descrição da tarefa</button>
        <div className="task-footer"> Faltam {task.daysLeft} dias para encerrar esta tarefa</div>
      </div>
    ))
  }

  render() {
    return (
      <Main {...headerProps}>
        <div className="tasks-container">
          {this.renderCards()}
        </div>
      </Main>
    )
  }
}

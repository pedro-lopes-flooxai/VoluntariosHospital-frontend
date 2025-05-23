import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt } from 'react-icons/fa'
import Main from '../template/Main'
import tasks from './tasksData'
import './Tasks.css'

const headerProps = {
  icon: 'briefcase',
  title: 'Tarefas',
  subtitle: 'Tela de Tarefas'
}

export default function Tasks() {
  const [taskList] = useState(tasks)

  return (
    <Main {...headerProps}>
      <div className="tasks-container">
        {taskList.map(task => (
          <div key={task.id} className="task-card">
            <h4>{task.title}</h4>
            <div className="task-info">
              <span>{task.local}</span>
              <span>{task.type}</span>
              <span>{task.score}</span>
            </div>
            <Link to={`/tasks/${task.id}`} className="task-btn">
              <FaCalendarAlt /> Ver descrição da tarefa
            </Link>
            <div className="task-footer">
              Faltam {task.daysLeft} dias para encerrar esta tarefa
            </div>
          </div>
        ))}
      </div>
    </Main>
  )
}

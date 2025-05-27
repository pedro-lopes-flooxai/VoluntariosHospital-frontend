import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaPlus } from 'react-icons/fa'
import Main from '../template/Main'
import tasks from './tasksData'
import CreateTaskModal from './CreateTask' 
import './Tasks.css'

const headerProps = {
  icon: 'briefcase',
  title: 'Tarefas',
  subtitle: 'Tela de Tarefas'
}

export default function Tasks() {
  const [taskList] = useState(tasks)
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({
    patient: '',
    title: '',
    type: 'Cuidados com idosos',
    hours: '',
    requirements: '',
    daysLeft: '',
    score: '',
    photo: ''
  })

  const handleCreateTask = (e) => {
    e.preventDefault()
    console.log('Tarefa criada:', newTask)
    setShowModal(false)
    setNewTask({
      patient: '',
      title: '',
      type: 'Cuidados com idosos',
      hours: '',
      requirements: '',
      daysLeft: '',
      score: '',
      photo: ''
    })
  }

  return (
    <Main {...headerProps}>
      <div className="tasks-header">
        <button className="create-task-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Criar Tarefa
        </button>
      </div>

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

      {showModal && (
        <CreateTaskModal
          newTask={newTask}
          setNewTask={setNewTask}
          onClose={() => setShowModal(false)}
          onCreateTask={handleCreateTask}
        />
      )}
    </Main>
  )
}

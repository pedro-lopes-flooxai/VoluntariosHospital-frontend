import React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Main from '../template/Main'
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa'
import tasksData from './tasksData'
import './TasksDetails.css'

export default function TaskDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const user = JSON.parse(localStorage.getItem('user'))

  const taskId = parseInt(location.state?.taskId || id)
  const task = tasksData.find(task => task.id === taskId)

  if (!task) return <p>Tarefa não encontrada.</p>

  const handleApply = () => {
    if (!user) {
      alert('Você precisa estar logado para se candidatar.')
      navigate('/login') 
      return
    }

    const applied = JSON.parse(localStorage.getItem('appliedTasks') || '[]')
    if (!applied.includes(taskId)) {
      applied.push(taskId)
      localStorage.setItem('appliedTasks', JSON.stringify(applied))
    }
    alert('Candidatura enviada!')
    navigate('/tasks')
  }

  return (
    <Main icon="calendar" title="Detalhes da Tarefa" subtitle={task.title}>
      <div className="task-details-container">
        <div className="task-details-card">
          <h4>{task.title}</h4>
          <div className="task-details-content">
            <img
              src={task.photo}
              alt="Foto do paciente"
              className="task-details-photo"
            />
            <div className="task-details-info">
              <p><strong>Paciente:</strong> {task.patient}</p>
              <p><strong>Tipo:</strong> {task.type}</p>
              <p><strong>Pontuação:</strong> {task.score}</p>
              <p><strong>Carga Horária:</strong> {task.hours}</p>
              <p><strong>Requisitos:</strong> {task.requirements}</p>
              <p><strong>Dias restantes:</strong> {task.daysLeft}</p>
            </div>
          </div>
          <div className="task-details-buttons">
            <button className="task-details-btn" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Voltar
            </button>
            <button className="task-details-btn apply-btn" onClick={handleApply}>
              <FaPaperPlane /> Candidatar-se
            </button>
          </div>
        </div>
      </div>
    </Main>
  )
}

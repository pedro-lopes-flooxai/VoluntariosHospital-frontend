import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Main from '../template/Main'
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa'
import './TasksDetails.css'

export default function TaskDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetch(`http://localhost:5000/api/tasks/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Tarefa não encontrada')
        return res.json()
      })
      .then(data => {
        setTask(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleApply = () => {
    if (!user) {
      alert('Você precisa estar logado para se candidatar.')
      navigate('/login')
      return
    }

    const applied = JSON.parse(localStorage.getItem('appliedTasks') || '[]')
    if (!applied.includes(id)) {
      applied.push(id)
      localStorage.setItem('appliedTasks', JSON.stringify(applied))
    }
    alert('Candidatura enviada!')
    navigate('/tasks')
  }

  if (loading) return <p>Carregando tarefa...</p>
  if (error || !task) return <p>{error || 'Tarefa não encontrada.'}</p>

  return (
    <Main icon="calendar" title="Detalhes da Tarefa" subtitle={task.title}>
      <div className="task-details-container">
        <div className="task-details-card">
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
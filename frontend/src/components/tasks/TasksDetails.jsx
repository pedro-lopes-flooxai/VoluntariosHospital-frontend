import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Main from '../template/Main'
import { FaArrowLeft, FaPaperPlane, FaUsers } from 'react-icons/fa'
import './TasksDetails.css'
import API_BASE_URL from '../../api'

export default function TaskDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tasks/${id}`)
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

    fetch(`${API_BASE_URL}/api/tasks/${id}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Erro desconhecido ao se candidatar')
        alert(data.message)
        navigate('/profile')
      })
      .catch(err => {
        alert(`Erro: ${err.message}`)
        console.error('Erro ao se candidatar:', err)
      })
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

            {user?.role === 'admin' ? (
              <button
                className="task-details-btn"
                onClick={() => navigate(`/tasks/${id}/candidates`)}
              >
                <FaUsers /> Ver Candidatos
              </button>
            ) : (
              <button className="task-details-btn apply-btn" onClick={handleApply}>
                <FaPaperPlane /> Candidatar-se
              </button>
            )}
          </div>
        </div>
      </div>
    </Main>
  )
}

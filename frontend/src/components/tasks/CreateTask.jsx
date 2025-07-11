import React, { useState } from 'react'
import { FaTimes, FaCheck, FaChevronDown } from 'react-icons/fa'
import './CreateTask.css'
import API_BASE_URL from "../../api"

export default function CreateTaskModal({
  onClose,
  onTaskCreated,
  navigate
}) {
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

  const token = localStorage.getItem('token')

  function handleInputChange(e) {
    const { name, value } = e.target
    setNewTask(prev => ({ ...prev, [name]: value }))
  }

  function handleImageUpload(e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewTask(prev => ({ ...prev, photo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()

    if (!token) {
      alert('Você precisa estar logado para criar uma tarefa.')
      navigate('/login')
      return
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
      })

      if (!res.ok) throw new Error('Erro ao criar tarefa')

      const createdTask = await res.json()

      onTaskCreated(createdTask)

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
       onClose()
    } catch (error) {
      console.error(error)
      alert('Erro ao criar tarefa')
    }
  }

  return (
    <div className="modal-overlay">
      <form className="modal-card" onSubmit={handleCreateTask}>
        <div className="modal-info">
          <label htmlFor="title">Título da Tarefa</label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-control"
            value={newTask.title}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="patient">Nome do Paciente</label>
          <input
            id="patient"
            name="patient"
            type="text"
            className="form-control"
            value={newTask.patient}
            onChange={handleInputChange}
            required
          />

          <div className="custom-select-wrapper">
            <label htmlFor="type">Tipo de Paciente</label>
            <div className="custom-select">
              <select
                id="type"
                name="type"
                className="form-control"
                value={newTask.type}
                onChange={handleInputChange}
              >
                <option value="Cuidados com idosos">Idoso</option>
                <option value="Cuidados com adolescentes">Adolescente</option>
              </select>
              <FaChevronDown className="select-icon" />
            </div>
          </div>

          <label htmlFor="hours">Carga Horária</label>
          <input
            id="hours"
            name="hours"
            type="number"
            className="form-control"
            value={newTask.hours}
            onChange={handleInputChange}
            min={0}
          />

          <label htmlFor="requirements">Requisitos</label>
          <input
            id="requirements"
            name="requirements"
            type="text"
            className="form-control"
            value={newTask.requirements}
            onChange={handleInputChange}
          />

          <label htmlFor="daysLeft">Dias restantes</label>
          <input
            id="daysLeft"
            name="daysLeft"
            type="number"
            className="form-control"
            value={newTask.daysLeft}
            onChange={handleInputChange}
            min={0}
          />

          <div className="score-selector">
            <label>Pontuação</label>
            <div className="score-buttons">
              {[20, 30, 50].map(value => (
                <button
                  key={value}
                  type="button"
                  className={`score-btn ${newTask.score === value ? 'active' : ''}`}
                  onClick={() => setNewTask({ ...newTask, score: value })}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <label htmlFor="photo">Foto do Paciente</label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImageUpload}
          />
        </div>

        <div className="task-details-buttons">
          <button
            type="button"
            className="task-details-btn"
            onClick={onClose}
          >
            <FaTimes /> Cancelar
          </button>
          <button type="submit" className="task-details-btn apply-btn">
            <FaCheck /> Criar
          </button>
        </div>
      </form>
    </div>
  )
}

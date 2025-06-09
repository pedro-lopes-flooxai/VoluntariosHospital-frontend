import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCalendarAlt, FaPlus } from 'react-icons/fa'
import Main from '../template/Main'
import CreateTaskModal from './CreateTask'
import './Tasks.css'
import API_BASE_URL from "../../../api";

const headerProps = {
  icon: 'briefcase',
  title: 'Tarefas',
  subtitle: 'Tela de Tarefas'
}

export default function Tasks() {
  const navigate = useNavigate()
  const [taskList, setTaskList] = useState([])
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

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tasks`)
      .then(res => res.json())
      .then(data => setTaskList(data))
      .catch(err => console.error('Erro ao carregar tarefas:', err))
  }, [])

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
      setTaskList(prev => [...prev, createdTask])
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

    } catch (error) {
      console.error(error)
      alert('Erro ao criar tarefa')
    }
  }

  const handleCreateClick = () => {
    if (!user) {
      alert('Você precisa estar logado para criar uma tarefa.')
      navigate('/login')
    } else {
      setShowModal(true)
    }
  }

  return (
    <Main {...headerProps}>
      <div className="tasks-header">
        <button className="create-task-btn" onClick={handleCreateClick}>
          <FaPlus /> Criar Tarefa
        </button>
      </div>

      <div className="tasks-container">
        {taskList.map(task => (
          <div key={task._id} className="task-card">
            <h4>{task.title}</h4>
            <div className="task-info">
              <span>{task.patient}</span>
              <span>{task.type}</span>
              <span>{task.score}</span>
            </div>
            <Link to={`/tasks/${task._id}`} state={{ taskId: task._id }} className="task-btn">
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
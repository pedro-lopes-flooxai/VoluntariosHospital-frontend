import React from 'react'
import { 
  FaBriefcase,
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaUserPlus,
  FaTasks,
  FaTrophy,
  FaHome
} from 'react-icons/fa'
import './Header.css'

const iconMap = {
  briefcase: <FaBriefcase />,
  user: <FaUser />,
  calendar: <FaCalendarAlt />,
  users: <FaUsers />,
  'user-plus': <FaUserPlus />,
  tasks: <FaTasks />,
  board: <FaTrophy />,
  home: <FaHome />
}

export default function Header(props) {
  return (
    <header className="header d-none d-sm-flex flex-column">
      <h1 className="mt-3">
        {iconMap[props.icon] || <FaUsers />} {props.title}
      </h1>
      <p className="lead text-muted">{props.subtitle}</p>
    </header>
  )
}

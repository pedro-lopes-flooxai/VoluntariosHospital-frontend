import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../components/landingPage/LandingPage';
import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';
import Tasks from '../components/tasks/Tasks';
import TasksDetails from '../components/tasks/TasksDetails';
import Board from '../components/leaderboard/Board';
import Profile from '../components/profile/Profile';
import TasksCandidates from '../components/tasks/TasksCandidates';
import PrivateRoute from './PrivateRoute';

export default function AppRoutes({ onShowLogin }) {
  return (
    <Routes>
      <Route path="/" element={<LandingPage onShowLogin={onShowLogin} />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/board" element={<Board />} />

      <Route
        path="/home"
        element={<Home onShowLogin={onShowLogin} />}
      />

      <Route path="/tasks/:id" element={<TasksDetails />} />

      <Route
        path="/profile"
        element={
          <PrivateRoute allowedRoles={['user', 'admin']}>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <UserCrud />
          </PrivateRoute>
        }
      />

      <Route
        path="/tasks/:id/candidates"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <TasksCandidates />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

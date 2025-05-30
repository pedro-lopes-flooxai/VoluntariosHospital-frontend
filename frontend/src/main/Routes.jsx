import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../components/landingPage/LandingPage';
import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';
import Tasks from '../components/tasks/Tasks';
import TasksDetails from '../components/tasks/TasksDetails';
import Board from '../components/leaderboard/Board';
import Profile from '../components/profile/Profile';
import MyTasks from '../components/profile/Mytasks';
import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/board" element={<Board />} />

      <Route
        path="/home"
        element={
          <Home />
        }
      />

      <Route path="/tasks"
        element={
          <Tasks />
        } />

      <Route path="/tasks/:id"
        element={
          <TasksDetails />
        } />


      <Route
        path="/profile"
        element={
          <PrivateRoute allowedRoles={['user', 'admin']}>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/mytasks"
        element={
          <PrivateRoute allowedRoles={['user', 'admin']}>
            <MyTasks />
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

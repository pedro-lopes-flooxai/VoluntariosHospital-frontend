import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../components/landingPage/LandingPage';
import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';
import Tasks from '../components/tasks/Tasks';
import TasksDetails from '../components/tasks/TasksDetails';
import Board from '../components/leaderboard/Board';
import UserRegister from '../components/user/UserRegister';
import Profile from '../components/profile/Profile';
import MyTasks from '../components/profile/Mytasks';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<UserCrud />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/tasks/:id" element={<TasksDetails />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/leaderboard" element={<Board />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mytasks" element={<MyTasks />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

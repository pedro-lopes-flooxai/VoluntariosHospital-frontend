import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

import Logo from '../components/template/Logo';
import Nav from '../components/template/Nav';
import AppRoutes from './Routes';

function AppContent() {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    return (
        <div className={`app ${isLandingPage ? 'landing' : ''}`}>
            {!isLandingPage && <Logo />}
            {!isLandingPage && <Nav />}
            <AppRoutes />
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

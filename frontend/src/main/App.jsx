import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../components/template/Logo';
import Nav from '../components/template/Nav';
import AppRoutes from './Routes';
import UserLogin from '../components/user/UserLogin';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  function AppContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const isLandingPage = location.pathname === '/';

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCurrentUser(null);
      navigate('/'); 
    };

    useEffect(() => {
      if (currentUser) {
          navigate('/home');
          }
    }, [navigate]); 

    return (
      <div className={`app ${isLandingPage ? 'landing' : ''}`}>
        {!isLandingPage && <Logo />}
        {!isLandingPage && (
          <Nav
            currentUser={currentUser}
            onShowLogin={() => setShowLoginModal(true)}
            onLogout={handleLogout}
          />
        )}

        <AppRoutes
          currentUser={currentUser}
          onShowLogin={() => setShowLoginModal(true)}
        />

        <UserLogin
          show={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={(user) => {
            setCurrentUser(user);
            setShowLoginModal(false);
          }}
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

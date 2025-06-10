import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { useContext, useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../components/template/Logo';
import Nav from '../components/template/Nav';
import AppRoutes from './Routes';
import UserLogin from '../components/user/UserLogin';
import { AuthProvider, AuthContext } from '../components/contexts/AuthContext';

function AppContent() {
  const { currentUser, login, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isLandingPage = location.pathname === '/';
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser]);

  return (
    <div className={`app ${isLandingPage ? 'landing' : ''}`}>
      {!isLandingPage && <Logo />}
      {!isLandingPage && (
        <Nav
          currentUser={currentUser}
          onShowLogin={() => setShowLoginModal(true)}
          onLogout={() => {
            logout();
            navigate('/');
          }}
        />
      )}

      <AppRoutes onShowLogin={() => setShowLoginModal(true)} />

      <UserLogin
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={(user) => {
          login(user);
          setShowLoginModal(false);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

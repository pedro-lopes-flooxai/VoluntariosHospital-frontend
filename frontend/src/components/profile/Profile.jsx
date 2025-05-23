import React from "react";
import Main from "../template/Main";
import { Link } from "react-router-dom";
import './Profile.css';

const headerProps = {
  icon: "user",
  title: "Meu perfil",
  subtitle: ""
};

const Profile = () => {
  return (
    <Main {...headerProps}>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-section">
            <p className="mb-0"><strong>Nome:</strong> .</p>
            <p className="mb-0"><strong>Email:</strong> .</p>
            <p className="mb-0"><strong>Pontos:</strong> .</p>
          </div>

          <hr />

          <div className="profile-section">
            <Link to="/mytasks" className="profile-link">
              Ver Tarefas Aceitas
            </Link>
          </div>

          <hr />

          <div className="profile-section">
            <Link to="/" className="profile-link highlight-exit">
              Sair
            </Link>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Profile;

import React, { useEffect, useState, useContext } from "react";
import Main from "../template/Main";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api";

import HomeAssist1Img from "../../assets/imgs/HomeAssist1Img.png";
import HomeAssist2Img from "../../assets/imgs/HomeAssist2Img.png";

import { AuthContext } from "../contexts/AuthContext";

export default function Home({ onShowLogin }) {
  const navigate = useNavigate();
  const [totalScore, setTotalScore] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
     fetch(`${API_BASE_URL}/api/users/total-score`)
      .then((res) => res.json())
      .then((data) => setTotalScore(data.totalScore))
      .catch((err) => {
        console.error("Erro ao buscar pontuação total:", err);
        setTotalScore(null);
      });
  }, []);

  return (
    <Main icon="home" title="Início" subtitle="Tela Inicial">
      <div className="home-header">Seja voluntário e faça a diferença</div>
      <hr />
      <p className="home-subtext">
        Candidate-se a vagas de voluntariado para oferecer apoio e assistência a
        pacientes.
      </p>

      <div className="card-container">
        <div
          className="info-card card-hover"
          onClick={() => navigate("/tasks")}
        >
          <div className="card-content">
            <h3>Vagas Disponíveis</h3>
            <p>Veja as oportunidades atuais de voluntariado</p>
          </div>
          <img
            src={HomeAssist1Img}
            alt="Voluntário com idosa"
            className="card-img"
          />
        </div>

        <div
          className={`info-card card-hover ${currentUser ? "disabled" : ""}`}
          onClick={() => {
            if (!currentUser) onShowLogin();
          }}
        >
          <div className="card-content">
            <p>
              {currentUser
                ? "Você já está logado no sistema"
                : "Junte-se a nós e comece a fazer a diferença"}
            </p>
          </div>
          <img
            src={HomeAssist2Img}
            alt="Médica com idoso"
            className="card-img"
          />
        </div>
      </div>

      <div className="score-card card-hover" onClick={() => navigate("/board")}>
        <h3>Pontuação Geral</h3>
        <p>{totalScore !== null ? `${totalScore} pontos` : "Carregando..."}</p>
      </div>
    </Main>
  );
}

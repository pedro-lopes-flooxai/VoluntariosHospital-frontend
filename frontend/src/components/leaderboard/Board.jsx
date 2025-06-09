import React, { useEffect, useState } from "react";
import Main from "../template/Main";
import { FaMedal, FaUser } from "react-icons/fa";
import "./Board.css";
import API_BASE_URL from "../../api";

const headerProps = {
  icon: "trophy",
  title: "Ranking de Voluntários",
  subtitle: "Tela de Pontuação",
};

const Board = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/users/ranking`)
      .then((res) => res.json())
      .then((data) => setRanking(data))
      .catch((err) => console.error("Erro ao buscar ranking:", err));
  }, []);

  const getMedal = (index) => {
    if (index === 0) return <FaMedal className="medal gold" />;
    if (index === 1) return <FaMedal className="medal silver" />;
    if (index === 2) return <FaMedal className="medal bronze" />;
    return <FaUser className="default-icon" />;
  };

  return (
    <Main {...headerProps}>
      <div className="ranking-board">
        {ranking.map((user, index) => (
          <div key={user._id} className="ranking-item">
            <div className="icon">{getMedal(index)}</div>
            <div className="info">
              <span className="name">{user.name}</span>
              <span className="score">{user.score} pontos</span>
            </div>
          </div>
        ))}
      </div>
    </Main>
  );
};

export default Board;

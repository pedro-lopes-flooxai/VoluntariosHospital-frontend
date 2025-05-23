import React from "react";
import Main from "../template/Main";

const headerProps = {
  icon: "trophy",
  title: "Pontuação",
  subtitle: "Tela de Pontuação",
};

const Board = () => (
  <Main {...headerProps}>
    <div className="display-4">Conteúdo</div>
    <hr />
    <p className="mb-0">Tabela</p>
  </Main>
);

export default Board;

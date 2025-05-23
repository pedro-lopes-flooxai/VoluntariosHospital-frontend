import React from "react";
import Main from "../template/Main";

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Tela de Usuários"
};

export default function UserCrud() {
  return (
    <Main {...headerProps}>
      <div className="display-4">Conteúdo</div>
    </Main>
  );
}

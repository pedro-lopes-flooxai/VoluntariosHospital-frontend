import React, { Component } from "react"
import Main from "../template/Main"

const headerProps = {
  icon: "trophy", 
  title: "Pontuação",
  subtitle: "Tela de Pontuação"
}

export default class Board extends Component {
  render() {
    return (
      <Main {...headerProps}>
        <div className="display-4">Conteúdo</div>
        <hr />
        <p className="mb-0">Tabela</p>
      </Main>
    )
  }
}

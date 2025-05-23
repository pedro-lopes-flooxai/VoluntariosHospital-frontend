import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
    return (
        <div className="landing-container">
            <div className="landing-left">
                <h1>
                    <span className="highlight">Conectando</span> pessoas a hospitais que precisam de ajuda
                    <br />
                    <strong>Faça a diferença com seu tempo e dedicação </strong>
                </h1>
                <p>
                    Junte-se a nós e transforme vidas com pequenas ações
                </p>
                <div className="landing-buttons">
                    <Link to="/home" className="btn-primary">
                        Comece agora →
                    </Link>
                    <button className="btn-secondary">Entrar em sua conta</button>
                </div>
            </div>
            <div className="landing-right">


            </div>
        </div>
    );
}

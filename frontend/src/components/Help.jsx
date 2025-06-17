import React from 'react';
import './Help.css'; // Estilos específicos para a tela de Ajuda

// Componente da tela de Ajuda
// Esta tela fornece informações sobre como usar o sistema FMP
function Help() {
  return (
    <div className="help-container">
      <div className="help-content">
        {/* Seção de Hábitos Positivos */}
        <div className="help-section positive-habits">
          <div className="habit-icon positive">+</div>
          <h3>Hábitos Positivos:</h3>
          <p>
            São comportamentos que você quer desenvolver para o seu bem-estar e 
            saúde mental e emocional.
          </p>
          <p>
            Criar hábitos positivos é essencial para uma vida mais saudável e produtiva.
          </p>
          <h4>Exemplos:</h4>
          <ul>
            <li>Beber mais água</li>
            <li>Praticar exercícios físicos</li>
            <li>Meditar</li>
            <li>Ler livros</li>
            <li>Dormir 8 horas por dia</li>
          </ul>
        </div>

        {/* Seção de Hábitos Negativos */}
        <div className="help-section negative-habits">
          <div className="habit-icon negative">-</div>
          <h3>Hábitos Negativos:</h3>
          <p>
            São comportamentos que, com o tempo, prejudicam sua saúde física e mental, 
            afetando negativamente sua qualidade de vida.
          </p>
          <p>
            Reconhecer e eliminar esses hábitos é o primeiro passo para uma rotina mais saudável.
          </p>
          <h4>Exemplos:</h4>
          <ul>
            <li>Usar o celular excessivamente</li>
            <li>Dormir muito tarde</li>
            <li>Pular refeições importantes</li>
            <li>Comer fast food frequentemente</li>
          </ul>
        </div>

        {/* Seção do Sistema XP */}
        <div className="help-section xp-system">
          <h3>Nosso sistema de XP baseado em estrelas</h3>
          <p>
            Cada avaliação contribui com uma quantidade específica de pontos de experiência 
            baseada no número de estrelas recebidas:
          </p>
          
          <div className="xp-breakdown">
            <div className="xp-item">
              <div className="stars">
                <span className="star">★</span>
              </div>
              <span className="xp-value">5 XP</span>
            </div>
            
            <div className="xp-item">
              <div className="stars">
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <span className="xp-value">10 XP</span>
            </div>
            
            <div className="xp-item">
              <div className="stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <span className="xp-value">15 XP</span>
            </div>
            
            <div className="xp-item">
              <div className="stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <span className="xp-value">20 XP</span>
            </div>
            
            <div className="xp-item">
              <div className="stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <span className="xp-value">25 XP</span>
            </div>
          </div>
        </div>

        {/* Seção de Frequência */}
        <div className="help-section frequency-section">
          <h3>Ao adicionar uma atividade, você pode escolher com que frequência ela será realizada, disponibilizando acompanhar seus hábitos de acordo com a sua rotina.</h3>
          
          <div className="frequency-options">
            <div className="frequency-card">
              <h4>DIÁRIA</h4>
              <div className="frequency-placeholder"></div>
            </div>
            
            <div className="frequency-card">
              <h4>SEMANAL</h4>
              <div className="frequency-placeholder"></div>
            </div>
            
            <div className="frequency-card">
              <h4>MENSAL</h4>
              <div className="frequency-placeholder"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;


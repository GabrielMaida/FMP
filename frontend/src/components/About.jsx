import React from 'react';
import './About.css'; // Estilos específicos para a tela Sobre Nós

// Componente da tela Sobre Nós
// Esta tela apresenta informações sobre o software e a equipe
function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        {/* Seção principal sobre o software */}
        <div className="about-section main-section">
          <div className="software-icon">💻</div>
          <h2>Software de Produtividade</h2>
          <p>
            Nosso software de produtividade é voltado para pessoas que desejam melhorar sua saúde 
            física e mental de forma prática, divertida e eficiente. Ele foi criado para combater 
            a procrastinação e a falta de organização, oferecendo uma solução completa para 
            quem busca mais organização, disciplina e bem-estar. Através da gamificação e 
            de uma rotina equilibrada, o aplicativo permite que os usuários registrem suas próprias 
            atividades. Tudo isso integrado com elementos de gamificação, tornando a experiência mais envolvente 
            e recompensadora, ideal para quem quer evoluir de forma intuitiva e prazerosa.
          </p>
        </div>

        {/* Seção da equipe */}
        <div className="about-section team-section">
          <div className="team-icon">👥</div>
          <h2>Equipe</h2>
          
          <div className="team-members">
            <div className="team-member">
              <h4>Luiz Felipe Carvalho Gomes</h4>
            </div>
            
            <div className="team-member">
              <h4>Gabriel Antônio Maida</h4>
            </div>
            
            <div className="team-member">
              <h4>Pedro Nicoletti Obalski</h4>
            </div>
            
            <div className="team-member">
              <h4>Pedro Arruda</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;


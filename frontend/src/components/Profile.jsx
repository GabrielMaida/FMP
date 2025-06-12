import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'; // Estilos específicos para a tela de perfil

// Componente da tela de Perfil do usuário
function Profile() {
  // Dados de exemplo do usuário (podem ser substituídos por dados reais de uma API)
  const user = {
    name: 'James Camargo',
    level: 10,
    xp: 1870,
    totalXp: 2000,
    achievements: [
      { id: 1, name: 'Primeiro Treino', icon: '🏆' },
      { id: 2, name: 'Maratona de Exercícios', icon: '🏅' },
      { id: 3, name: 'Mestre da Flexibilidade', icon: '🤸' },
    ],
  };

  // Calcula a porcentagem de XP para a barra de progresso
  const xpPercentage = (user.xp / user.totalXp) * 100;

  return (
    // Container principal da tela de perfil
    <div className="profile-container">
      {/* Card que agrupa as informações do perfil */}
      <div className="profile-card">
        {/* Seção do cabeçalho do perfil: avatar, nome e nível */}
        <div className="profile-header">
          <img src="/user-avatar.png" alt="Avatar do Usuário" className="profile-avatar" />
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-level">Nível {user.level}</p>
        </div>

        {/* Seção de progresso de XP */}
        <div className="profile-xp-section">
          <h3>PROGRESSO XP</h3>
          <div className="xp-bar-container">
            {/* Barra de progresso de XP, com largura dinâmica baseada na porcentagem */}
            <div className="xp-bar" style={{ width: `${xpPercentage}%` }}></div>
          </div>
          <p className="xp-text">{user.xp} / {user.totalXp} XP</p>
        </div>

        {/* Seção de conquistas do usuário */}
        <div className="profile-achievements-section">
          <h3>CONQUISTAS</h3>
          <div className="achievements-grid">
            {/* Mapeia e exibe cada conquista */}
            {user.achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-item">
                <span className="achievement-icon">{achievement.icon}</span>
                <p className="achievement-name">{achievement.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de ações do perfil: botões de navegação */}
        <div className="profile-actions">
          <Link to="/atividades" className="profile-button primary">Voltar para Atividades</Link>
          <button className="profile-button secondary">Editar Perfil</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;



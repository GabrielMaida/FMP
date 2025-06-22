import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css"; // Estilos específicos para a tela de perfil

// Componente da tela de Perfil do usuário
function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Busca os dados do usuário admin (id 0) ao carregar a página
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3500/api/user/0");
        if (!response.ok) {
          throw new Error("Falha ao buscar dados do usuário.");
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div>Carregando perfil...</div>;
  }

  // Calcula o nível e a barra de XP conforme a lógica solicitada
  const maxLevel = 10;
  const maxXp = 1000;
  const level = Math.min(Math.floor(user.exp / 100), maxLevel);
  const nextLevelXp = Math.min((level + 1) * 100, maxXp);
  const xpPercentage = Math.min((user.exp / nextLevelXp) * 100, 100);

  return (
    // Container principal da tela de perfil
    <div className="profile-container">
      {/* Card que agrupa as informações do perfil */}
      <div className="profile-card">
        {/* Seção do cabeçalho do perfil: avatar, nome e nível */}
        <div className="profile-header">
          <img
            src={user.url_imagem}
            alt={`Avatar de ${user.nome}`}
            className="profile-avatar"
          />
          <h2 className="profile-name">{user.nome}</h2>
          <p className="profile-level">Nível {level}</p>
        </div>

        {/* Seção de progresso de XP */}
        <div className="profile-xp-section">
          <h3>PROGRESSO XP</h3>
          <div className="xp-bar-container">
            {/* Barra de progresso de XP, com largura dinâmica baseada na porcentagem */}
            <div className="xp-bar" style={{ width: `${xpPercentage}%` }}></div>
          </div>
          <p className="xp-text">
            {user.exp} / {nextLevelXp} XP
          </p>
        </div>

        {/* Exemplo de conquistas (ajuste conforme sua lógica de backend) */}
        <div className="profile-achievements-section">
          <h3>CONQUISTAS</h3>
          <div className="achievements-grid">
            {/* Mapeia e exibe cada conquista */}
            <div className="achievement-item">
              <span className="achievement-icon">🏆</span>
              <p className="achievement-name">Primeira Atividade</p>
            </div>
            <div className="achievement-item">
              <span className="achievement-icon">⭐</span>
              <p className="achievement-name">Nível {user.nivel}</p>
            </div>
          </div>
        </div>

        {/* Seção de ações do perfil: botões de navegação */}
        <div className="profile-actions">
          <Link to="/atividades" className="profile-button primary">
            Voltar para Atividades
          </Link>
          <button className="profile-button secondary">Editar Perfil</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

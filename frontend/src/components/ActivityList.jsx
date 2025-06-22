import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import "./ActivityList.css"; // Estilos específicos para a tela de listagem de atividades

// Componente da tela de Listagem de Atividades
// Este componente exibe uma lista de atividades do usuário com opções para marcar como concluída, editar ou remover
function ActivityList() {
  // Obtém o usuário e a função para atualizá-lo do layout pai (MainLayout)
  const { user, setUser } = useOutletContext();

  const handleActivityComplete = async (e) => {
    // Apenas adiciona XP se a caixa for marcada (checked = true)
    if (!e.target.checked) {
      // Opcional: se quiser que o XP seja removido ao desmarcar, adicione a lógica aqui.
      // Por enquanto, não faz nada ao desmarcar.
      return;
    }

    // Verifica se o usuário já atingiu o nível máximo
    if (!user || user.exp >= 1000) {
      alert("Nível máximo alcançado!");
      // Desmarca a checkbox visualmente para evitar confusão
      e.target.checked = false;
      return;
    }

    // 1. Calcula o novo EXP e Nível
    const newExp = Math.min(user.exp + 10, 1000); // Adiciona 10 de EXP, com limite de 1000
    const newLevel = Math.min(Math.floor(newExp / 100), 10); // Nível sobe a cada 100 EXP, com limite de 10

    // 2. Prepara os dados para a requisição PUT
    // Mantém todos os dados do usuário e atualiza apenas exp e nivel
    const updatedUserData = {
      ...user,
      // A API espera um array de IDs, então mapeamos os objetos de tarefa de volta para seus IDs
      tarefas: user.tarefas.map((t) => t.id_tarefa),
      exp: newExp,
      nivel: newLevel,
    };

    // 3. Envia a requisição PUT para o backend
    try {
      const response = await fetch(
        `http://localhost:3500/api/user/${user.id_usuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao atualizar o usuário.");
      }

      // 4. Atualiza o estado local buscando novamente os dados do usuário para garantir consistência
      const refreshedUserResponse = await fetch(
        `http://localhost:3500/api/user/${user.id_usuario}`
      );
      const refreshedUser = await refreshedUserResponse.json();
      setUser(refreshedUser.user);
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      // Reverte a checkbox em caso de erro
      e.target.checked = false;
    }
  };

  return (
    // Container principal da tela de listagem de atividades
    <div className="activity-list-container">
      {/* Card que agrupa a lista de atividades */}
      <div className="activity-list-card">
        <h2 className="activity-list-title">Minhas Atividades</h2>

        {/* Verifica se há atividades para exibir */}
        {!user || user.tarefas.length === 0 ? (
          <div className="no-activities">
            <p>Você ainda não tem atividades cadastradas.</p>
            <p>Clique no botão abaixo para adicionar sua primeira atividade!</p>
          </div>
        ) : (
          <div className="activity-items">
            {/* Mapeia e renderiza cada atividade do usuário */}
            {user.tarefas.map((activity) => (
              <div key={activity.id_tarefa} className="activity-item">
                <input
                  type="checkbox"
                  // O onChange agora chama a função que atualiza o XP
                  onChange={handleActivityComplete}
                  className="activity-checkbox"
                />

                <div className="activity-info">
                  <span className="activity-title">{activity.nome}</span>
                  {activity.descricao && (
                    <span className="activity-description">
                      {activity.descricao}
                    </span>
                  )}
                  <div className="activity-details">
                    <span className="activity-difficulty">
                      {"★".repeat(activity.dificuldade)} Dificuldade
                    </span>
                    <span className="activity-frequency">
                      {activity.frequencia}
                    </span>
                  </div>
                </div>

                <div className="activity-actions">
                  <Link
                    to={`/atividades/editar/${activity.id_tarefa}`}
                    className="action-button edit-button"
                  >
                    Editar
                  </Link>
                  <button
                    className="action-button delete-button"
                    onClick={() =>
                      alert("Funcionalidade de remover a ser implementada.")
                    }
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botão para adicionar uma nova atividade */}
        <Link to="/atividades/nova" className="add-activity-button">
          Adicionar Nova Atividade
        </Link>
      </div>
    </div>
  );
}

export default ActivityList;

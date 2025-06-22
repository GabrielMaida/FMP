// frontend/src/components/ActivityList.jsx
import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./ActivityList.css";
import XpNotification from "./XpNotification";

// Componente da tela de Listagem de Atividades
function ActivityList() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();

  // Estado para armazenar MÚLTIPLAS mensagens de XP
  // Cada item será um objeto { id: uniqueId, message: string }
  const [xpNotifications, setXpNotifications] = useState([]);

  // Offset vertical para empilhar as notificações
  const NOTIFICATION_OFFSET = 50; // Pixels entre cada notificação empilhada

  const handleActivityComplete = async (e) => {
    if (!e.target.checked) return;

    if (!user || user.exp >= 1000) {
      alert("Nível máximo alcançado!");
      e.target.checked = false;
      return;
    }

    const xpGain = 10;
    const newExp = Math.min(user.exp + xpGain, 1000);
    const newLevel = Math.min(Math.floor(newExp / 100), 10);

    const updatedUserData = {
      ...user,
      tarefas: user.tarefas.map((t) => t.id_tarefa),
      exp: newExp,
      nivel: newLevel,
    };

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

      const refreshedUserResponse = await fetch(
        `http://localhost:3500/api/user/${user.id_usuario}`
      );
      const refreshedUser = await refreshedUserResponse.json();
      setUser(refreshedUser.user);

      // ADIÇÃO: Adiciona uma nova notificação ao array
      setXpNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          id: Date.now(), // ID único para cada notificação
          message: `+${xpGain} XP`,
          initialBottom: 80 + prevNotifications.length * NOTIFICATION_OFFSET, // Empilha baseado no número de notificações ativas
          finalBottom: 160 + prevNotifications.length * NOTIFICATION_OFFSET, // Posição final ao sumir
        },
      ]);
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      e.target.checked = false;
    }
  };

  // Função para remover uma notificação específica pelo ID
  const handleXpNotificationFadeOut = (idToRemove) => {
    setXpNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== idToRemove)
    );
  };

  const handleEdit = (id_tarefa) => {
    navigate(`/atividades/editar/${id_tarefa}`);
  };

  const handleRemove = async (id_tarefa) => {
    if (!window.confirm("Tem certeza que deseja remover esta atividade?"))
      return;
    try {
      const response = await fetch(
        `http://localhost:3500/api/tarefa/${id_tarefa}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Falha ao remover atividade.");

      const updatedTarefas = user.tarefas
        .filter((t) => t.id_tarefa !== id_tarefa)
        .map((t) => t.id_tarefa);

      const updatedUserData = {
        ...user,
        tarefas: updatedTarefas,
      };

      const userUpdateResponse = await fetch(
        `http://localhost:3500/api/user/${user.id_usuario}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUserData),
        }
      );
      if (!userUpdateResponse.ok)
        throw new Error("Falha ao atualizar usuário.");

      const refreshedUserResponse = await fetch(
        `http://localhost:3500/api/user/${user.id_usuario}`
      );
      const refreshedUser = await refreshedUserResponse.json();
      setUser(refreshedUser.user);
    } catch (error) {
      alert("Erro ao remover atividade.");
      console.error(error);
    }
  };

  const handleAdd = () => {
    navigate("/atividades/nova");
  };

  return (
    <div className="activity-list-container">
      {/* Renderiza MÚLTIPLOS avisos de XP */}
      {xpNotifications.map((notification, index) => (
        <XpNotification
          key={notification.id}
          message={notification.message}
          initialBottom={notification.initialBottom}
          finalBottom={notification.finalBottom}
          onFadeOut={() => handleXpNotificationFadeOut(notification.id)}
        />
      ))}

      <div className="activity-list-card">
        <h2 className="activity-list-title">Minhas Atividades</h2>

        {!user || user.tarefas.length === 0 ? (
          <div className="no-activities">
            <p>Você ainda não tem atividades cadastradas.</p>
            <p>Clique no botão abaixo para adicionar sua primeira atividade!</p>
          </div>
        ) : (
          <div className="activity-items">
            {user.tarefas.map((activity) => (
              <div key={activity.id_tarefa} className="activity-item">
                <input
                  type="checkbox"
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
                  <button
                    className="action-button edit-button"
                    onClick={() => handleEdit(activity.id_tarefa)}
                  >
                    Editar
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleRemove(activity.id_tarefa)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button onClick={handleAdd} className="add-activity-button">
          Adicionar Nova Atividade
        </button>
      </div>
    </div>
  );
}

export default ActivityList;

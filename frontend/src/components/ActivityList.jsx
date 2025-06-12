import React from 'react';
import { Link } from 'react-router-dom';
import { useActivities } from '../contexts/ActivitiesContext'; // Importa o hook do contexto
import './ActivityList.css'; // Estilos específicos para a tela de listagem de atividades

// Componente da tela de Listagem de Atividades
// Este componente exibe uma lista de atividades do usuário com opções para marcar como concluída, editar ou remover
function ActivityList() {
  // Obtém as atividades e funções do contexto global
  const { activities, toggleActivityComplete, removeActivity } = useActivities();

  // Função para lidar com a remoção de uma atividade
  const handleRemoveActivity = (id, title) => {
    if (window.confirm(`Tem certeza que deseja remover a atividade "${title}"?`)) {
      removeActivity(id);
    }
  };

  return (
    // Container principal da tela de listagem de atividades
    <div className="activity-list-container">
      {/* Card que agrupa a lista de atividades */}
      <div className="activity-list-card">
        <h2 className="activity-list-title">Minhas Atividades</h2>
        
        {/* Verifica se há atividades para exibir */}
        {activities.length === 0 ? (
          <div className="no-activities">
            <p>Você ainda não tem atividades cadastradas.</p>
            <p>Clique no botão abaixo para adicionar sua primeira atividade!</p>
          </div>
        ) : (
          // Container dos itens de atividade
          <div className="activity-items">
            {/* Mapeia e renderiza cada atividade */}
            {activities.map(activity => (
              <div key={activity.id} className="activity-item">
                {/* Checkbox para marcar a atividade como concluída */}
                <input 
                  type="checkbox" 
                  checked={activity.completed} 
                  onChange={() => toggleActivityComplete(activity.id)} 
                  className="activity-checkbox"
                />
                
                {/* Informações da atividade */}
                <div className="activity-info">
                  {/* Título da atividade com estilo condicional para atividades concluídas */}
                  <span className={`activity-title ${activity.completed ? 'completed' : ''}`}>
                    {activity.title}
                  </span>
                  {/* Descrição da atividade */}
                  {activity.description && (
                    <span className="activity-description">
                      {activity.description}
                    </span>
                  )}
                  {/* Informações adicionais */}
                  <div className="activity-details">
                    <span className="activity-difficulty">
                      {'★'.repeat(activity.difficulty)} Dificuldade
                    </span>
                    <span className="activity-frequency">
                      {activity.frequency}
                    </span>
                  </div>
                </div>
                
                {/* Ações disponíveis para cada atividade */}
                <div className="activity-actions">
                  {/* Link para editar a atividade */}
                  <Link to={`/atividades/editar/${activity.id}`} className="action-button edit-button">
                    Editar
                  </Link>
                  {/* Botão para remover a atividade */}
                  <button 
                    className="action-button delete-button"
                    onClick={() => handleRemoveActivity(activity.id, activity.title)}
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


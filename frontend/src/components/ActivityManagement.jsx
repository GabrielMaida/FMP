import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useActivities } from '../contexts/ActivitiesContext'; // Importa o hook do contexto
import './ActivityManagement.css'; // Estilos específicos para o gerenciamento de atividades

// Componente da tela de Gerenciamento de Atividades
// Este componente é usado tanto para criar novas atividades quanto para editar atividades existentes
function ActivityManagement() {
  const { id } = useParams(); // Pega o ID da atividade da URL (se for edição)
  const navigate = useNavigate(); // Hook para navegação programática
  const { addActivity, updateActivity, getActivityById } = useActivities(); // Funções do contexto

  // Estados para os campos do formulário de atividade
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [difficulty, setDifficulty] = useState(0);
  const [habit, setHabit] = useState('');
  const [frequency, setFrequency] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Determina se estamos no modo de edição
  const isEditing = Boolean(id);

  // Efeito para carregar os dados da atividade se estiver em modo de edição
  useEffect(() => {
    if (isEditing) {
      const activityToEdit = getActivityById(id);
      if (activityToEdit) {
        // Preenche os campos do formulário com os dados da atividade
        setActivityTitle(activityToEdit.title);
        setActivityDescription(activityToEdit.description || '');
        setDifficulty(activityToEdit.difficulty);
        setHabit(activityToEdit.habit || '');
        setFrequency(activityToEdit.frequency || '');
      } else {
        // Se a atividade não for encontrada, exibe um alerta e redireciona
        alert('Atividade não encontrada!');
        navigate('/atividades');
      }
    }
  }, [id, isEditing, getActivityById, navigate]);

  // Função para lidar com o clique nas estrelas de dificuldade
  const handleStarClick = (rating) => {
    setDifficulty(rating);
  };

  // Função para validar os campos do formulário
  const validateForm = () => {
    if (!activityTitle.trim()) {
      alert('Por favor, preencha o título da atividade.');
      return false;
    }
    if (difficulty === 0) {
      alert('Por favor, selecione a dificuldade da atividade.');
      return false;
    }
    return true;
  };

  // Função para lidar com o envio do formulário (criar ou salvar edição)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valida o formulário antes de prosseguir
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Cria um objeto com os dados da atividade
      const activityData = {
        title: activityTitle.trim(),
        description: activityDescription.trim(),
        difficulty: difficulty,
        habit: habit.trim(),
        frequency: frequency.trim(),
      };

      if (isEditing) {
        // Atualiza atividade existente
        updateActivity(parseInt(id), activityData);
        alert(`Atividade "${activityData.title}" atualizada com sucesso!`);
      } else {
        // Cria nova atividade
        const newActivity = addActivity(activityData);
        alert(`Atividade "${newActivity.title}" criada com sucesso!`);
      }

      // Redireciona de volta para a lista após salvar
      navigate('/atividades');
    } catch (error) {
      console.error('Erro ao salvar atividade:', error);
      alert('Ocorreu um erro ao salvar a atividade. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para limpar o formulário
  const handleClear = () => {
    setActivityTitle('');
    setActivityDescription('');
    setDifficulty(0);
    setHabit('');
    setFrequency('');
  };

  return (
    // Container principal da tela de gerenciamento de atividades
    <div className="activity-management-container">
      {/* Card que agrupa o formulário de gerenciamento */}
      <div className="activity-management-card">
        {/* Título dinâmico baseado no modo (criar ou editar) */}
        <h2 className="activity-management-title">
          {isEditing ? 'Editar Atividade' : 'Criar Nova Atividade'}
        </h2>
        
        {/* Formulário de gerenciamento de atividade */}
        <form onSubmit={handleSubmit} className="activity-management-form">
          {/* Campo de título da atividade */}
          <div className="form-group">
            <label htmlFor="title">TÍTULO DA ATIVIDADE: *</label>
            <input
              type="text"
              id="title"
              value={activityTitle}
              onChange={(e) => setActivityTitle(e.target.value)}
              required
              className="form-input"
              placeholder="Ex: Exercício matinal, Leitura diária..."
              maxLength={100}
            />
          </div>

          {/* Campo de descrição da atividade */}
          <div className="form-group">
            <label htmlFor="description">DESCRIÇÃO DA ATIVIDADE:</label>
            <textarea
              id="description"
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              className="form-textarea"
              rows="4"
              placeholder="Descreva os detalhes da atividade..."
              maxLength={500}
            />
          </div>

          {/* Seleção de dificuldade por estrelas */}
          <div className="form-group">
            <label>DIFICULDADE: *</label>
            <div className="star-rating">
              {/* Mapeia as 5 estrelas e aplica estilo ativo baseado na dificuldade selecionada */}
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${star <= difficulty ? 'active' : ''}`}
                  onClick={() => handleStarClick(star)}
                  title={`Dificuldade ${star}`}
                >
                  ★
                </button>
              ))}
            </div>
            <small className="difficulty-hint">
              {difficulty === 0 && 'Selecione a dificuldade'}
              {difficulty === 1 && 'Muito Fácil'}
              {difficulty === 2 && 'Fácil'}
              {difficulty === 3 && 'Médio'}
              {difficulty === 4 && 'Difícil'}
              {difficulty === 5 && 'Muito Difícil'}
            </small>
          </div>

          {/* Campos de hábito e frequência, dispostos lado a lado */}
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="habit">HÁBITO:</label>
              <input
                type="text"
                id="habit"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                className="form-input"
                placeholder="Ex: Diário, Semanal..."
                maxLength={50}
              />
            </div>
            <div className="form-group half">
              <label htmlFor="frequency">FREQUÊNCIA:</label>
              <input
                type="text"
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="form-input"
                placeholder="Ex: 3x por semana, Todos os dias..."
                maxLength={50}
              />
            </div>
          </div>

          {/* Seção de ações do formulário */}
          <div className="form-actions">
            {/* Botão principal (criar ou salvar) */}
            <button 
              type="submit" 
              className="action-button primary"
              disabled={isLoading}
            >
              {isLoading 
                ? (isEditing ? 'Salvando...' : 'Criando...') 
                : (isEditing ? 'Salvar Alterações' : 'Criar Atividade')
              }
            </button>
            
            {/* Botão de limpar (apenas no modo de criação) */}
            {!isEditing && (
              <button 
                type="button" 
                onClick={handleClear} 
                className="action-button secondary"
                disabled={isLoading}
              >
                Limpar Campos
              </button>
            )}
            
            {/* Botão de cancelar */}
            <button 
              type="button" 
              onClick={() => navigate('/atividades')} 
              className="action-button secondary"
              disabled={isLoading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivityManagement;


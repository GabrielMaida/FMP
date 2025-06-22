import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ActivityManagement.css";

// Componente da tela de Gerenciamento de Atividades
// Este componente é usado tanto para criar novas atividades quanto para editar atividades existentes
function ActivityManagement() {
  const { id } = useParams(); // Pega o ID da atividade da URL (se for edição)
  const navigate = useNavigate(); // Hook para navegação programática

  // Estados para os campos do formulário de atividade
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [habit, setHabit] = useState(""); // Estado para o hábito
  const [frequency, setFrequency] = useState(""); // Estado para a frequência
  const [isLoading, setIsLoading] = useState(false);

  // Determina se estamos no modo de edição
  const isEditing = Boolean(id);

  // Efeito para carregar os dados da atividade se estiver em modo de edição
  useEffect(() => {
    if (isEditing) {
      fetch(`http://localhost:3500/api/tarefa/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setActivityTitle(data.nome || "");
          setActivityDescription(data.descricao || "");
          setDifficulty(data.dificuldade || 0);
          setHabit(
            data.habito === true
              ? "Positivo"
              : data.habito === false
              ? "Negativo"
              : ""
          );
          setFrequency(
            data.frequencia === "diario"
              ? "Diário"
              : data.frequencia === "semanal"
              ? "Semanal"
              : data.frequencia === "mensal"
              ? "Mensal"
              : ""
          );
        })
        .catch(() => {
          alert("Atividade não encontrada!");
          navigate("/atividades");
        });
    }
  }, [id, isEditing, navigate]);

  // Validação do formulário
  const validateForm = () => {
    if (!activityTitle.trim()) {
      alert("Por favor, preencha o título da atividade.");
      return false;
    }
    if (difficulty === 0) {
      alert("Por favor, selecione a dificuldade da atividade.");
      return false;
    }
    if (!habit) {
      alert("Por favor, selecione o tipo de hábito.");
      return false;
    }
    if (!frequency) {
      alert("Por favor, selecione a frequência.");
      return false;
    }
    return true;
  };

  // Envio do formulário (criação ou edição)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    // Monta dados para API (sem id_tarefa ainda)
    const tarefaData = {
      nome: activityTitle.trim(),
      descricao: activityDescription.trim(),
      dificuldade: difficulty,
      habito: habit === "Positivo",
      frequencia:
        frequency === "Diário"
          ? "diario"
          : frequency === "Semanal"
          ? "semanal"
          : frequency === "Mensal"
          ? "mensal"
          : "",
    };

    try {
      let id_tarefa;
      if (isEditing) {
        // PUT tarefa
        tarefaData.id_tarefa = Number(id);
        const tarefaRes = await fetch(
          `http://localhost:3500/api/tarefa/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarefaData),
          }
        );
        if (!tarefaRes.ok) throw new Error("Erro ao atualizar tarefa.");
        id_tarefa = Number(id);
      } else {
        // POST tarefa
        // 1. Buscar todas as tarefas existentes para encontrar o próximo ID disponível
        const tarefasRes = await fetch("http://localhost:3500/api/tarefa");
        const tarefas = await tarefasRes.json();
        const usedIds = tarefas.map((t) => t.id_tarefa);
        // Encontrar o menor número inteiro não utilizado
        let nextId = 0;
        while (usedIds.includes(nextId)) nextId++;
        id_tarefa = nextId;

        // 3. Criar a tarefa com o menor id livre
        const tarefaRes = await fetch("http://localhost:3500/api/tarefa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...tarefaData, id_tarefa }),
        });
        if (!tarefaRes.ok) throw new Error("Erro ao criar tarefa.");

        // 4. Buscar usuário 0 e fazer append do novo id_tarefa
        const userRes = await fetch("http://localhost:3500/api/user/0");
        const userData = await userRes.json();
        const user = userData.user;

        // CORREÇÃO AQUI: Garante que `user.tarefas` contenha APENAS os IDs.
        // O `server.js` retorna objetos completos de tarefa na busca de usuário.
        // Para enviar de volta para o PUT, precisamos apenas dos IDs.
        const tarefasIdsExistente = user.tarefas.map((t) => t.id_tarefa);
        const updatedTarefas = [...tarefasIdsExistente, id_tarefa];

        // 5. Atualizar usuário 0 com o novo array de tarefas
        await fetch("http://localhost:3500/api/user/0", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...user, tarefas: updatedTarefas }),
        });
      }

      alert(
        isEditing
          ? "Atividade atualizada com sucesso!"
          : "Atividade criada e vinculada ao usuário!"
      );
      navigate("/atividades", { replace: true });
      window.location.reload(); // força recarregar a página
    } catch (error) {
      alert("Ocorreu um erro ao salvar a atividade. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para limpar o formulário
  const handleClear = () => {
    setActivityTitle("");
    setActivityDescription("");
    setDifficulty(0);
    setHabit("");
    setFrequency("");
  };

  // Container principal da tela de gerenciamento de atividades
  return (
    <div className="activity-management-container">
      {/* Card que agrupa o formulário de gerenciamento */}
      <div className="activity-management-card">
        {/* Título dinâmico baseado no modo (criar ou editar) */}
        <h2 className="activity-management-title">
          {isEditing ? "Editar Atividade" : "Criar Nova Atividade"}
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
                  className={`star ${star <= difficulty ? "active" : ""}`}
                  onClick={() => setDifficulty(star)}
                  title={`Dificuldade ${star}`}
                >
                  ★
                </button>
              ))}
            </div>
            <small className="difficulty-hint">
              {difficulty === 0 && "Selecione a dificuldade"}
              {difficulty === 1 && "Muito Fácil"}
              {difficulty === 2 && "Fácil"}
              {difficulty === 3 && "Médio"}
              {difficulty === 4 && "Difícil"}
              {difficulty === 5 && "Muito Difícil"}
            </small>
          </div>

          {/* Campos de hábito e frequência, dispostos lado a lado */}
          <div className="form-row">
            {/* Campo de Hábito (combo box) */}
            <div className="form-group half">
              <label htmlFor="habit">HÁBITO:</label>
              <select
                id="habit"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                className="form-input"
                required // Torna o campo obrigatório
              >
                <option value="">Selecione...</option>
                <option value="Positivo">Positivo</option>
                <option value="Negativo">Negativo</option>
              </select>
            </div>
            {/* Campo de Frequência (combo box) */}
            <div className="form-group half">
              <label htmlFor="frequency">FREQUÊNCIA:</label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="form-input"
                required // Torna o campo obrigatório
              >
                <option value="">Selecione...</option>
                <option value="Diário">Diário</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensal">Mensal</option>
              </select>
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
                ? isEditing
                  ? "Salvando..."
                  : "Criando..."
                : isEditing
                ? "Salvar Alterações"
                : "Criar Atividade"}
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
              onClick={() => navigate("/atividades")}
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

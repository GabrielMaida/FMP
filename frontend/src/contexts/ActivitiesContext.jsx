import React, { createContext, useContext, useState } from 'react';

// Contexto para gerenciar o estado global das atividades
const ActivitiesContext = createContext();

// Hook personalizado para usar o contexto de atividades
export const useActivities = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error('useActivities deve ser usado dentro de um ActivitiesProvider');
  }
  return context;
};

// Provider que fornece o estado das atividades para toda a aplicação
export const ActivitiesProvider = ({ children }) => {
  // Estado inicial com algumas atividades de exemplo
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Tomar Água',
      description: 'Beber 2 litros de água por dia',
      difficulty: 3,
      habit: 'Positivo',
      frequency: 'Todos os dias',
      completed: false
    },
    {
      id: 2,
      title: 'Caminhada 30min',
      description: 'Caminhar por 30 minutos',
      difficulty: 2,
      habit: 'Positivo',
      frequency: 'Semanal',
      completed: true
    },
    {
      id: 3,
      title: 'Meditar 10min',
      description: 'Meditar por 10 minutos',
      difficulty: 1,
      habit: 'Positivo',
      frequency: 'Mensal',
      completed: false
    },
  ]);

  // Função para adicionar uma nova atividade
  const addActivity = (activityData) => {
    const newActivity = {
      id: Date.now(), // Gera um ID único baseado no timestamp
      ...activityData,
      completed: false // Nova atividade sempre começa como não concluída
    };
    setActivities(prev => [...prev, newActivity]);
    return newActivity;
  };

  // Função para atualizar uma atividade existente
  const updateActivity = (id, updatedData) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id
          ? { ...activity, ...updatedData }
          : activity
      )
    );
  };

  // Função para remover uma atividade
  const removeActivity = (id) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  // Função para marcar/desmarcar uma atividade como concluída
  const toggleActivityComplete = (id) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  // Função para buscar uma atividade por ID
  const getActivityById = (id) => {
    return activities.find(activity => activity.id === parseInt(id));
  };

  // Valor do contexto que será fornecido aos componentes filhos
  const value = {
    activities,
    addActivity,
    updateActivity,
    removeActivity,
    toggleActivityComplete,
    getActivityById
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
};


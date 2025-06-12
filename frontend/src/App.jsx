import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ActivityList from './components/ActivityList'; // Importa o novo componente de listagem
import ActivityManagement from './components/ActivityManagement'; // Importa o componente de gerenciamento
import { ActivitiesProvider } from './contexts/ActivitiesContext'; // Importa o provider de atividades

// Componente de Layout principal que inclui o cabeçalho e a navegação inferior
// Este componente será usado para as rotas que precisam do layout padrão da aplicação
function MainLayout() {
  return (
    <div className="app">
      {/* Cabeçalho da aplicação com navegação e perfil do usuário */}
      <header className="header">
        <div className="nav-tabs">
          {/* Links de navegação para as diferentes seções da aplicação */}
          <Link to="/atividades" className="nav-tab">Atividades</Link>
          <Link to="/ajuda" className="nav-tab">Ajuda</Link>
          <Link to="/sobre" className="nav-tab">Sobre Nós</Link>
        </div>
        <div className="user-profile">
          {/* Avatar e nome de usuário, com link para a página de perfil */}
          <img src="/user-avatar.png" alt="James Camargo" className="avatar" />
          <Link to="/perfil" className="username">James Camargo</Link>
        </div>
      </header>

      {/* Renderiza o conteúdo da rota filha usando Outlet */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

// Componente principal que configura o roteamento da aplicação
function App() {
  return (
    // Envolve toda a aplicação com o provider de atividades para compartilhar o estado
    <ActivitiesProvider>
      <Router>
        <Routes>
          {/* Rota inicial para a tela de Login */}
          <Route path="/" element={<Login />} />
          {/* Rota para a tela de Cadastro */}
          <Route path="/cadastro" element={<Signup />} />

          {/* Rotas que usam o layout principal (cabeçalho e navegação inferior) */}
          <Route path="/" element={<MainLayout />}>
            {/* Rota para a tela de Listagem de Atividades */}
            <Route path="atividades" element={<ActivityList />} />
            {/* Rota para a tela de Gerenciamento de Atividades (criação) */}
            <Route path="atividades/nova" element={<ActivityManagement />} />
            {/* Rota para a tela de Gerenciamento de Atividades (edição) */}
            <Route path="atividades/editar/:id" element={<ActivityManagement />} />
            {/* Rota para a tela de Perfil */}
            <Route path="perfil" element={<Profile />} />
            {/* Rotas para as páginas de Ajuda e Sobre Nós (podem ser criadas posteriormente) */}
            <Route path="ajuda" element={<div>Página de Ajuda em construção</div>} />
            <Route path="sobre" element={<div>Página Sobre Nós em construção</div>} />
          </Route>
        </Routes>
      </Router>
    </ActivitiesProvider>
  );
}

export default App;


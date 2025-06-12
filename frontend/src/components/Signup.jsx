import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css'; // Estilos específicos para as telas de autenticação

// Componente da tela de Cadastro (Signup)
function Signup() {
  // Estados para armazenar os valores dos campos do formulário de cadastro
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Função para lidar com o envio do formulário de cadastro
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página
    // Verifica se as senhas digitadas são iguais
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    // Lógica de cadastro pode ser adicionada aqui (ex: chamada a uma API)
    console.log('Cadastro:', { name, email, password });
    alert('Funcionalidade de Cadastro em desenvolvimento. Nome: ' + name + ', Email: ' + email);
  };

  return (
    // Container principal da tela de autenticação
    <div className="auth-container">
      {/* Card que agrupa o formulário de cadastro */}
      <div className="auth-card">
        {/* Título e subtítulo da tela de cadastro */}
        <h2 className="auth-title">BEM-VINDO AO FMP</h2>
        <p className="auth-subtitle">Crie sua conta para começar</p>

        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Grupo de campo para o nome completo */}
          <div className="form-group">
            <label htmlFor="name">NOME COMPLETO</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          {/* Grupo de campo para o email */}
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          {/* Grupo de campo para a senha */}
          <div className="form-group">
            <label htmlFor="password">SENHA</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          {/* Grupo de campo para confirmar a senha */}
          <div className="form-group">
            <label htmlFor="confirmPassword">CONFIRMAR SENHA</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          {/* Botão de cadastro */}
          <button type="submit" className="auth-button primary">CADASTRAR</button>
        </form>

        {/* Link para a tela de login, caso o usuário já tenha uma conta */}
        <div className="auth-links">
          <Link to="/" className="auth-link">Já tem uma conta? Faça login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;



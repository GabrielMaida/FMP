import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Auth.css'; // Estilos específicos para as telas de autenticação

// Componente da tela de Login
function Login() {
  // Estados para armazenar os valores dos campos de email e senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegação programática

  // Função para lidar com o envio do formulário de login
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página
    // Lógica de autenticação pode ser adicionada aqui (ex: chamada a uma API)
    console.log('Login:', { email, password });
    alert('Funcionalidade de Login em desenvolvimento. Email: ' + email + ', Senha: ' + password);
    
    // Após o login (simulado), redireciona para a tela de atividades
    navigate('/atividades'); 
  };

  return (
    // Container principal da tela de autenticação
    <div className="auth-container">
      {/* Card que agrupa o formulário de login */}
      <div className="auth-card">
        {/* Título e subtítulo da tela de login */}
        <h2 className="auth-title">BEM-VINDO AO FMP</h2>
        <p className="auth-subtitle">Faça login para continuar</p>
        
        {/* Formulário de login */}
        <form onSubmit={handleSubmit} className="auth-form">
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
          {/* Botão de login */}
          <button type="submit" className="auth-button primary">LOGIN</button>
        </form>
        
        {/* Links para cadastro e recuperação de senha */}
        <div className="auth-links">
          <Link to="/cadastro" className="auth-link">Não tem uma conta? Cadastre-se</Link>
          {/* O link para esquecer a senha pode ser uma rota futura ou um modal */}
          <Link to="#" className="auth-link">Esqueceu a senha?</Link>
        </div>
        
        {/* Opção de login com o Google */}
        <div className="social-login">
          <button className="auth-button google">
            <img src="/google-icon.png" alt="Google Icon" className="google-icon" />
            Login com o Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;



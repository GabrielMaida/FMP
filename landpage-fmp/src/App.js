import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="bg-dark text-white py-5">
        <div className="container">
          <h1 className="display-4">Bem-vindddo à Empresa XYZ</h1>
          <p className="lead">Soluções inovadoras para o seu negócio.</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">Sobre Nós</h2>
          <p className="mb-4">
            A Empresa XYZ é líder no mercado de tecnologia, fornecendo serviços e produtos de alta qualidade para impulsionar o crescimento dos nossos clientes. Nossa missão é entregar inovação com excelência e comprometimento.
          </p>
          <div className="row">
            <div className="col-md-4">
              <h3>Missão</h3>
              <p>Oferecer soluções tecnológicas que agreguem valor aos nossos clientes, sempre com foco na inovação.</p>
            </div>
            <div className="col-md-4">
              <h3>Visão</h3>
              <p>Ser referência global em tecnologia, ajudando empresas a crescerem com soluções modernas e eficientes.</p>
            </div>
            <div className="col-md-4">
              <h3>Valores</h3>
              <p>Ética, inovação, qualidade, comprometimento e foco no cliente.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="mb-4">Serviços</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Consultoria de TI</h5>
                  <p className="card-text">
                    Ajudamos sua empresa a implementar as melhores práticas em tecnologia da informação.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Desenvolvimento de Software</h5>
                  <p className="card-text">
                    Criamos soluções sob medida para atender às necessidades exclusivas de cada cliente.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Suporte Técnico</h5>
                  <p className="card-text">
                    Oferecemos suporte técnico especializado para garantir o funcionamento perfeito das suas operações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p>&copy; 2024 Empresa XYZ. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

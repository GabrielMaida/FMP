import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="bg-dark text-white py-3">
                <h1 className="display-4">FisicaMente Produtivo</h1>
                <p className=''>A Solução da sua procrastinação!</p>
            </header>

            <section className='py-5'>
                <div className="container">
                    <h2 className='mb-4'>Problema</h2>
                    <p className='pb-5'>
                        A procrastinação é um dos maiores desafios enfrentados por milhões de pessoas em todo o mundo. A falta de organização e motivação pessoal afeta a produtividade e bem-estar, enquanto a dificuldade em manter uma rotina saudável de exercícios físicos é comum. A maioria das pessoas deseja ter uma vida mais organizada e ativa, mas muitas vezes se sentem presas em ciclos de procrastinação ou desmotivação.
                    </p>
                    <div className="row">
                        <div className="col-md-4">
                            <h3 className='mb-4'>Nicho</h3>
                            <p>Todos que desejam melhor sua saúde física e intelecto, de forma intuitiva, divertida e recompensadora.</p>
                        </div>
                        <div className="col-md-4">
                            <h3 className='mb-4'>Proposta de Valor</h3>
                            <p>O aplicativo proporcionará ferramentas para que os usuários possam armazenar seus exercícios físicos, ao mesmo tempo que disponibiliza exercícios de raciocínio lógico, tudo isso, utilizando gamificação para uma experiência mais divertida.</p>
                        </div>
                        <div className="col-md-4">
                            <h3 className='mb-4'>Equipe</h3>
                            <p>Gabriel Antônio Maida, Luiz Felipe Carvalho Gomes, Pedro Nicoletti Obalski, Thiago Souto Xavier.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-light py-5">
                <div className="container">
                    <h2 className='mb-4'>Serviços</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <h5 className='mb-4'>Gerenciamento de Treinos</h5>
                            <p>
                                Disponibilizamos opções de treinos físicos para você escolher de acordo com seu gosto.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h5 className='mb-4'>Exercícios para Enriquecimento da Mente</h5>
                            <p>
                                Oferecemos uma variedade de desafios cognitivos, incluindo exercícios de lógica e raciocínio, projetados para estimular seu crescimento intelectual e expandir seus conhecimentos de forma divertida e envolvente.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h5 className='mb-4'>Gamificação</h5>
                            <p>
                                Transformamos sua jornada de aprendizado e fitness em uma experiência divertida e motivadora, com sistemas de recompensas, desafios e conquistas que tornam seu progresso mais envolvente e gratificante.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-dark pt-3">
                <p>&copy; 2024 FisicaMente Produtivo. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default App;

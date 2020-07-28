import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Aplicação Mobile',
      url: 'https://github.com/Nouani/aplicacao',
      techs: [
        'React Native',
        'Kotlin'
      ]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories);
  }

  return (
    <div className="container">
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <h1>{repository.title}</h1>
            <div className="content">
              <p>Tecnologias</p>
              <div className="techs">
                {repository.techs.map(tech => (
                  <p key={tech}>{tech}</p>
                ))}
              </div>
              <a href={repository.url}>Link do repositório</a>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

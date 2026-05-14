import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quests, setQuests] = useState([]);
  const [newQuest, setNewQuest] = useState("");
  const [character, setCharacter] = useState({
    nome: "",
    classe: "",
    nivel: 1,
    forca: 10,
    destreza: 10
  });

  // Salvar e carregar dados automaticamente
  useEffect(() => {
    const savedQuests = JSON.parse(localStorage.getItem('quests'));
    if (savedQuests) setQuests(savedQuests);
  }, []);

  useEffect(() => {
    localStorage.setItem('quests', JSON.stringify(quests));
  }, [quests]);

  const addQuest = () => {
    if (newQuest.trim() === "") return;
    setQuests([...quests, { id: Date.now(), text: newQuest, completed: false }]);
    setNewQuest("");
  };

  const toggleQuest = (id) => {
    setQuests(quests.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
  };

  return (
    <div className="quest-container">
      <header>
        <h1>📜 Quest To Do</h1>
      </header>

      <main className="dashboard">
        {/* Seção de Personagem */}
        <section className="char-section card">
          <h2>Ficha do Herói</h2>
          <input 
            placeholder="Nome do Personagem" 
            value={character.nome} 
            onChange={(e) => setCharacter({...character, nome: e.target.value})}
          />
          <div className="stats-grid">
            <label>Nível: <input type="number" value={character.nivel} /></label>
            <label>FOR: <input type="number" value={character.forca} /></label>
            <label>DES: <input type="number" value={character.destreza} /></label>
          </div>
        </section>

        {/* Seção de Quests */}
        <section className="quest-section card">
          <h2>Quests Ativas</h2>
          <div className="input-group">
            <input 
              value={newQuest} 
              onChange={(e) => setNewQuest(e.target.value)}
              placeholder="Nova missão..." 
            />
            <button onClick={addQuest}>Aceitar Quest</button>
          </div>
          
          <ul className="quest-list">
            {quests.map(quest => (
              <li key={quest.id} className={quest.completed ? 'completed' : ''}>
                <span onClick={() => toggleQuest(quest.id)}>
                  {quest.completed ? '✅' : '🛡️'} {quest.text}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import './App.css'; 

const QuestToDo = () => {
  // 1. Inicialização preguiçosa (Lazy Init) para carregar do LocalStorage
  const [quests, setQuests] = useState(() => {
    const saved = localStorage.getItem('rpg_quests');
    return saved ? JSON.parse(saved) : [];
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('rpg_notes');
    return saved || "";
  });

  const [input, setInput] = useState("");
  const [lastRoll, setLastRoll] = useState(null);

  // 2. useEffect único para salvar sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('rpg_quests', JSON.stringify(quests));
    localStorage.setItem('rpg_notes', notes);
  }, [quests, notes]);

  // Funções de lógica
  const addQuest = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newQuest = { 
      id: Date.now(), 
      text: input, 
      completed: false, 
      timestamp: new Date().toLocaleDateString() 
    };
    setQuests([...quests, newQuest]);
    setInput("");
  };

  const toggleQuest = (id) => {
    setQuests(quests.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
  };

  const deleteQuest = (id) => {
    setQuests(quests.filter(q => q.id !== id));
  };

  const rollDice = (sides) => {
    const result = Math.floor(Math.random() * sides) + 1;
    setLastRoll({ sides, result });
  };

  return (
    <div className="quest-container">
      <header className="quest-header">
        <h2>⚔️ Quest To Do</h2>
        <div className="dice-area">
          <button onClick={() => rollDice(20)} className="dice-btn">Rolar D20</button>
          <button onClick={() => rollDice(6)} className="dice-btn">D6</button>
          {lastRoll && (
            <span className="roll-result">
              Resultado: <strong>{lastRoll.result}</strong> (d{lastRoll.sides})
            </span>
          )}
        </div>
      </header>

      <div className="main-layout">
        <section className="left-column">
          <form onSubmit={addQuest} className="quest-form">
            <input 
              className="quest-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nova missão encontrada..."
            />
            <button type="submit" className="add-btn">Adicionar</button>
          </form>

          <div className="list-container">
            {quests.length === 0 ? (
              <p className="empty-msg">Nenhuma quest ativa no momento.</p>
            ) : (
              quests.map(quest => (
                <div key={quest.id} className={`quest-item ${quest.completed ? 'completed' : ''}`}>
                  <div onClick={() => toggleQuest(quest.id)} className="quest-content">
                    <span>{quest.completed ? "✅" : "🔘"}</span>
                    <div style={{ marginLeft: '10px' }}>
                      <div>{quest.text}</div>
                      <small style={{ fontSize: '0.7em', color: '#888' }}>Iniciada: {quest.timestamp}</small>
                    </div>
                  </div>
                  <button onClick={() => deleteQuest(quest.id)} className="del-btn">🗑️</button>
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="notes-section">
          <h3>📜 Diário de Campo</h3>
          <textarea 
            className="notes-textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anote aqui resultados dos dados ou detalhes..."
          />
        </aside>
      </div>
    </div>
  );
};

export default QuestToDo;
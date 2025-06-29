import React from 'react';

const StatsPanel = ({ knowledge, xp, prestigeLevel, prestigeMultiplier, currentEra, reputation, repChangeText }) => {
  return (
    <div className="stats-panel">
      <p>📘 Знания: <strong>{Math.floor(knowledge)}</strong></p>
      <p>📗 Опыт: <strong>{Math.floor(xp)}</strong></p>
      <p>🔁 Престиж: <strong>{prestigeLevel}</strong> (x{prestigeMultiplier})</p>
      <p>🏛️ Эпоха: <strong>{currentEra}</strong></p>
      <p>🌟 Репутация: <strong style={{ position: 'relative' }}>
        {reputation}
        {repChangeText && (
          <span className={repChangeText.className} style={{ position: 'absolute', left: '110%', top: '-4px' }}>
            {repChangeText.text}
          </span>
        )}
      </strong></p>
    </div>
  );
};

export default StatsPanel;

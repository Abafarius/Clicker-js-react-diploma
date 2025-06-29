import React from 'react';

const MainButtonsPanel = ({ onClickLearn, onToggleAudio, isMuted, onOpenLog }) => {
  return (
    <div className="main-buttons-container">
      <button className="btn btn-learn" onClick={onClickLearn}>Учиться 🧠</button>
      <button className="btn btn-history" onClick={onOpenLog}>📜 История событий</button>
      <button className="btn btn-music" onClick={onToggleAudio}>
        {isMuted ? 'Включить музыку' : 'Выключить музыку'}
      </button>
    </div>
  );
};

export default MainButtonsPanel;
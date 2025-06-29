import React from 'react';

const MainButtonsPanel = ({ onClickLearn, onToggleAudio, isMuted, onOpenLog }) => {
  return (
    <div className="main-buttons">
      <button className="click-button" onClick={onClickLearn}>Учиться 🧠</button>
      <button className="audio-toggle-button" onClick={onToggleAudio}>
        {isMuted ? 'Включить музыку' : 'Выключить музыку'}
      </button>
      <button className="event-log-button" onClick={onOpenLog}>
        📜 История событий
      </button>
    </div>
  );
};

export default MainButtonsPanel;

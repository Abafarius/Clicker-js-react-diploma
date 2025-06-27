function MusicToggleButton({ isMuted, onToggle }) {
  return (
    <button className="audio-toggle-button" onClick={onToggle}>
      {isMuted ? '🔇 Включить музыку' : '🔊 Выключить музыку'}
    </button>
  );
}

export default MusicToggleButton;
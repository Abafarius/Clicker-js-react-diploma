function PrestigeButton({ onPrestige, multiplier }) {
  return (
    <button className="prestige-button btn btn-prestige" onClick={onPrestige}>
      ✨ Переродиться и получить <span className="multiplier">x{multiplier.toFixed(1)}</span>
    </button>
  );
}

export default PrestigeButton;

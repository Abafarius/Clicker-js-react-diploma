function PrestigeButton({ onPrestige, multiplier }) {
  return (
    <button className="prestige-button" onClick={onPrestige}>
      ✨ Переродиться и получить x{multiplier.toFixed(1)}
    </button>
  );
}

export default PrestigeButton;
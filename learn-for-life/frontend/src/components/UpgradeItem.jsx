// components/UpgradeItem.jsx
function UpgradeItem({ upgrade, onBuy, disabled }) {
  return (
    <div className="upgrade-card">
      <div className="upgrade-info">
        <div className="upgrade-title">{upgrade.name}</div>
        <div className="upgrade-cost">Купить за {upgrade.cost} XP</div>
      </div>
      <button
        className="upgrade-button"
        onClick={() => onBuy(upgrade)}
        disabled={disabled}
      >
        Купить
      </button>
    </div>
  );
}

export default UpgradeItem;

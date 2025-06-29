// components/UpgradeItem.jsx
function UpgradeItem({ upgrade, onBuy, disabled }) {
  return (
    <div className="upgrade-card">
      <div className="upgrade-info">
        <div className="upgrade-title">{upgrade.name}</div>
        <div className="upgrade-cost">Купить за {upgrade.cost} XP</div>
      </div>
      <button
        className="btn btn-upgrade"
        onClick={() => onBuy(upgrade)}
        disabled={disabled}
      >
        Купить
      </button>
    </div>
  );
}

export default UpgradeItem;
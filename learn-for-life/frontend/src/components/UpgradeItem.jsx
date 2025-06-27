function UpgradeItem({ upgrade, onBuy, disabled }) {
  return (
    <div className="upgrade-item">
      <span>{upgrade.name}</span>
      <button onClick={() => onBuy(upgrade)} disabled={disabled}>
        Купить за {upgrade.cost} XP
      </button>
    </div>
  );
}

export default UpgradeItem;

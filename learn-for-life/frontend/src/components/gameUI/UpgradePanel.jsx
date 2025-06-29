import React from 'react';
import UpgradeItem from '../UpgradeItem';

const UpgradePanel = ({ upgrades, onBuyUpgrade, xp }) => {
  return (
    <div className="upgrade-panel">
      <h2>Улучшения:</h2>
      <div className="upgrades">
        {upgrades.map(upg => (
          <UpgradeItem
            key={upg.id}
            upgrade={upg}
            onBuy={onBuyUpgrade}
            disabled={xp < upg.cost}
          />
        ))}
      </div>
    </div>
  );
};

export default UpgradePanel;

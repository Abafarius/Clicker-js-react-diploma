import React from 'react';
import Header from './Header';
import StatsPanel from './StatsPanel';
import MainButtonsPanel from './MainButtonsPanel';
import UpgradePanel from './UpgradePanel';


const GameLayout = ({
  knowledge,
  xp,
  prestigeLevel,
  prestigeMultiplier,
  currentEra,
  reputation,
  repChangeText,
  onClickLearn,
  onToggleAudio,
  isMuted,
  onOpenLog,
  upgrades,
  onBuyUpgrade
}) => {
  return (
    <div className="game-layout">
      <Header />
      <div className="game-panels">
        <div className="left-panel">
          <StatsPanel
            knowledge={knowledge}
            xp={xp}
            prestigeLevel={prestigeLevel}
            prestigeMultiplier={prestigeMultiplier}
            currentEra={currentEra}
            reputation={reputation}
            repChangeText={repChangeText}
          />
          <MainButtonsPanel
            onClickLearn={onClickLearn}
            onToggleAudio={onToggleAudio}
            isMuted={isMuted}
            onOpenLog={onOpenLog}
          />
        </div>
        <UpgradePanel
          upgrades={upgrades}
          onBuyUpgrade={onBuyUpgrade}
          xp={xp}
        />
      </div>
    </div>
  );
};

export default GameLayout;

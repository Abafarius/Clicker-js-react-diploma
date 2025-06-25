import { useState, useRef, useEffect } from 'react';
import './index.css';
import upgradesData from './data/upgrades';
import eras from './data/eras';
import UpgradeItem from './components/UpgradeItem';
import MusicToggleButton from './components/MusicToggleButton';
import PrestigeButton from './components/PrestigeButton';
import FloatingText from './components/FloatingText';
import EventPopup from './components/EventPopup';
import { generateRandomEvent } from './utils/eventGenerator';
import { initCustomParticles } from './utils/customParticles';

function App() {
  const [reputation, setReputation] = useState(0);
  const [repChangeText, setRepChangeText] = useState(null);

  const [knowledge, setKnowledge] = useState(0);
  const [xp, setXp] = useState(0);
  const [autoKnowledge, setAutoKnowledge] = useState(0);
  const [upgrades, setUpgrades] = useState(upgradesData);
  const [prestigeLevel, setPrestigeLevel] = useState(0);
  const [prestigeMultiplier, setPrestigeMultiplier] = useState(1);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);

  const currentEra = eras[prestigeLevel] || '∞ Вечный Ученик';

  const triggerRepChange = (amount) => {
    setRepChangeText({
      text: `${amount > 0 ? '+' : ''}${amount}`,
      className: amount > 0 ? 'rep-change rep-up' : 'rep-change rep-down',
    });
    setTimeout(() => setRepChangeText(null), 1000);
  };

  const handleClick = (e) => {
    if (!musicStarted) {
      audioRef.current.play();
      setMusicStarted(true);
    }
    setKnowledge(prev => prev + 1 * prestigeMultiplier);
    setXp(prev => prev + 1 * prestigeMultiplier);

    const id = Date.now();
    const x = e.clientX - 20;
    const y = e.clientY - 20;
    setFloatingTexts(prev => [...prev, { id, text: '+1', x, y }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(f => f.id !== id));
    }, 1000);
  };

  const handleBuyUpgrade = (upgrade) => {
    if (xp >= upgrade.cost) {
      setXp(prev => prev - upgrade.cost);
      setAutoKnowledge(prev => prev + upgrade.knowledgePerSecond * prestigeMultiplier);
      setUpgrades(prev =>
        prev.map(u =>
          u.id === upgrade.id ? { ...u, cost: Math.floor(u.cost * 1.5) } : u
        )
      );
    }
  };

  const handleToggleAudio = () => {
    if (!musicStarted) return;
    isMuted ? audioRef.current.play() : audioRef.current.pause();
    setIsMuted(!isMuted);
  };

  const handlePrestige = () => {
    if (knowledge >= 10000) {
      setPrestigeLevel(prev => prev + 1);
      setPrestigeMultiplier(prev => +(prev + 0.1).toFixed(1));
      setKnowledge(0);
      setXp(0);
      setAutoKnowledge(0);
      setUpgrades(upgradesData);
    }
  };

  useEffect(() => {
    initCustomParticles();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const roll = Math.random();
      if (roll < 0.9) {
        const newEvent = generateRandomEvent(reputation);
        setCurrentEvent(newEvent);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [reputation]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKnowledge(prev => prev + autoKnowledge);
      setXp(prev => prev + autoKnowledge);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoKnowledge]);

  return (
    <div className="app">
      <div id="custom-particles" />
      <div className="floating-text-container">
        {floatingTexts.map(ft => (
          <FloatingText key={ft.id} {...ft} />
        ))}
      </div>

      <h1>📚 Век живи — век учись</h1>
      <p>Знания: <strong>{Math.floor(knowledge)}</strong></p>
      <p>Опыт: <strong>{Math.floor(xp)}</strong></p>
      <p>🔁 Престиж: <strong>{prestigeLevel}</strong> (x{prestigeMultiplier})</p>
      <p>🏛️ Эпоха: <strong>{currentEra}</strong></p>
      <div style={{ position: 'relative', display: 'inline-block' }}>
  <p>🌟 Репутация: <strong>{reputation}</strong></p>
  {repChangeText && (
    <div className={repChangeText.className} style={{ position: 'absolute', top: '-20px', right: '-30px' }}>
      {repChangeText.text}
    </div>
  )}
</div>


      <button className="click-button" onClick={handleClick}>Учиться 🧠</button>
      <MusicToggleButton isMuted={isMuted} onToggle={handleToggleAudio} />
      {knowledge >= 10000 && (
        <PrestigeButton onPrestige={handlePrestige} multiplier={prestigeMultiplier + 0.1} />
      )}

      <h2>Улучшения:</h2>
      <div className="upgrades">
        {upgrades.map(upg => (
          <UpgradeItem
            key={upg.id}
            upgrade={upg}
            onBuy={handleBuyUpgrade}
            disabled={xp < upg.cost}
          />
        ))}
      </div>

      <audio ref={audioRef} loop>
        <source src="/lofi.mp3" type="audio/mpeg" />
        Твой браузер не поддерживает аудио.
      </audio>

      {currentEvent && (
        <>
          <div className="event-overlay" />
          <EventPopup
            event={currentEvent}
            onAccept={() => {
              const { xp: aXp, knowledge: aK, reputation: aRep = 0 } = currentEvent.choice.accept;
              setXp(prev => prev + aXp);
              setKnowledge(prev => prev + aK);
              setReputation(prev => {
                triggerRepChange(aRep);
                return prev + aRep;
              });
              setCurrentEvent(null);
            }}
            onDecline={() => {
              const { xp: dXp, knowledge: dK, reputation: dRep = 0 } = currentEvent.choice.decline;
              setXp(prev => prev + dXp);
              setKnowledge(prev => prev + dK);
              setReputation(prev => {
                triggerRepChange(dRep);
                return prev + dRep;
              });
              setCurrentEvent(null);
            }}
            onOk={() => {
              const xpGain = currentEvent.effect?.xp ?? 0;
              const knowledgeGain = currentEvent.effect?.knowledge ?? 0;
              setXp(prev => prev + xpGain);
              setKnowledge(prev => prev + knowledgeGain);
              setCurrentEvent(null);
            }}
          />
        </>
      )}
    </div>
  );
}

export default App;

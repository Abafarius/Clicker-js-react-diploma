// GameWrapper.jsx
import { useState, useRef, useEffect } from 'react';
import upgradesData from '../data/upgrades';
import eras from '../data/eras';
import storyChains from '../data/storyChains';
import UpgradeItem from './UpgradeItem';
import MusicToggleButton from './MusicToggleButton';
import PrestigeButton from './PrestigeButton';
import FloatingText from './FloatingText';
import EventPopup from './EventPopup';
import EventLogModal from './EventLogModal';
import { generateRandomEvent } from '../utils/eventGenerator';
import { initCustomParticles } from '../utils/customParticles';
import { startAutoEventTimeout, clearAutoEventTimeout } from '../utils/autoEventTimeout';
import EpochTransition from './EpochTransition';
import GameLayout from './gameUI/GameLayout';




function GameWrapper() {
  const [showEpochTransition, setShowEpochTransition] = useState(false);
  const [autoCountdown, setAutoCountdown] = useState(null);
  const [aiComment, setAiComment] = useState('');
  const [eventLog, setEventLog] = useState([]);
  const [showLog, setShowLog] = useState(false);
  const [reputation, setReputation] = useState(0);
  const [repChangeText, setRepChangeText] = useState(null);
  const [knowledge, setKnowledge] = useState(9999);
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
  const [currentStory, setCurrentStory] = useState(null);
  const [storyStep, setStoryStep] = useState(0);

  const currentEra = eras[prestigeLevel] || '∞ Вечный Ученик';

  const triggerRepChange = (amount) => {
    setRepChangeText({
      text: `${amount > 0 ? '+' : ''}${amount}`,
      className: amount > 0 ? 'rep-change rep-up' : 'rep-change rep-down',
    });
    setTimeout(() => setRepChangeText(null), 1200);
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

  const logEvent = (type, message, outcome, reward = {}) => {
    setEventLog(prev => [...prev, {
      timestamp: Date.now(),
      type,
      message,
      outcome,
      reward,
    }]);
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
      const nextLevel = prestigeLevel + 1;
      setShowEpochTransition(true);
      setPrestigeLevel(nextLevel);
      setPrestigeMultiplier(prev => +(prev + 0.1).toFixed(1));
      setKnowledge(0);
      setXp(0);
      setAutoKnowledge(0);
      setUpgrades(upgradesData);
    }
  };

  const handleStoryNext = () => {
    if (!currentStory) return;
    const nextStep = storyStep + 1;
    if (nextStep < currentStory.length) {
      setStoryStep(nextStep);
      setCurrentEvent(currentStory[nextStep]);
    } else {
      setCurrentStory(null);
      setStoryStep(0);
      setCurrentEvent(null);
    }
  };

  useEffect(() => initCustomParticles(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStory) {
        setCurrentEvent(currentStory[storyStep]);
        return;
      }
      if (reputation >= 30 && !currentStory) {
        const chain = storyChains[Math.floor(Math.random() * storyChains.length)];
        setCurrentStory(chain.stages);
        setStoryStep(0);
        setCurrentEvent(chain.stages[0]);
        return;
      }
      const newEvent = generateRandomEvent(reputation);
      setCurrentEvent(newEvent);
    }, 40000);
    return () => clearInterval(timer);
  }, [reputation, currentStory, storyStep]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKnowledge(prev => prev + autoKnowledge);
      setXp(prev => prev + autoKnowledge);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoKnowledge]);

  useEffect(() => {
    if (currentEvent) {
      setAiComment('');
      setAutoCountdown(15);

      startAutoEventTimeout(() => {
        setAiComment('🤖 Ты задумался слишком долго, решение принято за тебя...');
        if (currentEvent.type === 'Choices') {
          document.querySelector('.event-buttons button:last-child')?.click();
        } else {
          document.querySelector('.event-buttons button')?.click();
        }
      }, setAutoCountdown);
    }

    return () => {
      clearAutoEventTimeout();
      setAutoCountdown(null);
      setAiComment('');
    };
  }, [currentEvent]);

  return (
    <div className="app">
      <EpochTransition
        currentEpoch={currentEra}
        visible={showEpochTransition}
        onComplete={() => setShowEpochTransition(false)}
      />
      <div id="custom-particles" />
      <div className="floating-text-container">
        {floatingTexts.map(ft => <FloatingText key={ft.id} {...ft} />)}
      </div>

 <GameLayout
  knowledge={knowledge}
  xp={xp}
  prestigeLevel={prestigeLevel}
  prestigeMultiplier={prestigeMultiplier}
  currentEra={currentEra}
  reputation={reputation}
  repChangeText={repChangeText}
  onClickLearn={handleClick}
  onToggleAudio={handleToggleAudio}
  isMuted={isMuted}
  onOpenLog={() => setShowLog(true)}
  upgrades={upgrades}
  onBuyUpgrade={handleBuyUpgrade}
/>




      {knowledge >= 10000 && (
        <PrestigeButton onPrestige={handlePrestige} multiplier={prestigeMultiplier + 0.1} />
      )}




      <audio ref={audioRef} loop>
        <source src="/lofi.mp3" type="audio/mpeg" />
        Твой браузер не поддерживает аудио.
      </audio>

      {currentEvent && (
        <>
          <div className="event-overlay" />
          <EventPopup
            event={currentEvent}
            countdown={autoCountdown}
            aiComment={aiComment}
            storyInfo={currentStory ? `📖 Сюжетная цепочка — Этап ${storyStep + 1}/${currentStory.length}` : null}
            onAccept={() => {
              const { effect, choice, message } = currentEvent;
              const reward = effect || choice?.accept || {};
              setXp(prev => prev + (reward.xp || 0));
              setKnowledge(prev => prev + (reward.knowledge || 0));
              setReputation(prev => {
                triggerRepChange(reward.reputation || 0);
                return prev + (reward.reputation || 0);
              });
              logEvent('choice', message, 'принял', reward);
              currentStory ? handleStoryNext() : setCurrentEvent(null);
            }}
            onDecline={() => {
              const { effect, choice, message } = currentEvent;
              const reward = effect || choice?.decline || {};
              setXp(prev => prev + (reward.xp || 0));
              setKnowledge(prev => prev + (reward.knowledge || 0));
              setReputation(prev => {
                triggerRepChange(reward.reputation || 0);
                return prev + (reward.reputation || 0);
              });
              logEvent('choice', message, 'отклонил', reward);
              currentStory ? handleStoryNext() : setCurrentEvent(null);
            }}
            onOk={() => {
              const { message, effect = {} } = currentEvent;
              const { xp = 0, knowledge = 0, reputation = 0 } = effect;
              setXp(prev => prev + xp);
              setKnowledge(prev => prev + knowledge);
              setReputation(prev => {
                triggerRepChange(reputation);
                return prev + reputation;
              });
              logEvent('simple', message, 'ок', effect);
              currentStory ? handleStoryNext() : setCurrentEvent(null);
            }}
          />
        </>
      )}

      {showLog && (
        <EventLogModal eventLog={eventLog} onClose={() => setShowLog(false)} />
      )}
    </div>
  );
}

export default GameWrapper;

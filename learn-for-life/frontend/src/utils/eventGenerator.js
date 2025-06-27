const rarityWeights = {
  common: 0.3,
  rare: 0.055,
  epic: 0.001,
};

const names = ['профессор', 'AI-ассистент', 'ментор', 'студент', 'декан'];
const templates = {
  simple: [
    '{name} дал тебе инсайд: "{tip}".',
    'Ты нашёл статью про "{tip}" — мозг взорвался 🤯',
    'Пока пил кофе, ты понял как работает "{tip}" ☕'
  ],
  tips: [
    'нейросети', 'градиентный спуск', 'систему цитирования', 'технику Pomodoro', 'вечное обучение'
  ]
};

// 🧠 Репутационные уровни
const reputationTiers = {
  negative: { min: -Infinity, max: -1 },
  neutral: { min: 0, max: 29 },
  trusted: { min: 30, max: 69 },
  elite: { min: 70, max: Infinity },
};

function getReputationTier(rep) {
  return Object.keys(reputationTiers).find(tier => {
    const { min, max } = reputationTiers[tier];
    return rep >= min && rep <= max;
  });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseWeighted(weights) {
  const total = Object.values(weights).reduce((sum, w) => sum + w, 0);
  const roll = Math.random() * total;
  let cumulative = 0;
  for (const key in weights) {
    cumulative += weights[key];
    if (roll < cumulative) return key;
  }
  return Object.keys(weights)[0];
}

const rewards = {
  common: () => ({ xp: random(5, 10), knowledge: random(3, 8) }),
  rare: () => ({ xp: random(12, 20), knowledge: random(10, 18) }),
  epic: () => ({ xp: random(25, 35), knowledge: random(20, 30) }),
};

// 🎲 Генерация события с учётом репутации
export function generateRandomEvent(currentReputation = 0) {
  const tier = getReputationTier(currentReputation);
  const allowEpic = tier === 'trusted' || tier === 'elite';
  const allowChoice = tier !== 'negative';

  const adjustedWeights = {
    common: rarityWeights.common,
    rare: rarityWeights.rare,
    epic: allowEpic ? rarityWeights.epic : 0,
  };

  const rarity = chooseWeighted(adjustedWeights);
  const typeRoll = Math.random();

  // 🤝 Событие выбора
  if (typeRoll < 0.4 && allowChoice) {
    const acceptReward = rewards[rarity]();
    const declineReward = { xp: random(0, 3), knowledge: random(0, 2), reputation: -1 };
    return {
      type: 'Choices',
      rarity,
      risk: Math.random() < 0.2,
      message: `⚖️ ${names[random(0, names.length - 1)]} предлагает рискованное сотрудничество. Что скажешь?`,
      choice: {
        accept: { ...acceptReward, reputation: +2 },
        decline: declineReward,
      }
    };
  }

  // 🧩 Простое событие
  const template = templates.simple[random(0, templates.simple.length - 1)];
  const name = names[random(0, names.length - 1)];
  const tip = templates.tips[random(0, templates.tips.length - 1)];
  const message = template.replace('{name}', name).replace('{tip}', tip);

  return {
    type: 'simple',
    rarity,
    message,
    effect: { ...rewards[rarity](), reputation: 0 }
  };
}

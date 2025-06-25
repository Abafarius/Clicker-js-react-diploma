const rarityWeights = {
  common: 0.6,
  rare: 0.3,
  epic: 0.1,
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

const rewards = {
  common: () => ({ xp: random(5, 10), knowledge: random(3, 8) }),
  rare: () => ({ xp: random(12, 20), knowledge: random(10, 18) }),
  epic: () => ({ xp: random(25, 35), knowledge: random(20, 30) }),
};

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

export function generateRandomEvent() {
  const rarity = chooseWeighted(rarityWeights);
  const typeRoll = Math.random();

  // RANDOM CHOICE EVENT
  if (typeRoll < 0.4) {
    const acceptReward = rewards[rarity]();
    const declineReward = { xp: random(0, 3), knowledge: random(0, 2) };
    return {
      type: 'choice',
      rarity,
      risk: Math.random() < 0.2, // 20% риск
      message: `⚖️ ${names[random(0, names.length - 1)]} предлагает рискованное сотрудничество. Что скажешь?`,
      choice: {
        accept: acceptReward,
        decline: declineReward
      }
    };
  }

  // RANDOM SIMPLE EVENT
  else {
    const template = templates.simple[random(0, templates.simple.length - 1)];
    const name = names[random(0, names.length - 1)];
    const tip = templates.tips[random(0, templates.tips.length - 1)];
    const message = template.replace('{name}', name).replace('{tip}', tip);

    return {
      type: 'simple',
      rarity,
      message,
      effect: rewards[rarity]()
    };
  }
}

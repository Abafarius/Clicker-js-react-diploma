const names = ['профессор', 'AI-ассистент', 'коллега', 'студент', 'ментор'];
const actionsSimple = [
  'подарил тебе редкую книгу 📘',
  'пригласил тебя на научный кружок 🧪',
  'рассказал лайфхак по учёбе 🧠',
  'подкинул тебе интересный подкаст 🎧'
];

const simpleEffects = [
  { xp: 10, knowledge: 5 },
  { xp: 15, knowledge: 10 },
  { xp: 8, knowledge: 12 },
];

const choices = [
  {
    message: '🚀 Ты получил приглашение на международную олимпиаду. Участвуешь?',
    accept: { xp: 25, knowledge: 15 },
    decline: { xp: 5, knowledge: 0 }
  },
  {
    message: '📢 Курсы по data science начались. Присоединиться?',
    accept: { xp: 20, knowledge: 10 },
    decline: { xp: 0, knowledge: 0 }
  },
  {
    message: '🎓 Хочешь поучаствовать в хакатоне выходного дня?',
    accept: { xp: 18, knowledge: 14 },
    decline: { xp: 3, knowledge: 1 }
  }
];

export function generateRandomEvent() {
  const isChoice = Math.random() < 0.5;

  if (isChoice) {
    const choice = choices[Math.floor(Math.random() * choices.length)];
    return {
      type: 'choice',
      message: choice.message,
      choice: {
        accept: choice.accept,
        decline: choice.decline
      }
    };
  } else {
    const name = names[Math.floor(Math.random() * names.length)];
    const action = actionsSimple[Math.floor(Math.random() * actionsSimple.length)];
    const effect = simpleEffects[Math.floor(Math.random() * simpleEffects.length)];

    return {
      type: 'simple',
      message: `📚 ${name} ${action}.`,
      effect
    };
  }
}

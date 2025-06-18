const events = [
  {
    id: 1,
    type: 'bonus',
    message: 'Ты нашёл старую заметку 📝',
    effect: { xp: 50, knowledge: 0 }
  },
  {
    id: 2,
    type: 'penalty',
    message: 'Ошибочная перезапись памяти ⚠️',
    effect: { xp: -20, knowledge: -10 }
  },
  {
    id: 3,
    type: 'choice',
    message: '👤 Незнакомец предлагает: отдать 100 XP за 200 знаний. Принять?',
    choice: {
      accept: { xp: -100, knowledge: 200 },
      decline: { xp: 0, knowledge: 0 }
    }
  }
];

export default events;

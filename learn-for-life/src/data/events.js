const events = {
  0: [ // Начальный уровень престижа
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
  ],
  1: [ // События для 1-го уровня престижа
    {
      id: 4,
      type: 'bonus',
      message: 'Древний свиток раскрыл секреты 📜',
      effect: { xp: 100, knowledge: 50 }
    },
    {
      id: 5,
      type: 'choice',
      message: '🏛️ Мудрец предлагает обмен: 200 XP за 400 знаний?',
      choice: {
        accept: { xp: -200, knowledge: 400 },
        decline: { xp: 50, knowledge: 0 }
      }
    }
  ]
}

export default events;

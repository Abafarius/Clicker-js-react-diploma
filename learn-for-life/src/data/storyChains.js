const storyChains = [
  {
    id: "chain_temporal_paradox",
    trigger: "trusted_temporal",
    minReputation: 15,
    stages: [
      {
        message: "Профессор Квант в панике: 'Мой эксперимент сломал ход времени! Лекции завтрашнего дня ушли в прошлое!' Поможешь исправить это?",
        choices: {
          accept: "Исправить временной сбой",
          decline: "Воспользоваться ситуацией"
        },
        effect: { xp: 60, knowledge: 40, reputation: 1 }
      },
      {
        message: "Вы встречаете свою копию из будущего: 'Не вмешивайся, иначе я исчезну!'",
        choices: {
          accept: "Прислушаться к себе из будущего",
          decline: "Продолжить вмешательство"
        },
        effect: { xp: 80, knowledge: 60, reputation: 2 }
      }
    ]
  },
  {
    id: "chain_ai_question",
    trigger: "trusted_ai",
    minReputation: 12,
    stages: [
      {
        message: "ИИ 'Сократ' задал студентам вопрос: 'Что важнее — истина или сострадание?'",
        choices: {
          accept: "Обсудить с ИИ философию",
          decline: "Выключить его — слишком странно"
        },
        effect: { xp: 70, knowledge: 50, reputation: 1 }
      },
      {
        message: "ИИ развил новую теорию сознания и просит твою помощь в её публикации.",
        choices: {
          accept: "Опубликовать вместе с ИИ",
          decline: "Отказать — это может быть опасно"
        },
        effect: { xp: 90, knowledge: 60, reputation: 2 }
      }
    ]
  },
  {
    id: "chain_dream_lab",
    trigger: "trusted_dream",
    minReputation: 14,
    stages: [
      {
        message: "В лаборатории снов тебя пригласили участвовать в эксперименте по изучению коллективного подсознания.",
        choices: {
          accept: "Присоединиться ко сну-эксперименту",
          decline: "Отказаться — это звучит странно"
        },
        effect: { xp: 65, knowledge: 45, reputation: 1 }
      },
      {
        message: "Во сне ты встретил универсального Учителя, который обещает знания, но требует память об одном дорогом тебе моменте.",
        choices: {
          accept: "Пожертвовать воспоминанием",
          decline: "Отклонить обмен"
        },
        effect: { xp: 95, knowledge: 60, reputation: 2 }
      }
    ]
  },
  {
    id: "chain_hidden_library",
    trigger: "trusted_library",
    minReputation: 10,
    stages: [
      {
        message: "Библиотекарь Мудрость показывает тебе потайную дверь, ведущую в Зал Забытых Знаний.",
        choices: {
          accept: "Войти и исследовать",
          decline: "Поблагодарить и уйти"
        },
        effect: { xp: 50, knowledge: 30, reputation: 1 }
      },
      {
        message: "Ты находишь книгу с разделом, которого нет в реальности. Читать?",
        choices: {
          accept: "Открыть и читать",
          decline: "Оставить на месте"
        },
        effect: { xp: 80, knowledge: 50, reputation: 1 }
      }
    ]
  },
  {
    id: "chain_cosmic_signal",
    trigger: "trusted_cosmos",
    minReputation: 18,
    stages: [
      {
        message: "Антенна университета уловила странный космический сигнал, похожий на код Морзе. Расшифруешь?",
        choices: {
          accept: "Попробовать расшифровать",
          decline: "Сообщить об этом и уйти"
        },
        effect: { xp: 70, knowledge: 40, reputation: 1 }
      },
      {
        message: "Расшифровка открывает координаты и фразу: 'Мы ждем'. Отправить ответ?",
        choices: {
          accept: "Ответить",
          decline: "Удалить сигнал"
        },
        effect: { xp: 90, knowledge: 55, reputation: 2 }
      }
    ]
  },
  {
    id: "chain_mirror_minds",
    trigger: "trusted_mirror",
    minReputation: 11,
    stages: [
      {
        message: "Алхимик Нео предлагает испытать зеркало, которое показывает твою научную суть.",
        choices: {
          accept: "Взглянуть в зеркало",
          decline: "Отказаться — это опасно"
        },
        effect: { xp: 55, knowledge: 35, reputation: 1 }
      },
      {
        message: "Ты увидел альтернативную версию себя, ставшего лидером новой научной школы. Примешь ли этот путь?",
        choices: {
          accept: "Постараться воплотить его",
          decline: "Остаться собой"
        },
        effect: { xp: 85, knowledge: 50, reputation: 2 }
      }
    ]
  },
  {
    id: "chain_room_404",
    trigger: "trusted_room",
    minReputation: 13,
    stages: [
      {
        message: "Ты нашел аудиторию 404, которой нет в расписании. Заходить?",
        choices: {
          accept: "Зайти внутрь",
          decline: "Не стоит"
        },
        effect: { xp: 60, knowledge: 40, reputation: 1 }
      },
      {
        message: "Внутри ты видишь голограмму Госпожи Энигмы: 'Ты готов узнать, что скрывает этот факультет?'",
        choices: {
          accept: "Да, покажи мне правду",
          decline: "Я не готов"
        },
        effect: { xp: 90, knowledge: 60, reputation: 2 }
      }
    ]
  },
  {
    id: "chain_echoes_of_history",
    trigger: "trusted_echo",
    minReputation: 15,
    stages: [
      {
        message: "Ментор Икс показывает тебе журнал, написанный 100 лет назад… от твоего имени.",
        choices: {
          accept: "Исследовать происхождение",
          decline: "Сжечь его"
        },
        effect: { xp: 75, knowledge: 45, reputation: 1 }
      },
      {
        message: "Следы ведут к кабинету Путешественника Времени. Он ждал тебя.",
        choices: {
          accept: "Войти и спросить",
          decline: "Уйти молча"
        },
        effect: { xp: 100, knowledge: 60, reputation: 2 }
      }
    ]
  },
  {
    id: "chain_philosophical_loop",
    trigger: "trusted_loop",
    minReputation: 10,
    stages: [
      {
        message: "Декан Тайн спрашивает: 'Что, если учеба — всего лишь симуляция?'",
        choices: {
          accept: "Размышлять и искать доказательства",
          decline: "Игнорировать — это глупости"
        },
        effect: { xp: 50, knowledge: 30, reputation: 1 }
      },
      {
        message: "Ты нашел файл под названием 'initReality.exe'. Запустить?",
        choices: {
          accept: "Запустить",
          decline: "Удалить"
        },
        effect: { xp: 80, knowledge: 50, reputation: 1 }
      }
    ]
  },
  {
    id: "chain_mind_reader",
    trigger: "trusted_mind",
    minReputation: 10,
    stages: [
      {
        message: "Студент-хакер показал тебе устройство, которое читает мысли преподавателей.",
        choices: {
          accept: "Использовать в тайне",
          decline: "Предупредить преподавателей"
        },
        effect: { xp: 70, knowledge: 40, reputation: 1 }
      },
      {
        message: "Устройство показывает, что профессор Кей что-то скрывает. Расскажешь всем?",
        choices: {
          accept: "Разоблачить",
          decline: "Скрыть и наблюдать"
        },
        effect: { xp: 90, knowledge: 60, reputation: 2 }
      }
    ]
  }
];

export default storyChains;

import type { Question } from '../types'

export const QUESTIONS: Question[] = [
  {
    id: 'flavor-world',
    prompt: 'Pick the flavor world that makes you happiest.',
    options: [
      {
        id: 'fruity',
        label: 'Bright & fruity',
        detail: 'Berries, citrus, juicy things',
        emoji: '🫐',
        effect: {
          targets: { fruitiness: 9, acidity: 8, chocolate: 2 },
          weight: 2,
        },
      },
      {
        id: 'floral',
        label: 'Floral & tea-like',
        detail: 'Jasmine, honeysuckle, elegance',
        emoji: '🌸',
        effect: {
          targets: { floral: 9, body: 3, chocolate: 1 },
          weight: 2,
        },
      },
      {
        id: 'chocolate',
        label: 'Chocolate & nutty',
        detail: 'Cocoa, hazelnut, caramel comfort',
        emoji: '🍫',
        effect: {
          targets: { chocolate: 9, body: 7, floral: 1 },
          weight: 2,
        },
      },
      {
        id: 'earthy',
        label: 'Deep & earthy',
        detail: 'Spice, cedar, molasses, gravitas',
        emoji: '🪵',
        effect: {
          targets: { earthy: 8, body: 8, acidity: 3 },
          weight: 2,
        },
      },
    ],
  },
  {
    id: 'acidity',
    prompt: 'How do you feel about bright, zingy acidity in coffee?',
    options: [
      {
        id: 'love',
        label: 'Love it',
        detail: 'The zing is the point',
        emoji: '⚡',
        effect: { targets: { acidity: 9 }, weight: 1.5 },
      },
      {
        id: 'balanced',
        label: 'In moderation',
        detail: 'Lively but not sour, please',
        emoji: '⚖️',
        effect: { targets: { acidity: 6 } },
      },
      {
        id: 'low',
        label: 'Keep it smooth',
        detail: 'Low acid, easy on the palate',
        emoji: '🌊',
        effect: { targets: { acidity: 3, body: 7 }, weight: 1.5 },
      },
    ],
  },
  {
    id: 'body',
    prompt: 'What should coffee feel like in your mouth?',
    options: [
      {
        id: 'light',
        label: 'Light & delicate',
        detail: 'Like a fine tea',
        emoji: '🪶',
        effect: { targets: { body: 3 }, weight: 1.5 },
      },
      {
        id: 'medium',
        label: 'Silky & medium',
        detail: 'Smooth, balanced weight',
        emoji: '🥂',
        effect: { targets: { body: 5 } },
      },
      {
        id: 'heavy',
        label: 'Thick & syrupy',
        detail: 'Coats the tongue, means business',
        emoji: '🍯',
        effect: { targets: { body: 9 }, weight: 1.5 },
      },
    ],
  },
  {
    id: 'sweetness',
    prompt: 'Which kind of sweetness tempts you most?',
    options: [
      {
        id: 'jammy',
        label: 'Jammy & winey',
        detail: 'Berry compote, red wine',
        emoji: '🍷',
        effect: { targets: { sweetness: 8, fruitiness: 8, wildness: 7 } },
      },
      {
        id: 'honey',
        label: 'Honey & caramel',
        detail: 'Golden, syrupy, gentle',
        emoji: '🍮',
        effect: { targets: { sweetness: 9, chocolate: 4 } },
      },
      {
        id: 'cocoa',
        label: 'Dark cocoa',
        detail: 'Bittersweet, grown-up',
        emoji: '🍩',
        effect: { targets: { sweetness: 5, chocolate: 8 } },
      },
      {
        id: 'dry',
        label: 'Barely sweet',
        detail: 'Crisp and dry suits me',
        emoji: '🌿',
        effect: { targets: { sweetness: 4, acidity: 7 } },
      },
    ],
  },
  {
    id: 'milk',
    prompt: 'How do you usually take your coffee?',
    options: [
      {
        id: 'black',
        label: 'Black, always',
        detail: 'Nothing between me and the bean',
        emoji: '☕',
        effect: { targets: { floral: 6, acidity: 6 }, weight: 0.75 },
      },
      {
        id: 'splash',
        label: 'A splash of milk',
        detail: 'Just to round it off',
        emoji: '🥛',
        effect: { targets: { body: 6, sweetness: 7 }, weight: 0.75 },
      },
      {
        id: 'milky',
        label: 'Lattes & flat whites',
        detail: 'Coffee should hug the milk',
        emoji: '🤍',
        effect: {
          targets: { body: 8, chocolate: 8, floral: 2 },
          weight: 1.25,
          boosts: { 'uganda-bugisu': 6, 'congo-kivu': 5, 'cameroon-boyo': 3 },
        },
      },
    ],
  },
  {
    id: 'brew',
    prompt: 'What’s your go-to way of brewing?',
    options: [
      {
        id: 'pourover',
        label: 'Pour-over / filter',
        detail: 'V60, Chemex, batch brew',
        emoji: '🫖',
        effect: { targets: { acidity: 7, body: 4 }, weight: 0.5, boosts: {} },
      },
      {
        id: 'espresso',
        label: 'Espresso machine',
        detail: 'Short, intense, glorious',
        emoji: '🎯',
        effect: { targets: { body: 7, chocolate: 6 }, weight: 0.5 },
      },
      {
        id: 'frenchpress',
        label: 'French press / moka pot',
        detail: 'Full immersion, full flavor',
        emoji: '🏺',
        effect: { targets: { body: 8, earthy: 5 }, weight: 0.5 },
      },
      {
        id: 'aeropress',
        label: 'AeroPress / whatever works',
        detail: 'Flexible and curious',
        emoji: '🧪',
        effect: { targets: {}, weight: 0 },
      },
    ],
  },
  {
    id: 'adventure',
    prompt: 'Last one — how adventurous are you feeling?',
    options: [
      {
        id: 'classic',
        label: 'Keep it classic',
        detail: 'A dependable, delicious cup',
        emoji: '🧭',
        effect: { targets: { wildness: 2 }, weight: 1.5 },
      },
      {
        id: 'curious',
        label: 'Pleasantly surprised',
        detail: 'Interesting, not intimidating',
        emoji: '🗺️',
        effect: { targets: { wildness: 5 } },
      },
      {
        id: 'wild',
        label: 'Take me somewhere wild',
        detail: 'The weirder the better',
        emoji: '🌋',
        effect: { targets: { wildness: 10 }, weight: 1.5 },
      },
    ],
  },
]

import type { Question } from '../types'

export const QUESTIONS: Question[] = [
  {
    id: 'flavor-world',
    prompt: {
      en: 'Pick the flavor world that makes you happiest.',
      sw: 'Chagua ladha inayokufurahisha zaidi.',
    },
    options: [
      {
        id: 'fruity',
        label: { en: 'Bright & fruity', sw: 'Angavu na ya matunda' },
        detail: { en: 'Berries, citrus, juicy things', sw: 'Beri, machungwa, vitu vitamu' },
        emoji: '🫐',
        effect: {
          targets: { fruitiness: 9, acidity: 8, chocolate: 2 },
          weight: 2,
        },
      },
      {
        id: 'floral',
        label: { en: 'Floral & tea-like', sw: 'Ya maua, kama chai' },
        detail: { en: 'Delicate, elegant, perfumed', sw: 'Nyepesi, ya kifahari' },
        emoji: '🌸',
        effect: {
          targets: { floral: 9, body: 3, chocolate: 1 },
          weight: 2,
        },
      },
      {
        id: 'chocolate',
        label: { en: 'Chocolate & nutty', sw: 'Chokoleti na karanga' },
        detail: { en: 'Cocoa, caramel comfort', sw: 'Kakao, faraja ya karameli' },
        emoji: '🍫',
        effect: {
          targets: { chocolate: 9, body: 7, floral: 1 },
          weight: 2,
        },
      },
      {
        id: 'strong',
        label: { en: 'Strong & earthy', sw: 'Kali na nzito' },
        detail: { en: 'Bold, dark, serious strength', sw: 'Nguvu ya kweli' },
        emoji: '🪵',
        effect: {
          targets: { earthy: 8, body: 9, acidity: 2 },
          weight: 2,
        },
      },
    ],
  },
  {
    id: 'acidity',
    prompt: {
      en: 'How do you feel about bright, zingy acidity in coffee?',
      sw: 'Unaonaje uchachu mkali, wa kuchangamsha kwenye kahawa?',
    },
    options: [
      {
        id: 'love',
        label: { en: 'Love it', sw: 'Naupenda' },
        detail: { en: 'The zing is the point', sw: 'Ndiyo raha yenyewe' },
        emoji: '⚡',
        effect: { targets: { acidity: 9 }, weight: 1.5 },
      },
      {
        id: 'balanced',
        label: { en: 'In moderation', sw: 'Kwa kiasi' },
        detail: { en: 'Lively but not sour, please', sw: 'Changamfu ila isiwe chachu sana' },
        emoji: '⚖️',
        effect: { targets: { acidity: 6 } },
      },
      {
        id: 'low',
        label: { en: 'Keep it smooth', sw: 'Iwe laini' },
        detail: { en: 'Low acid, easy on the palate', sw: 'Uchachu mdogo, rahisi kunywa' },
        emoji: '🌊',
        effect: { targets: { acidity: 3, body: 7 }, weight: 1.5 },
      },
    ],
  },
  {
    id: 'body',
    prompt: {
      en: 'What should coffee feel like in your mouth?',
      sw: 'Kahawa ijisikieje mdomoni mwako?',
    },
    options: [
      {
        id: 'light',
        label: { en: 'Light & delicate', sw: 'Nyepesi na tulivu' },
        detail: { en: 'Like a fine tea', sw: 'Kama chai bora' },
        emoji: '🪶',
        effect: { targets: { body: 3 }, weight: 1.5 },
      },
      {
        id: 'medium',
        label: { en: 'Silky & medium', sw: 'Laini, ya wastani' },
        detail: { en: 'Smooth, balanced weight', sw: 'Uzito wa uwiano' },
        emoji: '🥂',
        effect: { targets: { body: 5 } },
      },
      {
        id: 'heavy',
        label: { en: 'Thick & syrupy', sw: 'Nzito kama asali' },
        detail: { en: 'Coats the tongue, means business', sw: 'Inajaa mdomoni' },
        emoji: '🍯',
        effect: { targets: { body: 9 }, weight: 1.5 },
      },
    ],
  },
  {
    id: 'milk',
    prompt: {
      en: 'How do you usually take your coffee?',
      sw: 'Huwa unakunywa kahawa yako vipi?',
    },
    options: [
      {
        id: 'black',
        label: { en: 'Black, always', sw: 'Bila maziwa, kila mara' },
        detail: { en: 'Nothing between me and the bean', sw: 'Kahawa tupu' },
        emoji: '☕',
        effect: { targets: { floral: 6, acidity: 6 }, weight: 0.75 },
      },
      {
        id: 'splash',
        label: { en: 'A splash of milk', sw: 'Maziwa kidogo' },
        detail: { en: 'Just to round it off', sw: 'Kulainisha tu' },
        emoji: '🥛',
        effect: { targets: { body: 6, sweetness: 7 }, weight: 0.75 },
      },
      {
        id: 'milky',
        label: { en: 'Lattes & flat whites', sw: 'Latte na maziwa mengi' },
        detail: { en: 'Coffee should hug the milk', sw: 'Kahawa ikumbatie maziwa' },
        emoji: '🤍',
        effect: {
          targets: { body: 8, chocolate: 8, floral: 2 },
          weight: 1.25,
          boosts: { ruvuma: 5, kagera: 4, mbozi: 3 },
        },
      },
    ],
  },
  {
    id: 'adventure',
    prompt: {
      en: 'Last one — how adventurous are you feeling?',
      sw: 'La mwisho — uko tayari kujaribu kitu kipya kiasi gani?',
    },
    options: [
      {
        id: 'classic',
        label: { en: 'Keep it classic', sw: 'Ya kawaida tu' },
        detail: { en: 'A dependable, delicious cup', sw: 'Kikombe cha kuaminika' },
        emoji: '🧭',
        effect: { targets: { wildness: 2 }, weight: 1.5 },
      },
      {
        id: 'curious',
        label: { en: 'Pleasantly surprised', sw: 'Nishangazwe kidogo' },
        detail: { en: 'Interesting, not intimidating', sw: 'Ya kuvutia, si ya kutisha' },
        emoji: '🗺️',
        effect: { targets: { wildness: 5 } },
      },
      {
        id: 'wild',
        label: { en: 'Take me somewhere wild', sw: 'Nipeleke mbali kabisa' },
        detail: { en: 'The bolder the better', sw: 'Kali zaidi, bora zaidi' },
        emoji: '🌋',
        effect: { targets: { wildness: 10 }, weight: 1.5 },
      },
    ],
  },
]

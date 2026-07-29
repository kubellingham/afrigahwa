import type { Lang, Localized } from './types'

export const UI = {
  tagline: { en: 'the Tanzanian coffee matcher', sw: 'kioanishi cha kahawa ya Tanzania' },
  introTitle: { en: 'Find your Tanzanian coffee match', sw: 'Pata kahawa yako ya Tanzania' },
  introBody: {
    en: 'Tanzania grows some of the world’s finest coffee — from the volcanic slopes of Kilimanjaro to the shores of Lake Tanganyika. Answer 5 quick questions and we’ll match you with the growing region made for your palate.',
    sw: 'Tanzania hulima kahawa bora kabisa duniani — kutoka miteremko ya volkano ya Kilimanjaro hadi mwambao wa Ziwa Tanganyika. Jibu maswali 5 mafupi, tukuoanishe na eneo la kahawa linalokufaa.',
  },
  start: { en: 'Start the tasting →', sw: 'Anza kuonja →' },
  questionOf: { en: 'Question {i} of {n}', sw: 'Swali {i} kati ya {n}' },
  back: { en: '← Back', sw: '← Rudi' },
  yourMatch: { en: 'Your match', sw: 'Kahawa yako' },
  matchLabel: { en: 'match', sw: 'inafaa' },
  alsoWorth: { en: 'Also worth a cup', sw: 'Nyingine za kujaribu' },
  howToBrew: { en: 'How to brew it', sw: 'Jinsi ya kuitengeneza' },
  grindTitle: { en: 'How would you like it ground?', sw: 'Unataka isagwe vipi?' },
  whatsappCta: { en: 'Ask if it’s in stock on WhatsApp', sw: 'Uliza kama ipo kwa WhatsApp' },
  retake: { en: 'Retake the quiz', sw: 'Rudia jaribio' },
  footer: {
    en: 'Grown in Tanzania — from Kilimanjaro to Ruvuma, every cup starts on a Tanzanian farm. ☕',
    sw: 'Imelimwa Tanzania — kutoka Kilimanjaro hadi Ruvuma, kila kikombe huanzia shambani Tanzania. ☕',
  },
} satisfies Record<string, Localized>

export interface GrindOption {
  id: string
  label: Localized
}

export const GRIND_OPTIONS: GrindOption[] = [
  { id: 'whole', label: { en: 'Whole bean', sw: 'Punje nzima' } },
  { id: 'filter', label: { en: 'Filter / pour-over grind', sw: 'Ya kuchuja (filter)' } },
  { id: 'frenchpress', label: { en: 'French press grind', sw: 'Ya french press' } },
  { id: 'espresso', label: { en: 'Espresso grind', sw: 'Ya espresso' } },
]

export function t(text: Localized, lang: Lang): string {
  return text[lang]
}

export function whatsappMessage(
  lang: Lang,
  coffeeName: string,
  zone: string,
  notes: string,
  grind: string,
): string {
  if (lang === 'sw') {
    return `Habari Afrigahwa! Jaribio la kahawa limenioanisha na ${coffeeName} (${zone}) — ladha za ${notes}. Je, mnayo hii au inayofanana nayo dukani kwa sasa? Ningependa usagaji: ${grind}.`
  }
  return `Hello Afrigahwa! The coffee matcher paired me with ${coffeeName} (${zone}) — notes of ${notes}. Do you currently have this or something similar in stock? I'd take it as: ${grind}.`
}

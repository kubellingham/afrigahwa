import type { Attribute, Lang, Localized } from './types'

export const UI = {
  tagline: {
    en: 'Kioanishi cha kahawa — the Tanzanian coffee matcher',
    sw: 'Kioanishi cha kahawa ya Tanzania',
  },
  roasted: { en: 'Roasted in Tanzania', sw: 'Imechomwa Tanzania' },
  navMatcher: { en: 'The Matcher', sw: 'Kioanishi' },
  navRegions: { en: 'Six Regions', sw: 'Maeneo Sita' },
  heroTitle: {
    en: 'Six regions. One cup with your name on it.',
    sw: 'Maeneo sita. Kikombe kimoja chenye jina lako.',
  },
  heroBody: {
    en: 'Tanzania grows some of the world’s finest coffee — from the volcanic slopes of Kilimanjaro to the shores of Lake Tanganyika. Answer 5 quick questions and we’ll match you with the growing region made for your palate.',
    sw: 'Tanzania hulima kahawa bora kabisa duniani — kutoka miteremko ya volkano ya Kilimanjaro hadi mwambao wa Ziwa Tanganyika. Jibu maswali 5 mafupi, tukuoanishe na eneo la kahawa linalokufaa.',
  },
  start: { en: 'Start the tasting', sw: 'Anza kuonja' },
  heroMeta: { en: '90 seconds · 5 questions', sw: 'Sekunde 90 · maswali 5' },
  regionsKicker: { en: 'The regions', sw: 'Maeneo' },
  questionOf: { en: 'Question {i} of {n}', sw: 'Swali {i} kati ya {n}' },
  back: { en: '← Back', sw: '← Rudi' },
  kbdHint: {
    en: 'Type A–D to answer · ← to go back',
    sw: 'Andika A–D kujibu · ← kurudi',
  },
  yourMatch: { en: 'Your match · Kahawa yako', sw: 'Kahawa yako · Your match' },
  matchLabel: { en: 'match', sw: 'inafaa' },
  alsoWorth: { en: 'Also worth a cup', sw: 'Nyingine za kujaribu' },
  howToBrew: { en: 'How to brew it', sw: 'Jinsi ya kuitengeneza' },
  grindTitle: { en: 'How would you like it ground?', sw: 'Unataka isagwe vipi?' },
  whatsappCta: { en: 'Ask if it’s in stock on WhatsApp', sw: 'Uliza kama ipo kwa WhatsApp' },
  retake: { en: 'Retake the quiz', sw: 'Rudia jaribio' },
  browseAll: { en: 'Browse all six regions →', sw: 'Vinjari maeneo yote sita →' },
  share: { en: 'Copy share link', sw: 'Nakili kiungo' },
  copied: { en: 'Link copied ✓', sw: 'Imenakiliwa ✓' },
  tasteProfile: { en: 'Taste profile', sw: 'Wasifu wa ladha' },
  where: { en: 'Where it grows', sw: 'Inapolimwa' },
  regionsTitle: { en: 'Six regions, six characters.', sw: 'Maeneo sita, tabia sita.' },
  regionsIntro: {
    en: 'Browse every growing region — no quiz required. Each coffee is roasted in Tanzania and ordered over WhatsApp, whole bean or ground to your brew.',
    sw: 'Vinjari maeneo yote ya kilimo — bila jaribio. Kila kahawa huchomwa Tanzania na kuagizwa kwa WhatsApp, punje nzima au iliyosagwa.',
  },
  brewLabel: { en: 'Brew', sw: 'Andaa' },
  askLabel: { en: 'Ask on WhatsApp →', sw: 'Uliza kwa WhatsApp →' },
  notSure: { en: 'Not sure? Take the tasting', sw: 'Huna uhakika? Anza kuonja' },
  footer: {
    en: 'Grown in Tanzania — from Kilimanjaro to Ruvuma, every cup starts on a Tanzanian farm.',
    sw: 'Imelimwa Tanzania — kutoka Kilimanjaro hadi Ruvuma, kila kikombe huanzia shambani Tanzania.',
  },
  wholesale: {
    en: 'Cafés & wholesale — talk to us on WhatsApp →',
    sw: 'Mikahawa na jumla — wasiliana nasi kwa WhatsApp →',
  },
  wholesaleMsg: {
    en: 'Hello Afrigahwa! I buy for a café / wholesale — can we talk beans?',
    sw: 'Habari Afrigahwa! Nanunua kwa mkahawa / jumla — tuzungumze kuhusu kahawa?',
  },
} satisfies Record<string, Localized>

export const STEPS: Record<Lang, string[]> = {
  en: [
    'Answer five questions about your palate.',
    'We read your taste and rank all six regions.',
    'Order your match in one tap on WhatsApp.',
  ],
  sw: [
    'Jibu maswali matano kuhusu ladha yako.',
    'Tunasoma ladha yako na kupanga maeneo sita.',
    'Agiza kahawa yako kwa mbofyo mmoja WhatsApp.',
  ],
}

export const ATTR_LABELS: Record<Attribute, Localized> = {
  acidity: { en: 'Acidity', sw: 'Uchachu' },
  body: { en: 'Body', sw: 'Uzito' },
  fruitiness: { en: 'Fruit', sw: 'Matunda' },
  floral: { en: 'Floral', sw: 'Maua' },
  sweetness: { en: 'Sweetness', sw: 'Utamu' },
  chocolate: { en: 'Chocolate', sw: 'Chokoleti' },
  earthy: { en: 'Earthy', sw: 'Udongo' },
  wildness: { en: 'Wildness', sw: 'Pori' },
}

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

export function matchMessage(
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

export function regionMessage(
  lang: Lang,
  coffeeName: string,
  zone: string,
  notes: string,
): string {
  if (lang === 'sw') {
    return `Habari Afrigahwa! Je, kahawa ya ${coffeeName} (${zone}) ipo dukani sasa? Ladha za ${notes}.`
  }
  return `Hello Afrigahwa! Is your ${coffeeName} (${zone}) currently in stock? Notes of ${notes}.`
}

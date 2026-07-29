export const ATTRIBUTES = [
  'acidity',
  'body',
  'fruitiness',
  'floral',
  'sweetness',
  'chocolate',
  'earthy',
  'wildness',
] as const

export type Attribute = (typeof ATTRIBUTES)[number]

export type Lang = 'en' | 'sw'

export interface Localized {
  en: string
  sw: string
}

export interface LocalizedList {
  en: string[]
  sw: string[]
}

/** 0–10 scale for every attribute. */
export type Profile = Record<Attribute, number>

export interface Coffee {
  id: string
  /** growing region name (proper noun, same in both languages) */
  name: string
  emoji: string
  zone: Localized
  variety: 'Arabica' | 'Robusta'
  process: Localized
  tastingNotes: LocalizedList
  description: Localized
  brewTips: Localized
  profile: Profile
}

export interface AnswerEffect {
  /** partial target profile this answer pulls the user toward */
  targets: Partial<Profile>
  /** how strongly this answer weighs on each targeted attribute (default 1) */
  weight?: number
  /** flat score bonus for specific coffees (e.g. milk affinity) */
  boosts?: Record<string, number>
}

export interface Option {
  id: string
  label: Localized
  detail?: Localized
  emoji: string
  effect: AnswerEffect
}

export interface Question {
  id: string
  prompt: Localized
  options: Option[]
}

export interface Match {
  coffee: Coffee
  /** 0–100 */
  score: number
}

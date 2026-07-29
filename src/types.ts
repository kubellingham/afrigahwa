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

/** 0–10 scale for every attribute. */
export type Profile = Record<Attribute, number>

export interface Coffee {
  id: string
  name: string
  country: string
  flag: string
  process: string
  tastingNotes: string[]
  description: string
  brewTips: string
  /** ids of brew methods this coffee especially shines with */
  bestBrews: string[]
  profile: Profile
}

export interface AnswerEffect {
  /** partial target profile this answer pulls the user toward */
  targets: Partial<Profile>
  /** how strongly this answer weighs on each targeted attribute (default 1) */
  weight?: number
  /** flat score bonus for specific coffees (e.g. brew-method affinity) */
  boosts?: Record<string, number>
}

export interface Option {
  id: string
  label: string
  detail?: string
  emoji: string
  effect: AnswerEffect
}

export interface Question {
  id: string
  prompt: string
  options: Option[]
}

export interface Match {
  coffee: Coffee
  /** 0–100 */
  score: number
}

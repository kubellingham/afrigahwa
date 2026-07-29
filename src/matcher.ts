import { ATTRIBUTES, type Attribute, type Coffee, type Match, type Option } from './types'
import { COFFEES } from './data/coffees'
import { QUESTIONS } from './data/questions'

interface Accumulated {
  weightedSum: number
  totalWeight: number
}

/**
 * Build the user's taste profile from their answers. Each answer pulls the
 * profile toward its target values; answers with higher weight pull harder.
 */
function buildUserProfile(selected: Option[]): {
  profile: Partial<Record<Attribute, number>>
  weights: Partial<Record<Attribute, number>>
} {
  const acc: Partial<Record<Attribute, Accumulated>> = {}

  for (const option of selected) {
    const { targets, weight = 1 } = option.effect
    if (weight === 0) continue
    for (const [attr, value] of Object.entries(targets) as [Attribute, number][]) {
      const entry = (acc[attr] ??= { weightedSum: 0, totalWeight: 0 })
      entry.weightedSum += value * weight
      entry.totalWeight += weight
    }
  }

  const profile: Partial<Record<Attribute, number>> = {}
  const weights: Partial<Record<Attribute, number>> = {}
  for (const attr of ATTRIBUTES) {
    const entry = acc[attr]
    if (entry && entry.totalWeight > 0) {
      profile[attr] = entry.weightedSum / entry.totalWeight
      weights[attr] = entry.totalWeight
    }
  }
  return { profile, weights }
}

function collectBoosts(selected: Option[]): Record<string, number> {
  const boosts: Record<string, number> = {}
  for (const option of selected) {
    for (const [coffeeId, bonus] of Object.entries(option.effect.boosts ?? {})) {
      boosts[coffeeId] = (boosts[coffeeId] ?? 0) + bonus
    }
  }
  return boosts
}

function similarity(
  coffee: Coffee,
  profile: Partial<Record<Attribute, number>>,
  weights: Partial<Record<Attribute, number>>,
): number {
  let weightedDistance = 0
  let totalWeight = 0
  for (const attr of ATTRIBUTES) {
    const target = profile[attr]
    if (target === undefined) continue
    const w = weights[attr] ?? 1
    weightedDistance += Math.abs(coffee.profile[attr] - target) * w
    totalWeight += w
  }
  if (totalWeight === 0) return 50
  // Average per-attribute distance is 0–10; map to 0–100 similarity.
  const avgDistance = weightedDistance / totalWeight
  return Math.max(0, 100 - avgDistance * 10)
}

/** Small bonus when the coffee shines with the user's brew method. */
function brewAffinity(coffee: Coffee, selected: Option[]): number {
  const brewAnswer = selected[QUESTIONS.findIndex((q) => q.id === 'brew')]
  if (!brewAnswer) return 0
  return coffee.bestBrews.includes(brewAnswer.id) ? 4 : 0
}

export function computeMatches(selected: Option[]): Match[] {
  const { profile, weights } = buildUserProfile(selected)
  const boosts = collectBoosts(selected)

  const raw = COFFEES.map((coffee) => ({
    coffee,
    score:
      similarity(coffee, profile, weights) +
      (boosts[coffee.id] ?? 0) +
      brewAffinity(coffee, selected),
  }))

  raw.sort((a, b) => b.score - a.score)

  // Present scores as friendly match percentages: best match maps toward the
  // high 90s while preserving the relative ordering and gaps.
  const top = raw[0].score
  const lift = Math.min(97 - top, 20)
  return raw.map(({ coffee, score }) => ({
    coffee,
    score: Math.round(Math.min(99, Math.max(20, score + Math.max(0, lift)))),
  }))
}

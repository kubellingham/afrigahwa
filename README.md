# Afrigahwa ☕ — the Tanzanian Coffee Matcher

Afrigahwa is a Tanzanian roastery. This web app asks five quick questions
about how you like your cup — flavor direction, acidity, body, milk habits,
and how adventurous you're feeling — then matches you with the Tanzanian
growing region made for your palate.

The catalogue covers six real Tanzanian growing regions: Kilimanjaro, Kigoma,
Mbeya, Mbozi (Songwe), Ruvuma, and Kagera (robusta). Each result comes with
tasting notes, a regional description, brewing advice, a grind selector, and
a WhatsApp button that pre-fills a message asking whether that coffee — or
something similar — is currently in stock.

The whole app is bilingual: an EN/SW toggle in the header switches every
string, question, and coffee description between English and Swahili.

## How matching works

Every coffee carries a flavor profile scored 0–10 across eight attributes
(acidity, body, fruitiness, floral, sweetness, chocolate, earthy, wildness).
Each quiz answer pulls your taste profile toward target values with a weight,
and the matcher ranks coffees by weighted similarity, with a small boost for
milk-friendly coffees when you're a latte drinker. The displayed percentage
amplifies the gap between the winner and the runners-up so the top result
reads as a clear recommendation. See `src/matcher.ts`.

## Configuration

Set the roastery's WhatsApp number in `src/config.ts` (international format,
digits only, e.g. `255712345678`). Until it's set, the WhatsApp button opens
WhatsApp's contact picker with the message pre-filled instead of a direct
chat.

## Running it

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
```

Built with Vite, React, and TypeScript. No backend, no tracking — everything
runs in the browser.

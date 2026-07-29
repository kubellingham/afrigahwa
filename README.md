# Afrigahwa ☕ — the African Coffee Matcher

Africa is where coffee was born, and no two origins taste alike. Afrigahwa is a
small web app that asks you seven quick questions about how you like your cup —
flavor direction, acidity, body, sweetness, milk habits, brew method, and how
adventurous you're feeling — then matches you with the African coffee origin
made for your palate.

The catalogue spans ten origins across the continent, from Ethiopia's floral
Yirgacheffe and wild Harrar to Kenya AA, Rwanda Red Bourbon, Burundi Kayanza,
Tanzania Peaberry, Uganda Bugisu, DR Congo Kivu, Cameroon Boyo, and Malawi
Mzuzu. Each result comes with tasting notes, an origin story, a match
percentage, brewing advice, and two runners-up worth a cup.

## How matching works

Every coffee carries a flavor profile scored 0–10 across eight attributes
(acidity, body, fruitiness, floral, sweetness, chocolate, earthy, wildness).
Each quiz answer pulls your taste profile toward target values with a weight,
and the matcher ranks coffees by weighted similarity, with small bonuses for
brew-method affinity (e.g. milk drinkers get nudged toward coffees that stand
up to milk). See `src/matcher.ts`.

## Running it

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
```

Built with Vite, React, and TypeScript. No backend, no tracking — everything
runs in the browser.

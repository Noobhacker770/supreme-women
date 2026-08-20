# A Little Universe — Complete Edition

A handcrafted interactive romantic mini-world built for one person. It contains 18 playable destinations, persistent collectibles, a hidden finale, responsive layouts, generated sound effects, character animation, and a data-driven progression system.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Base directory: empty
- `netlify.toml` and `public/_redirects` are included.

## Personalize

Edit `CONFIG` near the top of `src/main.tsx`.

- `HER_NAME`
- `YOUR_NAME`
- `NICKNAME`
- `GREETING`
- `FINAL_MESSAGE`

## Interaction contract

Every atlas destination is playable immediately. Each room has:

- a real interaction loop
- visible progress
- a success condition
- a collectible
- persistent completion
- a working Back button
- a completion celebration
- a Next World action when another world follows
- generated sound effects for interaction/success where enabled

There is also a visible safety completion action in every room so no interaction can dead-end the experience.

## The 18 worlds

1. Anger Room — 12 cartoon bonks
2. Strawberry Café — sequence recipe
3. Cherry Blossom Garden — grow five flowers
4. Cloud Kingdom — catch ten stars
5. Cozy Room — find six hidden objects
6. Neon Arcade — hit twelve moving targets
7. Wardrobe — build a visible outfit from six clothing layers
8. Midnight Carnival — spin three times
9. Magic Music Box — listen and repeat a six-note melody
10. Chocolate Atelier — design and submit a chocolate
11. Tiny Pet Society — six care actions
12. Spotlight — six-beat dance sequence
13. Mystery House — four riddles
14. Compliment Laboratory — three experiments
15. Forbidden Button — fifteen presses
16. Official Quiz — three questions
17. Achievement Castle — place five artifacts
18. Moonlight Observatory — connect eight stars

The hidden final room becomes available only after all 18 worlds have been completed.

## QA note

The project is source-complete and structured for Netlify/Vite. Network restrictions in the build environment prevented a full `npm install`, so dependency installation and the final production bundle must be verified by Netlify's build runner.

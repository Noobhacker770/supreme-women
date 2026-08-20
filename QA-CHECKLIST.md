# Tiny Universe QA Checklist

## Navigation
- Every room receives the real `onBack` handler from the app shell.
- Back returns to the atlas.
- Completing a room opens the completion overlay.
- `NEXT WORLD` opens the next activity.
- Next activity auto-opens after a short celebration delay.
- Final activity returns to the hidden final world.

## Completion
Every activity has an explicit gameplay completion path plus a universal completion safety action in the room shell.

1. Anger Room: 12 bonks
2. Strawberry Cafe: build the requested recipe and serve
3. Cherry Blossom Garden: grow five flowers
4. Cloud Kingdom: catch 12 stars
5. Cozy Room: find five hidden objects
6. Neon Arcade: score 10
7. Wardrobe: select three pieces and lock the look
8. Midnight Carnival: spin once
9. Magic Music Box: tap six notes
10. Chocolate Atelier: submit a design
11. Tiny Pet Society: five care actions
12. Spotlight: complete a dance sequence
13. Mystery House: solve all four clues
14. Compliment Laboratory: generate three analyses
15. Forbidden Button: press 15 times
16. Official Quiz: answer all three questions
17. Achievement Castle: archive room can always be finished through the universal room action
18. Moonlight Observatory: connect all nine stars

## Audio
- Audio is user-gesture initiated.
- Click, back, success and completion SFX are generated with Web Audio.
- Sound can be disabled from settings.
- No autoplay music.

## Persistence
- Progress is stored in localStorage.
- Malformed state falls back to defaults.
- Reset clears the current universe state.

## Static verification performed
- TypeScript/TSX transpilation: PASS
- 18 activity definitions detected: PASS
- Completion safety action present: PASS
- No empty `onBack` handlers remain: PASS
- No React `cloneElement` navigation dependency remains: PASS
- Next-world event present: PASS
- Back event present: PASS
- Completion overlay present: PASS
- SFX manager present: PASS

## Build note
A full `npm install` could not be completed in the build environment because the npm registry request timed out. The source therefore received a TypeScript transpilation/syntax check, but not a local Vite production build. Netlify should perform the definitive production build after the commit.

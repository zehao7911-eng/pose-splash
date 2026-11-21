# POSE SPLASH

An original Three.js poolside pose show, inspired by the user-approved Hole in the Wall concept. Original characters, resort, UI, animation, geometry and synthesized sound effects. No Roblox assets, source code, trademarks or accounts are included or required.

## Play

Open `index.html` or `standalone.html`. Three.js is embedded. Keep assets/beach-bum.mp3 beside index.html; standalone.html embeds the music too. The game is designed for portrait screens. Drag the scene left/right and choose TALL, STAR or DUCK. Openings gently assist alignment when the player releases near them. Three splashes end a show; surviving unlocks the next show and suit. Six authored shows contain 54 walls. Completing the tour unlocks endless Encore. Medals, selected suit, best score and optional cosmetic claims persist.

Desktop: A/D or arrow keys move, 1/2/3 choose poses, Escape pauses. Audio unlocks after a player gesture. Backgrounding pauses a round. Reload restarts the current show; completed-show progress remains saved.

## Build

`node build.cjs` compiles source modules into both standalone entries. `node tests.mjs` checks gameplay rules; `node sdk-tests.mjs` runs host adapter mocks.

## GameWave

Game startup does not depend on `window.neonlib`. Actual show start/end events invoke available lifecycle methods once. This game's profile alone is saved in a `pose-splash` v1 envelope. Local key: `pose-splash-profile-v1`. Cloud merges preserve best medals, best score and claimed cosmetics, retaining local sound/suit selection. Confirmed positive like/direct-comment callbacks unlock golden/aqua celebratory particles once per saved scope. These are optional; the prompt is shown in the wardrobe only when supported. Failed, late and partial SDK implementations are tolerated and asynchronous registrations cleaned up. No unrelated saves are read or uploaded.

Official GameWave document was inspected on 2026-11-21 and showed the October 30 revision. Mock checks are not actual GameWave App import/callback certification. Physical mobile-device testing remains pending.

## Reference evidence

Roblox reference: https://www.roblox.com/games/11970456/Hole-in-the-Wall . The public page and play entry were inspected. The entry requested login; hands-on Roblox gameplay was not completed or claimed. This is an authored adaptation of the approved idea, not a port or exact recreation.

## Dependency license

Three.js r147: MIT, see `vendor/THREE-LICENSE.txt`. Visuals and sound effects are authored in code. Music: Beach Bum by Kevin MacLeod, CC BY 4.0, see CREDITS.txt. Music starts on interaction and pauses with the game.

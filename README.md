# GraphicX // TIC-TAC-TOE

A futuristic, dark cyber-aesthetic Tic-Tac-Toe web game built with React, Vite, and CSS-first cyber styling.

![GraphicX Dark Cyber Theme](https://img.shields.io/badge/GraphicX-Cyber%20HUD-00F5FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)

---

## 🚀 Features

- **Dark Cyber Visual Identity**:
  - Deep space black background (`#05070D`) with subtle neon grid matrix.
  - Player X in high-tech Laser Cyan (`#00F5FF`), Player O in Quantum Purple (`#A855F7`).
  - Animated SVG symbols with laser-stroke entrance effects.
  - Glowing laser strike-through line dynamically rendered on winning rows, columns, and diagonals.
  - Cyber confetti celebration on victory.
- **Game Modes**:
  - **Single Player vs Cyber AI**: Choose from 3 neural levels:
    - *Cadet (Easy)*: Casual play with random + basic moves.
    - *Tactical (Medium)*: Smart attacks, defensive blocks, and center control.
    - *Unbeatable (Hard)*: Optimal Minimax algorithm (impossible to defeat).
  - **Pass & Play (Local 2-Player)**: Traditional head-to-head turn alternation.
- **Synthesized Web Audio FX**:
  - Zero external sound files — real-time oscillator sound synthesis for moves, victory arpeggios, stalemate buzzers, and UI clicks.
  - Mute/Unmute audio toggle with `localStorage` persistence.
- **Cyber HUD Scoreboard**:
  - Tracks Player X wins, Player O/AI wins, and draws.
  - Persistent across page reloads using `localStorage`.
  - Win streak counter with animated flame badges.
- **Controls & Accessibility**:
  - Full keyboard accessibility: **1–9** or **Numpad 1–9** to place moves, **R** to reboot round.
  - Screen-reader friendly ARIA labels and `prefers-reduced-motion` compliance.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Automated Tests
```bash
npm test
```

---

## 🕹️ Keyboard Controls

| Key | Action |
| --- | --- |
| `1` – `9` / `Numpad 1–9` | Select Grid Cell |
| `R` | Reboot New Round |
| `Space` / `Enter` | Trigger Focused Cell or Button |

---

## ⚡ Built by GraphicX
GraphicX Protocol 2026.


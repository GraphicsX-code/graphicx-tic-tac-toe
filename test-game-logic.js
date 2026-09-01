import {
  checkWinner,
  isBoardFull,
  getBestMove,
  getHintMove,
  getWinningLines,
  getDefaultWinLength,
} from './src/utils/gameLogic.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`✓ PASS: ${message}`);
  } else {
    failed++;
    console.error(`✗ FAIL: ${message}`);
  }
}

console.log('--- Testing GraphicX Upgraded Game Engine (3x3, 4x4, 5x5) ---');

// 1. Test 3x3 Winning Combinations
const lines3x3 = getWinningLines(3, 3);
assert(lines3x3.length === 8, `3x3 generates 8 winning lines (got ${lines3x3.length})`);

lines3x3.forEach((combo, idx) => {
  const board = Array(9).fill(null);
  combo.line.forEach((cell) => {
    board[cell] = 'X';
  });
  const result = checkWinner(board, 3, 3);
  assert(result !== null && result.winner === 'X', `3x3: Detects win for combo ${idx} (${combo.type})`);
});

// 2. Test 4x4 Winning Combinations (4 in a row = 10 lines)
const lines4x4 = getWinningLines(4, 4);
assert(lines4x4.length === 10, `4x4 generates 10 winning lines (got ${lines4x4.length})`);

lines4x4.forEach((combo, idx) => {
  const board = Array(16).fill(null);
  combo.line.forEach((cell) => {
    board[cell] = 'O';
  });
  const result = checkWinner(board, 4, 4);
  assert(result !== null && result.winner === 'O', `4x4: Detects win for combo ${idx} (${combo.type})`);
});

// 3. Test 5x5 Winning Combinations (4 in a row = 28 lines)
const lines5x5 = getWinningLines(5, 4);
assert(lines5x5.length === 28, `5x5 generates 28 winning lines of length 4 (got ${lines5x5.length})`);

// 4. Test Draw Condition on 3x3
const drawBoard = [
  'X', 'O', 'X',
  'X', 'O', 'O',
  'O', 'X', 'X'
];
assert(isBoardFull(drawBoard), '3x3: Detects full board');
assert(checkWinner(drawBoard, 3, 3) === null, '3x3: Detects draw when no 3-in-a-row');

// 5. Test AI Immediate Win & Block on 3x3
const aiWinBoard = [
  'O', 'O', null,
  'X', 'X', null,
  null, null, null
];
const winMove = getBestMove(aiWinBoard, 'O', 'hard', 3, 3);
assert(winMove === 2, `3x3: AI takes immediate winning move at index 2 (got ${winMove})`);

const aiBlockBoard = [
  'X', 'X', null,
  'O', null, null,
  null, null, null
];
const blockMove = getBestMove(aiBlockBoard, 'O', 'hard', 3, 3);
assert(blockMove === 2, `3x3: AI blocks human win at index 2 (got ${blockMove})`);

// 6. Test Hint Generator
const hint = getHintMove(aiBlockBoard, 'O', 3, 3);
assert(hint === 2, `Hint Generator recommends blocking cell at index 2 (got ${hint})`);

// 7. Test 4x4 AI Move Generation
const board4x4 = Array(16).fill(null);
board4x4[0] = 'X';
board4x4[1] = 'X';
board4x4[2] = 'X';
const block4x4 = getBestMove(board4x4, 'O', 'hard', 4, 4);
assert(block4x4 === 3, `4x4: AI blocks 4-in-a-row threat at index 3 (got ${block4x4})`);

// 8. Test 100 Simulations: 3x3 Minimax AI never loses
console.log('--- Running 100 Simulations: Minimax AI (O) vs Random Player (X) ---');
let aiWins = 0;
let draws = 0;
let humanWins = 0;

for (let sim = 0; sim < 100; sim++) {
  const simBoard = Array(9).fill(null);
  let turn = 'X';

  while (!checkWinner(simBoard, 3, 3) && !isBoardFull(simBoard)) {
    if (turn === 'X') {
      const avail = [];
      simBoard.forEach((val, i) => { if (val === null) avail.push(i); });
      const randomMove = avail[Math.floor(Math.random() * avail.length)];
      simBoard[randomMove] = 'X';
      turn = 'O';
    } else {
      const move = getBestMove(simBoard, 'O', 'hard', 3, 3);
      simBoard[move] = 'O';
      turn = 'X';
    }
  }

  const win = checkWinner(simBoard, 3, 3);
  if (win) {
    if (win.winner === 'O') aiWins++;
    else humanWins++;
  } else {
    draws++;
  }
}

console.log(`Simulation Results -> AI Wins: ${aiWins}, Draws: ${draws}, Human Wins: ${humanWins}`);
assert(humanWins === 0, 'Unbeatable Minimax NEVER loses against random player');

console.log(`\n========================================`);
console.log(`Total Passed: ${passed}, Failed: ${failed}`);
if (failed > 0) process.exit(1);

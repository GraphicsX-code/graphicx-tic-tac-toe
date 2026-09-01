/**
 * GraphicX Multi-Grid Tactical Game Logic Engine
 * Supports 3x3, 4x4, and 5x5 grid dimensions with dynamic win lengths.
 */

// Cache for generated winning combinations by key "gridSize_winLength"
const winningLinesCache = {};

/**
 * Returns default win length for a given grid dimension.
 * 3x3 -> 3
 * 4x4 -> 4
 * 5x5 -> 4 (Standard fast tactical Gomoku/Tic-Tac-Toe rule)
 */
export function getDefaultWinLength(gridSize = 3) {
  if (gridSize === 3) return 3;
  if (gridSize === 4) return 4;
  if (gridSize === 5) return 4;
  return 3;
}

/**
 * Dynamically generates all winning lines for an NxN grid requiring K in a row.
 * @param {number} gridSize - 3, 4, or 5
 * @param {number} winLength - 3, 4, or 5
 */
export function getWinningLines(gridSize = 3, winLength = 3) {
  const cacheKey = `${gridSize}_${winLength}`;
  if (winningLinesCache[cacheKey]) {
    return winningLinesCache[cacheKey];
  }

  const lines = [];

  // 1. Horizontal Rows
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c <= gridSize - winLength; c++) {
      const line = [];
      for (let k = 0; k < winLength; k++) {
        line.push(r * gridSize + (c + k));
      }
      lines.push({ line, type: 'row', index: r, startCol: c });
    }
  }

  // 2. Vertical Columns
  for (let c = 0; c < gridSize; c++) {
    for (let r = 0; r <= gridSize - winLength; r++) {
      const line = [];
      for (let k = 0; k < winLength; k++) {
        line.push((r + k) * gridSize + c);
      }
      lines.push({ line, type: 'col', index: c, startRow: r });
    }
  }

  // 3. Diagonal Main (\)
  for (let r = 0; r <= gridSize - winLength; r++) {
    for (let c = 0; c <= gridSize - winLength; c++) {
      const line = [];
      for (let k = 0; k < winLength; k++) {
        line.push((r + k) * gridSize + (c + k));
      }
      lines.push({ line, type: 'diag-main', startRow: r, startCol: c });
    }
  }

  // 4. Diagonal Anti (/)
  for (let r = 0; r <= gridSize - winLength; r++) {
    for (let c = winLength - 1; c < gridSize; c++) {
      const line = [];
      for (let k = 0; k < winLength; k++) {
        line.push((r + k) * gridSize + (c - k));
      }
      lines.push({ line, type: 'diag-anti', startRow: r, startCol: c });
    }
  }

  winningLinesCache[cacheKey] = lines;
  return lines;
}

// 3x3 default static reference
export const WINNING_COMBINATIONS = getWinningLines(3, 3);

/**
 * Checks the board for a winner.
 * @param {Array<string|null>} board
 * @param {number} gridSize
 * @param {number} winLength
 */
export function checkWinner(board, gridSize = 3, winLength = 3) {
  const combos = getWinningLines(gridSize, winLength);
  for (const combo of combos) {
    const firstCell = board[combo.line[0]];
    if (!firstCell) continue;

    let isWin = true;
    for (let i = 1; i < combo.line.length; i++) {
      if (board[combo.line[i]] !== firstCell) {
        isWin = false;
        break;
      }
    }

    if (isWin) {
      return {
        winner: firstCell,
        line: combo.line,
        type: combo.type,
        index: combo.index ?? 0,
        startRow: combo.startRow ?? 0,
        startCol: combo.startCol ?? 0,
      };
    }
  }
  return null;
}

/**
 * Checks if the board is completely filled.
 */
export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

/**
 * Returns an array of available cell indices
 */
export function getAvailableMoves(board) {
  const moves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

/**
 * Evaluates line threats for tactical AI / Hint solver.
 */
function findLineThreatMove(board, player, gridSize, winLength, neededCount) {
  const combos = getWinningLines(gridSize, winLength);
  for (const combo of combos) {
    const values = combo.line.map((idx) => board[idx]);
    const playerCount = values.filter((v) => v === player).length;
    const emptyCount = values.filter((v) => v === null).length;

    if (playerCount === neededCount && emptyCount === winLength - neededCount) {
      const emptyIdx = combo.line.find((idx) => board[idx] === null);
      if (emptyIdx !== undefined) return emptyIdx;
    }
  }
  return null;
}

/**
 * 3x3 Minimax algorithm
 */
function minimax3x3(tempBoard, depth, isMaximizing, aiPlayer, humanPlayer) {
  const winResult = checkWinner(tempBoard, 3, 3);
  if (winResult) {
    if (winResult.winner === aiPlayer) return 10 - depth;
    if (winResult.winner === humanPlayer) return depth - 10;
  }
  if (isBoardFull(tempBoard)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < tempBoard.length; i++) {
      if (tempBoard[i] === null) {
        tempBoard[i] = aiPlayer;
        const score = minimax3x3(tempBoard, depth + 1, false, aiPlayer, humanPlayer);
        tempBoard[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < tempBoard.length; i++) {
      if (tempBoard[i] === null) {
        tempBoard[i] = humanPlayer;
        const score = minimax3x3(tempBoard, depth + 1, true, aiPlayer, humanPlayer);
        tempBoard[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

/**
 * Heuristic Board Scorer for 4x4 and 5x5 boards
 */
function evaluateNxNBoard(board, aiPlayer, humanPlayer, gridSize, winLength) {
  const win = checkWinner(board, gridSize, winLength);
  if (win) {
    if (win.winner === aiPlayer) return 10000;
    if (win.winner === humanPlayer) return -10000;
  }

  let score = 0;
  const combos = getWinningLines(gridSize, winLength);

  for (const combo of combos) {
    let aiCount = 0;
    let humanCount = 0;

    for (const idx of combo.line) {
      if (board[idx] === aiPlayer) aiCount++;
      else if (board[idx] === humanPlayer) humanCount++;
    }

    if (aiCount > 0 && humanCount > 0) continue; // Blocked line

    if (aiCount > 0) {
      score += Math.pow(10, aiCount);
    } else if (humanCount > 0) {
      score -= Math.pow(10, humanCount);
    }
  }

  return score;
}

/**
 * Fast Alpha-Beta Search for larger boards (4x4, 5x5)
 */
function alphaBeta(board, depth, alpha, beta, isMaximizing, aiPlayer, humanPlayer, gridSize, winLength) {
  const win = checkWinner(board, gridSize, winLength);
  if (win) {
    return win.winner === aiPlayer ? 10000 - depth * 10 : -10000 + depth * 10;
  }
  if (depth >= 3 || isBoardFull(board)) {
    return evaluateNxNBoard(board, aiPlayer, humanPlayer, gridSize, winLength);
  }

  const availableMoves = getAvailableMoves(board);

  // Sort moves prioritizing center
  const center = (gridSize * gridSize - 1) / 2;
  availableMoves.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of availableMoves) {
      board[move] = aiPlayer;
      const evaluation = alphaBeta(board, depth + 1, alpha, beta, false, aiPlayer, humanPlayer, gridSize, winLength);
      board[move] = null;
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of availableMoves) {
      board[move] = humanPlayer;
      const evaluation = alphaBeta(board, depth + 1, alpha, beta, true, aiPlayer, humanPlayer, gridSize, winLength);
      board[move] = null;
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

/**
 * Determines the best AI move for any board size and difficulty.
 */
export function getBestMove(board, aiPlayer = 'O', difficulty = 'hard', gridSize = 3, winLength = 3) {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return -1;

  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';

  // 1. Easy Mode (Cadet)
  if (difficulty === 'easy') {
    if (Math.random() < 0.3) {
      const winMove = findLineThreatMove(board, aiPlayer, gridSize, winLength, winLength - 1);
      if (winMove !== null) return winMove;
    }
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  // 2. Medium Mode (Tactical)
  if (difficulty === 'medium') {
    const winMove = findLineThreatMove(board, aiPlayer, gridSize, winLength, winLength - 1);
    if (winMove !== null) return winMove;

    const blockMove = findLineThreatMove(board, humanPlayer, gridSize, winLength, winLength - 1);
    if (blockMove !== null) return blockMove;

    // Center preference
    const centerIdx = Math.floor((gridSize * gridSize) / 2);
    if (board[centerIdx] === null && Math.random() < 0.6) {
      return centerIdx;
    }

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  // 3. Hard Mode (Unbeatable / Master)
  // Immediate win
  const immediateWin = findLineThreatMove(board, aiPlayer, gridSize, winLength, winLength - 1);
  if (immediateWin !== null) return immediateWin;

  // Immediate block
  const immediateBlock = findLineThreatMove(board, humanPlayer, gridSize, winLength, winLength - 1);
  if (immediateBlock !== null) return immediateBlock;

  // If 3x3, use full Minimax
  if (gridSize === 3 && winLength === 3) {
    if (availableMoves.length === 9) {
      const openings = [0, 2, 4, 6, 8];
      return openings[Math.floor(Math.random() * openings.length)];
    }

    let bestScore = -Infinity;
    let bestMove = availableMoves[0];

    for (const move of availableMoves) {
      board[move] = aiPlayer;
      const score = minimax3x3(board, 0, false, aiPlayer, humanPlayer);
      board[move] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  // If 4x4 or 5x5, use Alpha-Beta with depth limits
  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (const move of availableMoves) {
    board[move] = aiPlayer;
    const score = alphaBeta(board, 0, -Infinity, Infinity, false, aiPlayer, humanPlayer, gridSize, winLength);
    board[move] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

/**
 * Generates an optimal hint move for a player.
 */
export function getHintMove(board, player, gridSize = 3, winLength = 3) {
  return getBestMove(board, player, 'hard', gridSize, winLength);
}

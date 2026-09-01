import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  checkWinner,
  isBoardFull,
  getBestMove,
  getHintMove,
  getDefaultWinLength,
} from '../utils/gameLogic';
import { cyberAudio } from '../utils/cyberAudio';

const STORAGE_KEY_SCORES = 'graphicx_ttt_scores_v2';
const STORAGE_KEY_SOUND = 'graphicx_ttt_sound_v2';
const STORAGE_KEY_DIFFICULTY = 'graphicx_ttt_difficulty_v2';
const STORAGE_KEY_MODE = 'graphicx_ttt_mode_v2';
const STORAGE_KEY_THEME = 'graphicx_ttt_theme_v2';
const STORAGE_KEY_COLOR_MODE = 'graphicx_ttt_colormode_v2';
const STORAGE_KEY_GRID_SIZE = 'graphicx_ttt_gridsize_v2';
const STORAGE_KEY_SERIES = 'graphicx_ttt_series_v2';
const STORAGE_KEY_TIMER = 'graphicx_ttt_timer_v2';
const STORAGE_KEY_PLAYERS = 'graphicx_ttt_players_v2';
const STORAGE_KEY_HISTORY = 'graphicx_ttt_history_v2';
const STORAGE_KEY_STATS = 'graphicx_ttt_stats_v2';

export const AVATAR_OPTIONS = [
  { id: 'samurai', name: 'Cyber Samurai', icon: '⚔️' },
  { id: 'bot', name: 'Nexus AI', icon: '🤖' },
  { id: 'fox', name: 'Neon Fox', icon: '🦊' },
  { id: 'hunter', name: 'Glitch Hunter', icon: '🎯' },
  { id: 'ghost', name: 'Quantum Ghost', icon: '👻' },
  { id: 'hacker', name: 'Cipher Hacker', icon: '⚡' },
  { id: 'titan', name: 'Synth Titan', icon: '🛡️' },
  { id: 'dragon', name: 'Matrix Dragon', icon: '🐉' },
];

export const COLOR_OPTIONS = [
  '#00F5FF', // Laser Cyan
  '#A855F7', // Quantum Purple
  '#FF2E93', // Neon Magenta
  '#39FF88', // Acid Emerald
  '#FFB703', // Cyber Amber
  '#38BDF8', // Ice Blue
  '#EF4444', // Arcade Red
  '#F43F5E', // Rose Glow
];

export function useGame() {
  // Theme & Color Mode
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_THEME) || 'cyberpunk';
    } catch {
      return 'cyberpunk';
    }
  });

  const [colorMode, setColorModeState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_COLOR_MODE) || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Apply theme & colorMode to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', colorMode);
    try {
      localStorage.setItem(STORAGE_KEY_COLOR_MODE, colorMode);
    } catch {}
  }, [colorMode]);

  // Sound
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SOUND);
      return stored !== null ? stored === 'true' : true;
    } catch {
      return true;
    }
  });

  // Game Mode: 'ai' or '2p'
  const [gameMode, setGameModeState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_MODE) || 'ai';
    } catch {
      return 'ai';
    }
  });

  // AI Difficulty: 'easy', 'medium', 'hard'
  const [aiDifficulty, setAiDifficultyState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_DIFFICULTY) || 'hard';
    } catch {
      return 'hard';
    }
  });

  // Board Size (3, 4, 5)
  const [gridSize, setGridSizeState] = useState(() => {
    try {
      return parseInt(localStorage.getItem(STORAGE_KEY_GRID_SIZE) || '3', 10);
    } catch {
      return 3;
    }
  });

  const winLength = getDefaultWinLength(gridSize);

  // Series Mode ('single', 'bo3', 'bo5')
  const [seriesMode, setSeriesModeState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_SERIES) || 'single';
    } catch {
      return 'single';
    }
  });

  // Timer per move in seconds (0 = Off, 5, 10, 15, 30)
  const [timerOption, setTimerOptionState] = useState(() => {
    try {
      return parseInt(localStorage.getItem(STORAGE_KEY_TIMER) || '0', 10);
    } catch {
      return 0;
    }
  });

  // Players Profile
  const [player1, setPlayer1State] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PLAYERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.p1 || { name: 'Player 1', avatar: 'samurai', marker: 'X', color: '#00F5FF' };
      }
    } catch {}
    return { name: 'Player 1', avatar: 'samurai', marker: 'X', color: '#00F5FF' };
  });

  const [player2, setPlayer2State] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PLAYERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.p2 || { name: 'Cyber AI', avatar: 'bot', marker: 'O', color: '#A855F7' };
      }
    } catch {}
    return { name: 'Cyber AI', avatar: 'bot', marker: 'O', color: '#A855F7' };
  });

  // Game Active Flow & Arena state
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(() => Array(gridSize * gridSize).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Match Series Scores (per current series)
  const [seriesScores, setSeriesScores] = useState({ p1: 0, p2: 0, draws: 0 });
  const [seriesChampion, setSeriesChampion] = useState(null); // 'p1' | 'p2' | null
  const [roundNumber, setRoundNumber] = useState(1);

  // Move History for Undo & Replays
  const [moveHistory, setMoveHistory] = useState([]); // array of { index, player, boardSnapshot, timestamp }
  const [roundStartTime, setRoundStartTime] = useState(Date.now());
  const [activeHintCell, setActiveHintCell] = useState(null);
  const [invalidMoveIndex, setInvalidMoveIndex] = useState(null);

  // Move Timer Countdown
  const [timeRemaining, setTimeRemaining] = useState(timerOption);

  // Match History & Lifetime Statistics
  const [matchHistory, setMatchHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [stats, setStats] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_STATS);
      return stored
        ? JSON.parse(stored)
        : {
            totalGames: 0,
            p1Wins: 0,
            p2Wins: 0,
            draws: 0,
            winRate: 0,
            currentStreak: 0,
            maxStreak: 0,
            fastestWinSeconds: null,
          };
    } catch {
      return {
        totalGames: 0,
        p1Wins: 0,
        p2Wins: 0,
        draws: 0,
        winRate: 0,
        currentStreak: 0,
        maxStreak: 0,
        fastestWinSeconds: null,
      };
    }
  });

  // Modal Views
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [activeReplayMatch, setActiveReplayMatch] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  // Persistence Effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SOUND, String(soundEnabled));
      localStorage.setItem(STORAGE_KEY_MODE, gameMode);
      localStorage.setItem(STORAGE_KEY_DIFFICULTY, aiDifficulty);
      localStorage.setItem(STORAGE_KEY_GRID_SIZE, String(gridSize));
      localStorage.setItem(STORAGE_KEY_SERIES, seriesMode);
      localStorage.setItem(STORAGE_KEY_TIMER, String(timerOption));
      localStorage.setItem(STORAGE_KEY_PLAYERS, JSON.stringify({ p1: player1, p2: player2 }));
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(matchHistory));
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
    } catch {}
  }, [soundEnabled, gameMode, aiDifficulty, gridSize, seriesMode, timerOption, player1, player2, matchHistory, stats]);

  // Adjust board when gridSize changes
  useEffect(() => {
    setBoard(Array(gridSize * gridSize).fill(null));
    setWinnerInfo(null);
    setIsDraw(false);
    setMoveHistory([]);
  }, [gridSize]);

  // Move Timer Effect
  useEffect(() => {
    if (!gameStarted || winnerInfo || isDraw || isAiThinking || timerOption === 0) {
      return;
    }

    setTimeRemaining(timerOption);
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timer ran out! Auto-play random available move
          cyberAudio.playInvalid(soundEnabled);
          const available = [];
          board.forEach((cell, idx) => {
            if (cell === null) available.push(idx);
          });
          if (available.length > 0) {
            const randomMove = available[Math.floor(Math.random() * available.length)];
            makeMove(randomMove, currentPlayer);
          }
          return timerOption;
        }

        if (prev <= 4) {
          cyberAudio.playTimerTick(soundEnabled);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, winnerInfo, isDraw, isAiThinking, timerOption, currentPlayer, board]);

  // Series Target Wins
  const seriesTargetWins = seriesMode === 'bo3' ? 2 : seriesMode === 'bo5' ? 3 : 1;

  // Trigger Victory Celebrations
  const triggerCelebration = useCallback((winnerMarker) => {
    const isP1 = winnerMarker === player1.marker;
    const primaryColor = isP1 ? player1.color : player2.color;
    confetti({
      particleCount: 85,
      spread: 90,
      origin: { y: 0.6 },
      colors: [primaryColor, '#39FF88', '#F5F7FF'],
      disableForReducedMotion: true,
    });
  }, [player1, player2]);

  // Record completed match into stats and history
  const recordMatchOutcome = useCallback(
    (winnerMarker, winningCombo, currentMoves, finalBoard) => {
      const durationSeconds = Math.max(1, Math.round((Date.now() - roundStartTime) / 1000));
      const isP1Win = winnerMarker === player1.marker;
      const isP2Win = winnerMarker === player2.marker;
      const isDrawResult = !winnerMarker;

      const matchRecord = {
        id: `match_${Date.now()}`,
        timestamp: Date.now(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        gridSize,
        winLength,
        gameMode,
        aiDifficulty,
        p1Name: player1.name,
        p1Avatar: player1.avatar,
        p1Marker: player1.marker,
        p1Color: player1.color,
        p2Name: gameMode === 'ai' ? `Cyber AI (${aiDifficulty.toUpperCase()})` : player2.name,
        p2Avatar: player2.avatar,
        p2Marker: player2.marker,
        p2Color: player2.color,
        winner: isP1Win ? 'p1' : isP2Win ? 'p2' : 'draw',
        winnerName: isP1Win ? player1.name : isP2Win ? (gameMode === 'ai' ? 'Cyber AI' : player2.name) : 'Draw',
        movesCount: currentMoves.length,
        durationSeconds,
        moves: currentMoves,
        finalBoard,
        winningLine: winningCombo ? winningCombo.line : null,
      };

      setMatchHistory((prev) => [matchRecord, ...prev.slice(0, 49)]); // Keep latest 50

      // Update Lifetime Stats
      setStats((prev) => {
        const total = prev.totalGames + 1;
        const p1Wins = prev.p1Wins + (isP1Win ? 1 : 0);
        const p2Wins = prev.p2Wins + (isP2Win ? 1 : 0);
        const draws = prev.draws + (isDrawResult ? 1 : 0);
        const winRate = Math.round((p1Wins / total) * 100);

        let currentStreak = isP1Win ? (prev.currentStreak >= 0 ? prev.currentStreak + 1 : 1) : isP2Win ? -1 : 0;
        let maxStreak = Math.max(prev.maxStreak, isP1Win ? currentStreak : prev.maxStreak);

        let fastestWinSeconds = prev.fastestWinSeconds;
        if (isP1Win) {
          fastestWinSeconds = prev.fastestWinSeconds ? Math.min(prev.fastestWinSeconds, durationSeconds) : durationSeconds;
        }

        return {
          totalGames: total,
          p1Wins,
          p2Wins,
          draws,
          winRate,
          currentStreak,
          maxStreak,
          fastestWinSeconds,
        };
      });

      // Update Series Scores
      setSeriesScores((prev) => {
        const newScores = {
          ...prev,
          p1: prev.p1 + (isP1Win ? 1 : 0),
          p2: prev.p2 + (isP2Win ? 1 : 0),
          draws: prev.draws + (isDrawResult ? 1 : 0),
        };

        if (newScores.p1 >= seriesTargetWins) {
          setSeriesChampion('p1');
          cyberAudio.playSeriesWin(soundEnabled);
        } else if (newScores.p2 >= seriesTargetWins) {
          setSeriesChampion('p2');
          cyberAudio.playSeriesWin(soundEnabled);
        }

        return newScores;
      });

      // Open match summary modal after slight delay
      setTimeout(() => {
        setIsSummaryOpen(true);
      }, 700);
    },
    [roundStartTime, gridSize, winLength, gameMode, aiDifficulty, player1, player2, seriesTargetWins, soundEnabled]
  );

  // Core Move Handler
  const makeMove = useCallback(
    (index, playerMarker) => {
      setBoard((prevBoard) => {
        if (prevBoard[index] !== null || winnerInfo || isDraw) {
          return prevBoard;
        }

        const newBoard = [...prevBoard];
        newBoard[index] = playerMarker;

        const moveEntry = {
          index,
          player: playerMarker,
          boardSnapshot: [...newBoard],
          timestamp: Date.now(),
        };

        const updatedMoves = [...moveHistory, moveEntry];
        setMoveHistory(updatedMoves);
        setActiveHintCell(null);

        // Sound effect
        if (playerMarker === 'X') {
          cyberAudio.playMoveX(soundEnabled);
        } else {
          cyberAudio.playMoveO(soundEnabled);
        }

        // Check for Win
        const win = checkWinner(newBoard, gridSize, winLength);
        if (win) {
          setWinnerInfo(win);
          cyberAudio.playWin(soundEnabled);
          triggerCelebration(win.winner);
          recordMatchOutcome(win.winner, win, updatedMoves, newBoard);
          return newBoard;
        }

        // Check for Draw
        if (isBoardFull(newBoard)) {
          setIsDraw(true);
          cyberAudio.playDraw(soundEnabled);
          recordMatchOutcome(null, null, updatedMoves, newBoard);
          return newBoard;
        }

        // Switch Turn & reset timer
        setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
        setTimeRemaining(timerOption);

        return newBoard;
      });
    },
    [winnerInfo, isDraw, moveHistory, soundEnabled, gridSize, winLength, timerOption, triggerCelebration, recordMatchOutcome]
  );

  // Cell Click from UI
  const handleCellClick = useCallback(
    (index) => {
      if (winnerInfo || isDraw || isAiThinking) return;

      if (board[index] !== null) {
        // Invalid move feedback shake
        cyberAudio.playInvalid(soundEnabled);
        setInvalidMoveIndex(index);
        setTimeout(() => setInvalidMoveIndex(null), 400);
        return;
      }

      const humanMarker = player1.marker;
      if (gameMode === 'ai' && currentPlayer !== humanMarker) {
        return; // Await AI turn
      }

      makeMove(index, currentPlayer);
    },
    [board, currentPlayer, winnerInfo, isDraw, isAiThinking, gameMode, player1.marker, soundEnabled, makeMove]
  );

  // Trigger Tactical Hint
  const triggerHint = useCallback(() => {
    if (winnerInfo || isDraw || isAiThinking) return;
    cyberAudio.playHint(soundEnabled);
    const hintIdx = getHintMove(board, currentPlayer, gridSize, winLength);
    if (hintIdx !== -1) {
      setActiveHintCell(hintIdx);
      setTimeout(() => setActiveHintCell(null), 2500);
    }
  }, [board, currentPlayer, gridSize, winLength, winnerInfo, isDraw, isAiThinking, soundEnabled]);

  // Undo Last Move
  const undoLastMove = useCallback(() => {
    if (moveHistory.length === 0 || winnerInfo || isDraw || isAiThinking) return;

    cyberAudio.playUndo(soundEnabled);

    // If vs AI, undo both the AI's move and the player's last move (2 moves)
    const undoCount = gameMode === 'ai' && moveHistory.length >= 2 ? 2 : 1;
    const remainingMoves = moveHistory.slice(0, moveHistory.length - undoCount);

    const newBoard = Array(gridSize * gridSize).fill(null);
    remainingMoves.forEach((m) => {
      newBoard[m.index] = m.player;
    });

    setBoard(newBoard);
    setMoveHistory(remainingMoves);
    setActiveHintCell(null);

    // Determine current player
    if (remainingMoves.length === 0) {
      setCurrentPlayer(player1.marker);
    } else {
      const lastMove = remainingMoves[remainingMoves.length - 1];
      setCurrentPlayer(lastMove.player === 'X' ? 'O' : 'X');
    }

    setTimeRemaining(timerOption);
  }, [moveHistory, winnerInfo, isDraw, isAiThinking, gameMode, gridSize, player1.marker, timerOption, soundEnabled]);

  // AI Turn Loop
  useEffect(() => {
    if (!gameStarted || gameMode !== 'ai') return;
    const aiMarker = player2.marker;
    if (currentPlayer !== aiMarker) return;
    if (winnerInfo || isDraw) return;

    setIsAiThinking(true);

    const timer = setTimeout(() => {
      const bestMoveIndex = getBestMove(board, aiMarker, aiDifficulty, gridSize, winLength);
      if (bestMoveIndex !== -1 && board[bestMoveIndex] === null) {
        makeMove(bestMoveIndex, aiMarker);
      }
      setIsAiThinking(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [board, currentPlayer, gameMode, aiDifficulty, gridSize, winLength, winnerInfo, isDraw, player2.marker, gameStarted, makeMove]);

  // Start New Round (preserves current series scores)
  const resetRound = useCallback(() => {
    cyberAudio.playRestart(soundEnabled);
    setBoard(Array(gridSize * gridSize).fill(null));
    setWinnerInfo(null);
    setIsDraw(false);
    setIsAiThinking(false);
    setMoveHistory([]);
    setActiveHintCell(null);
    setCurrentPlayer(player1.marker);
    setTimeRemaining(timerOption);
    setRoundStartTime(Date.now());
    setRoundNumber((r) => r + 1);
    setIsSummaryOpen(false);
  }, [gridSize, player1.marker, timerOption, soundEnabled]);

  // Rematch (reset current series scores and start fresh series with same players)
  const restartSeries = useCallback(() => {
    cyberAudio.playRestart(soundEnabled);
    setSeriesScores({ p1: 0, p2: 0, draws: 0 });
    setSeriesChampion(null);
    setRoundNumber(1);
    resetRound();
  }, [soundEnabled, resetRound]);

  // Return to Setup / Main Menu
  const returnToSetup = useCallback(() => {
    cyberAudio.playClick(soundEnabled);
    setGameStarted(false);
    setIsSummaryOpen(false);
    setSeriesScores({ p1: 0, p2: 0, draws: 0 });
    setSeriesChampion(null);
  }, [soundEnabled]);

  // Clear All History with confirmation
  const clearHistory = useCallback(() => {
    setConfirmDialog({
      isOpen: true,
      title: 'DELETE MATCH HISTORY?',
      message: 'This will permanently remove all past match logs and replays.',
      onConfirm: () => {
        setMatchHistory([]);
        cyberAudio.playClick(soundEnabled);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      },
    });
  }, [soundEnabled]);

  // Reset Lifetime Stats with confirmation
  const resetAllStats = useCallback(() => {
    setConfirmDialog({
      isOpen: true,
      title: 'RESET ALL STATISTICS?',
      message: 'This will reset your lifetime win/loss record, win streaks, and fastest win time.',
      onConfirm: () => {
        setStats({
          totalGames: 0,
          p1Wins: 0,
          p2Wins: 0,
          draws: 0,
          winRate: 0,
          currentStreak: 0,
          maxStreak: 0,
          fastestWinSeconds: null,
        });
        setSeriesScores({ p1: 0, p2: 0, draws: 0 });
        cyberAudio.playClick(soundEnabled);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      },
    });
  }, [soundEnabled]);

  return {
    // Theme & Mode
    theme,
    setTheme: setThemeState,
    colorMode,
    setColorMode: setColorModeState,
    soundEnabled,
    toggleSound: () => setSoundEnabled((p) => !p),

    // Match Config
    gameMode,
    setGameMode: setGameModeState,
    aiDifficulty,
    setAiDifficulty: setAiDifficultyState,
    gridSize,
    setGridSize: setGridSizeState,
    winLength,
    seriesMode,
    setSeriesMode: setSeriesModeState,
    timerOption,
    setTimerOption: setTimerOptionState,

    // Players
    player1,
    setPlayer1: setPlayer1State,
    player2,
    setPlayer2: setPlayer2State,

    // Game Loop
    gameStarted,
    setGameStarted,
    board,
    currentPlayer,
    winnerInfo,
    isDraw,
    isGameOver: !!winnerInfo || isDraw,
    isAiThinking,
    roundNumber,
    seriesScores,
    seriesTargetWins,
    seriesChampion,
    moveHistory,
    timeRemaining,
    activeHintCell,
    invalidMoveIndex,

    // Stats & History
    matchHistory,
    stats,

    // Actions
    handleCellClick,
    triggerHint,
    undoLastMove,
    resetRound,
    restartSeries,
    returnToSetup,
    clearHistory,
    resetAllStats,

    // Modals
    isSettingsOpen,
    setIsSettingsOpen,
    isHowToPlayOpen,
    setIsHowToPlayOpen,
    isHistoryOpen,
    setIsHistoryOpen,
    isStatsOpen,
    setIsStatsOpen,
    isSummaryOpen,
    setIsSummaryOpen,
    activeReplayMatch,
    setActiveReplayMatch,
    confirmDialog,
    setConfirmDialog,
  };
}

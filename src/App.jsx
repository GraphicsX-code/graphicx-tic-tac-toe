import React, { useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { CyberBackground } from './components/CyberBackground';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { GameStatus } from './components/GameStatus';
import { Board } from './components/Board';
import { Scoreboard } from './components/Scoreboard';
import { GameControls } from './components/GameControls';
import { Footer } from './components/Footer';

// Modals
import { SettingsModal } from './components/Modals/SettingsModal';
import { HowToPlayModal } from './components/Modals/HowToPlayModal';
import { HistoryModal } from './components/Modals/HistoryModal';
import { StatsModal } from './components/Modals/StatsModal';
import { MatchSummaryModal } from './components/Modals/MatchSummaryModal';
import { ReplayModal } from './components/Modals/ReplayModal';
import { ConfirmDialog } from './components/Modals/ConfirmDialog';

export default function App() {
  const {
    // Theme & Mode
    theme,
    setTheme,
    colorMode,
    setColorMode,
    soundEnabled,
    toggleSound,

    // Match Config
    gameMode,
    setGameMode,
    aiDifficulty,
    setAiDifficulty,
    gridSize,
    setGridSize,
    winLength,
    seriesMode,
    setSeriesMode,
    timerOption,
    setTimerOption,

    // Players
    player1,
    setPlayer1,
    player2,
    setPlayer2,

    // Game Loop
    gameStarted,
    setGameStarted,
    board,
    currentPlayer,
    winnerInfo,
    isDraw,
    isGameOver,
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
  } = useGame();

  // Global Keyboard Shortcuts (R = Reboot, U = Undo, H = Hint, Esc = Close Modal)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      // Close modals with Escape
      if (e.key === 'Escape') {
        setIsSettingsOpen(false);
        setIsHowToPlayOpen(false);
        setIsHistoryOpen(false);
        setIsStatsOpen(false);
        setIsSummaryOpen(false);
        setActiveReplayMatch(null);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
        return;
      }

      if (!gameStarted) return;

      // Reboot Round
      if (e.key === 'r' || e.key === 'R') {
        resetRound();
      }

      // Undo Move
      if (e.key === 'u' || e.key === 'U') {
        undoLastMove();
      }

      // Hint Move
      if (e.key === 'h' || e.key === 'H') {
        triggerHint();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [
    gameStarted,
    resetRound,
    undoLastMove,
    triggerHint,
    setIsSettingsOpen,
    setIsHowToPlayOpen,
    setIsHistoryOpen,
    setIsStatsOpen,
    setIsSummaryOpen,
    setActiveReplayMatch,
    setConfirmDialog,
  ]);

  return (
    <div className="app-container">
      {/* Background Visual Effects */}
      <CyberBackground />

      {/* App Header */}
      <Header
        gameStarted={gameStarted}
        colorMode={colorMode}
        setColorMode={setColorMode}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
        onReturnToSetup={returnToSetup}
      />

      {/* Main Content: Start Screen OR Active Battle Arena */}
      <main className="game-arena">
        {!gameStarted ? (
          <StartScreen
            gameMode={gameMode}
            setGameMode={setGameMode}
            aiDifficulty={aiDifficulty}
            setAiDifficulty={setAiDifficulty}
            gridSize={gridSize}
            setGridSize={setGridSize}
            seriesMode={seriesMode}
            setSeriesMode={setSeriesMode}
            timerOption={timerOption}
            setTimerOption={setTimerOption}
            player1={player1}
            setPlayer1={setPlayer1}
            player2={player2}
            setPlayer2={setPlayer2}
            onStartGame={() => {
              setGameStarted(true);
              resetRound();
            }}
          />
        ) : (
          <div className="arena-inner">
            {/* Status Card */}
            <GameStatus
              currentPlayer={currentPlayer}
              winnerInfo={winnerInfo}
              isDraw={isDraw}
              isAiThinking={isAiThinking}
              gameMode={gameMode}
              roundNumber={roundNumber}
              player1={player1}
              player2={player2}
              seriesMode={seriesMode}
              seriesScores={seriesScores}
              seriesTargetWins={seriesTargetWins}
              timerOption={timerOption}
              timeRemaining={timeRemaining}
            />

            {/* Tactical Board */}
            <Board
              board={board}
              gridSize={gridSize}
              onCellClick={handleCellClick}
              winnerInfo={winnerInfo}
              isDraw={isDraw}
              isGameOver={isGameOver}
              isAiThinking={isAiThinking}
              currentPlayer={currentPlayer}
              player1={player1}
              player2={player2}
              activeHintCell={activeHintCell}
              invalidMoveIndex={invalidMoveIndex}
            />

            {/* Scoreboard */}
            <Scoreboard
              player1={player1}
              player2={player2}
              gameMode={gameMode}
              seriesScores={seriesScores}
              seriesMode={seriesMode}
              seriesTargetWins={seriesTargetWins}
              stats={stats}
            />

            {/* Tactical Action Controls */}
            <GameControls
              onResetRound={resetRound}
              onUndo={undoLastMove}
              onHint={triggerHint}
              onReturnToSetup={returnToSetup}
              isGameOver={isGameOver}
              canUndo={moveHistory.length > 0}
              isAiThinking={isAiThinking}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* MODALS */}
      {/* 1. Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
        colorMode={colorMode}
        setColorMode={setColorMode}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        timerOption={timerOption}
        setTimerOption={setTimerOption}
        gridSize={gridSize}
        setGridSize={setGridSize}
        aiDifficulty={aiDifficulty}
        setAiDifficulty={setAiDifficulty}
        onResetAllData={() => {
          setIsSettingsOpen(false);
          resetAllStats();
        }}
      />

      {/* 2. How To Play Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

      {/* 3. History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        matchHistory={matchHistory}
        onLaunchReplay={(match) => {
          setIsHistoryOpen(false);
          setActiveReplayMatch(match);
        }}
        onClearHistory={clearHistory}
      />

      {/* 4. Stats Modal */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        player1={player1}
        player2={player2}
        gameMode={gameMode}
        onResetStats={resetAllStats}
      />

      {/* 5. Match Summary Modal */}
      <MatchSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        winnerInfo={winnerInfo}
        isDraw={isDraw}
        player1={player1}
        player2={player2}
        gameMode={gameMode}
        seriesMode={seriesMode}
        seriesScores={seriesScores}
        seriesTargetWins={seriesTargetWins}
        seriesChampion={seriesChampion}
        roundNumber={roundNumber}
        moveHistory={moveHistory}
        onNextRound={resetRound}
        onRestartSeries={restartSeries}
        onReturnToSetup={returnToSetup}
      />

      {/* 6. Replay Modal */}
      {activeReplayMatch && (
        <ReplayModal
          match={activeReplayMatch}
          onClose={() => setActiveReplayMatch(null)}
        />
      )}

      {/* 7. Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null })}
      />

      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          background: var(--bg-primary);
        }

        .game-arena {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 16px;
          position: relative;
          z-index: 5;
        }

        .arena-inner {
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 0 auto;
        }

        @media (max-width: 640px) {
          .game-arena {
            padding: 12px 10px;
          }
          .arena-inner {
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}

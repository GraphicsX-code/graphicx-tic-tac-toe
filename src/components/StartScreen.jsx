import React, { useState } from 'react';
import {
  Bot,
  Users,
  Grid3x3,
  Trophy,
  Clock,
  Gauge,
  Sparkles,
  ArrowRight,
  Shield,
  Palette,
} from 'lucide-react';
import { AVATAR_OPTIONS, COLOR_OPTIONS } from '../hooks/useGame';

export function StartScreen({
  gameMode,
  setGameMode,
  aiDifficulty,
  setAiDifficulty,
  gridSize,
  setGridSize,
  seriesMode,
  setSeriesMode,
  timerOption,
  setTimerOption,
  player1,
  setPlayer1,
  player2,
  setPlayer2,
  onStartGame,
}) {
  const isAi = gameMode === 'ai';

  const handleP1MarkerChange = (marker) => {
    setPlayer1((prev) => ({ ...prev, marker }));
    setPlayer2((prev) => ({ ...prev, marker: marker === 'X' ? 'O' : 'X' }));
  };

  const handleP2MarkerChange = (marker) => {
    setPlayer2((prev) => ({ ...prev, marker }));
    setPlayer1((prev) => ({ ...prev, marker: marker === 'X' ? 'O' : 'X' }));
  };

  return (
    <div className="start-screen-container">
      {/* Title & Brand Intro */}
      <div className="start-hero">
        <div className="hero-badge">
          <span className="pulse-dot" />
          <span>GRAPHICX TACTICAL COMBAT</span>
        </div>
        <h1 className="hero-title">
          TIC-TAC-<span className="cyan-glitch">TOE</span>
        </h1>
        <p className="hero-sub">PRE-ENGAGEMENT CONFIGURATION</p>
      </div>

      <div className="config-matrix-card">
        {/* 1. Game Mode Selector */}
        <div className="config-section">
          <label className="section-label">
            <Users size={14} /> ENGAGEMENT MODE
          </label>
          <div className="mode-cards-grid">
            <button
              type="button"
              className={`mode-card ${gameMode === 'ai' ? 'active' : ''}`}
              onClick={() => setGameMode('ai')}
            >
              <Bot size={22} className="mode-card-icon" />
              <div className="mode-card-info">
                <span className="mode-card-title">VS CYBER AI</span>
                <span className="mode-card-desc">Challenge Neural Minimax Matrix</span>
              </div>
            </button>

            <button
              type="button"
              className={`mode-card ${gameMode === '2p' ? 'active' : ''}`}
              onClick={() => setGameMode('2p')}
            >
              <Users size={22} className="mode-card-icon" />
              <div className="mode-card-info">
                <span className="mode-card-title">PASS & PLAY (2P)</span>
                <span className="mode-card-desc">Head-to-head on same terminal</span>
              </div>
            </button>
          </div>
        </div>

        {/* 2. Players Customization Grid */}
        <div className="players-setup-grid">
          {/* Player 1 Card */}
          <div className="player-config-card" style={{ borderColor: player1.color }}>
            <div className="player-config-header">
              <span className="player-rank">PLAYER 1</span>
              <div className="marker-selector">
                <button
                  type="button"
                  className={`marker-btn ${player1.marker === 'X' ? 'active' : ''}`}
                  onClick={() => handleP1MarkerChange('X')}
                >
                  X
                </button>
                <button
                  type="button"
                  className={`marker-btn ${player1.marker === 'O' ? 'active' : ''}`}
                  onClick={() => handleP1MarkerChange('O')}
                >
                  O
                </button>
              </div>
            </div>

            <input
              type="text"
              className="player-name-input"
              value={player1.name}
              onChange={(e) => setPlayer1((p) => ({ ...p, name: e.target.value || 'Player 1' }))}
              placeholder="Player 1 Call号"
              maxLength={14}
            />

            {/* Avatar Selector */}
            <div className="avatar-picker-row">
              {AVATAR_OPTIONS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={`avatar-choice ${player1.avatar === a.id ? 'active' : ''}`}
                  onClick={() => setPlayer1((p) => ({ ...p, avatar: a.id }))}
                  title={a.name}
                >
                  {a.icon}
                </button>
              ))}
            </div>

            {/* Color Swatch */}
            <div className="color-swatch-row">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-dot ${player1.color === c ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setPlayer1((p) => ({ ...p, color: c }))}
                />
              ))}
            </div>
          </div>

          {/* Player 2 / AI Card */}
          <div className="player-config-card" style={{ borderColor: player2.color }}>
            <div className="player-config-header">
              <span className="player-rank">{isAi ? 'CYBER AI' : 'PLAYER 2'}</span>
              <div className="marker-selector">
                <button
                  type="button"
                  className={`marker-btn ${player2.marker === 'X' ? 'active' : ''}`}
                  onClick={() => handleP2MarkerChange('X')}
                  disabled={isAi}
                >
                  X
                </button>
                <button
                  type="button"
                  className={`marker-btn ${player2.marker === 'O' ? 'active' : ''}`}
                  onClick={() => handleP2MarkerChange('O')}
                  disabled={isAi}
                >
                  O
                </button>
              </div>
            </div>

            {isAi ? (
              <div className="ai-status-display">
                <Bot size={18} />
                <span>CYBER BOT // {aiDifficulty.toUpperCase()}</span>
              </div>
            ) : (
              <input
                type="text"
                className="player-name-input"
                value={player2.name}
                onChange={(e) => setPlayer2((p) => ({ ...p, name: e.target.value || 'Player 2' }))}
                placeholder="Player 2 Call号"
                maxLength={14}
              />
            )}

            {/* Avatar Selector */}
            <div className="avatar-picker-row">
              {AVATAR_OPTIONS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={`avatar-choice ${player2.avatar === a.id ? 'active' : ''}`}
                  onClick={() => setPlayer2((p) => ({ ...p, avatar: a.id }))}
                  title={a.name}
                >
                  {a.icon}
                </button>
              ))}
            </div>

            {/* Color Swatch */}
            <div className="color-swatch-row">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-dot ${player2.color === c ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setPlayer2((p) => ({ ...p, color: c }))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3. Match Param Settings Grid */}
        <div className="params-grid">
          {/* Board Dimension */}
          <div className="param-item">
            <label className="param-label">
              <Grid3x3 size={13} /> BOARD DIMENSION
            </label>
            <div className="pill-group">
              <button
                type="button"
                className={`param-pill ${gridSize === 3 ? 'active' : ''}`}
                onClick={() => setGridSize(3)}
              >
                3×3
              </button>
              <button
                type="button"
                className={`param-pill ${gridSize === 4 ? 'active' : ''}`}
                onClick={() => setGridSize(4)}
              >
                4×4
              </button>
              <button
                type="button"
                className={`param-pill ${gridSize === 5 ? 'active' : ''}`}
                onClick={() => setGridSize(5)}
              >
                5×5
              </button>
            </div>
          </div>

          {/* Series Length */}
          <div className="param-item">
            <label className="param-label">
              <Trophy size={13} /> SERIES LENGTH
            </label>
            <div className="pill-group">
              <button
                type="button"
                className={`param-pill ${seriesMode === 'single' ? 'active' : ''}`}
                onClick={() => setSeriesMode('single')}
              >
                SINGLE
              </button>
              <button
                type="button"
                className={`param-pill ${seriesMode === 'bo3' ? 'active' : ''}`}
                onClick={() => setSeriesMode('bo3')}
              >
                BEST OF 3
              </button>
              <button
                type="button"
                className={`param-pill ${seriesMode === 'bo5' ? 'active' : ''}`}
                onClick={() => setSeriesMode('bo5')}
              >
                BEST OF 5
              </button>
            </div>
          </div>

          {/* Move Timer */}
          <div className="param-item">
            <label className="param-label">
              <Clock size={13} /> TURN TIMER
            </label>
            <div className="pill-group">
              <button
                type="button"
                className={`param-pill ${timerOption === 0 ? 'active' : ''}`}
                onClick={() => setTimerOption(0)}
              >
                OFF
              </button>
              <button
                type="button"
                className={`param-pill ${timerOption === 10 ? 'active' : ''}`}
                onClick={() => setTimerOption(10)}
              >
                10s
              </button>
              <button
                type="button"
                className={`param-pill ${timerOption === 15 ? 'active' : ''}`}
                onClick={() => setTimerOption(15)}
              >
                15s
              </button>
            </div>
          </div>

          {/* AI Difficulty (Visible when vs AI) */}
          {isAi && (
            <div className="param-item">
              <label className="param-label">
                <Gauge size={13} /> AI DIFFICULTY
              </label>
              <div className="pill-group">
                <button
                  type="button"
                  className={`param-pill ${aiDifficulty === 'easy' ? 'active' : ''}`}
                  onClick={() => setAiDifficulty('easy')}
                >
                  CADET
                </button>
                <button
                  type="button"
                  className={`param-pill ${aiDifficulty === 'medium' ? 'active' : ''}`}
                  onClick={() => setAiDifficulty('medium')}
                >
                  TACTICAL
                </button>
                <button
                  type="button"
                  className={`param-pill ${aiDifficulty === 'hard' ? 'active' : ''}`}
                  onClick={() => setAiDifficulty('hard')}
                >
                  UNBEATABLE
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Big Launch Button */}
        <button type="button" className="cyber-btn cyber-btn-primary launch-btn" onClick={onStartGame}>
          <span>INITIATE PROTOCOL</span>
          <ArrowRight size={18} />
        </button>
      </div>

      <style>{`
        .start-screen-container {
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 16px 12px;
          position: relative;
          z-index: 10;
        }

        .start-hero {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 10px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--accent-cyan);
          letter-spacing: 0.12em;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-success);
          box-shadow: 0 0 6px var(--accent-success);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          line-height: 1;
        }

        .cyan-glitch {
          color: var(--accent-cyan);
          text-shadow: 0 0 16px var(--accent-cyan);
        }

        .hero-sub {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-secondary);
          letter-spacing: 0.15em;
        }

        .config-matrix-card {
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 18px;
          box-shadow: var(--shadow-hud);
          backdrop-filter: blur(14px);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-secondary);
          letter-spacing: 0.08em;
          margin-bottom: 6px;
        }

        .mode-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .mode-card {
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        }

        .mode-card:hover {
          border-color: rgba(0, 245, 255, 0.4);
          transform: translateY(-1px);
        }

        .mode-card.active {
          border-color: var(--accent-cyan);
          background: rgba(0, 245, 255, 0.1);
          box-shadow: 0 0 12px rgba(0, 245, 255, 0.2);
        }

        .mode-card-icon {
          color: var(--accent-cyan);
          flex-shrink: 0;
        }

        .mode-card-info {
          display: flex;
          flex-direction: column;
        }

        .mode-card-title {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .mode-card-desc {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: var(--text-muted);
        }

        .players-setup-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .player-config-card {
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .player-config-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .player-rank {
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--text-secondary);
        }

        .marker-selector {
          display: flex;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 2px;
        }

        .marker-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 900;
          padding: 1px 6px;
          border-radius: 2px;
          cursor: pointer;
        }

        .marker-btn.active {
          background: var(--accent-cyan);
          color: var(--text-dark);
        }

        .player-name-input {
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 0.8rem;
          padding: 6px 8px;
          outline: none;
        }

        .player-name-input:focus {
          border-color: var(--accent-cyan);
        }

        .ai-status-display {
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--accent-cyan);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          padding: 6px 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .avatar-picker-row {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .avatar-choice {
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          font-size: 1rem;
          padding: 3px 5px;
          cursor: pointer;
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .avatar-choice:hover {
          border-color: var(--accent-cyan);
        }

        .avatar-choice.active {
          border-color: var(--accent-cyan);
          background: rgba(0, 245, 255, 0.2);
        }

        .color-swatch-row {
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .color-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: transform var(--transition-fast);
        }

        .color-dot:hover {
          transform: scale(1.2);
        }

        .color-dot.active {
          outline: 2px solid #FFF;
          outline-offset: 1px;
        }

        .params-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .param-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .param-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-secondary);
        }

        .pill-group {
          display: flex;
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 2px;
          gap: 2px;
        }

        .param-pill {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 5px 2px;
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 700;
          border-radius: 3px;
          cursor: pointer;
          text-align: center;
          transition: all var(--transition-fast);
        }

        .param-pill:hover {
          color: var(--text-primary);
        }

        .param-pill.active {
          background: rgba(0, 245, 255, 0.18);
          color: var(--accent-cyan);
          box-shadow: 0 0 6px rgba(0, 245, 255, 0.2);
        }

        .launch-btn {
          width: 100%;
          height: 48px;
          font-size: 0.95rem;
          letter-spacing: 0.1em;
          margin-top: 4px;
        }

        @media (max-width: 520px) {
          .players-setup-grid, .mode-cards-grid, .params-grid {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, ChevronLeft, ChevronRight } from 'lucide-react';
import { Cell } from '../Cell';

export function ReplayModal({ match, onClose }) {
  if (!match) return null;

  const { moves, gridSize = 3, p1Name, p2Name, p1Color, p2Color, winnerName } = match;
  const [currentStep, setCurrentStep] = useState(moves.length);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto playback interval
  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep >= moves.length) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 700);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, moves.length]);

  // Construct board at current step
  const currentBoard = Array(gridSize * gridSize).fill(null);
  for (let i = 0; i < currentStep; i++) {
    if (moves[i]) {
      currentBoard[moves[i].index] = moves[i].player;
    }
  }

  const lastMove = currentStep > 0 ? moves[currentStep - 1] : null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content replay-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">TACTICAL REPLAY</h3>
            <span className="replay-sub">
              {p1Name} vs {p2Name} • Winner: {winnerName}
            </span>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close Replay">
            <X size={18} />
          </button>
        </div>

        {/* Board View */}
        <div className="replay-board-container" style={{ '--grid-size': gridSize }}>
          <div className="replay-grid">
            {currentBoard.map((val, idx) => (
              <Cell
                key={idx}
                index={idx}
                value={val}
                onClick={() => {}}
                isWinningCell={false}
                isDisabled={true}
                currentPlayer={'X'}
                isAiThinking={false}
              />
            ))}
          </div>
        </div>

        {/* Step Info */}
        <div className="replay-step-info">
          {lastMove ? (
            <span>
              Move {currentStep} of {moves.length}: Player <strong>{lastMove.player}</strong> deployed at (
              {Math.floor(lastMove.index / gridSize) + 1}, {(lastMove.index % gridSize) + 1})
            </span>
          ) : (
            <span>Initial State — Ready for Playback</span>
          )}
        </div>

        {/* Playback Controls */}
        <div className="replay-controls">
          <button
            type="button"
            className="ctrl-btn"
            onClick={() => { setIsPlaying(false); setCurrentStep(0); }}
            disabled={currentStep === 0}
            title="Beginning"
          >
            <SkipBack size={16} />
          </button>

          <button
            type="button"
            className="ctrl-btn"
            onClick={() => { setIsPlaying(false); setCurrentStep((s) => Math.max(0, s - 1)); }}
            disabled={currentStep === 0}
            title="Step Back"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            className="ctrl-btn play-btn"
            onClick={() => {
              if (currentStep >= moves.length) setCurrentStep(0);
              setIsPlaying((p) => !p);
            }}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button
            type="button"
            className="ctrl-btn"
            onClick={() => { setIsPlaying(false); setCurrentStep((s) => Math.min(moves.length, s + 1)); }}
            disabled={currentStep >= moves.length}
            title="Step Forward"
          >
            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            className="ctrl-btn"
            onClick={() => { setIsPlaying(false); setCurrentStep(moves.length); }}
            disabled={currentStep >= moves.length}
            title="End"
          >
            <SkipForward size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .replay-modal {
          max-width: 440px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 10px;
        }

        .modal-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: var(--accent-cyan);
        }

        .replay-sub {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 4px;
        }

        .close-btn:hover {
          color: var(--text-primary);
        }

        .replay-board-container {
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
        }

        .replay-grid {
          display: grid;
          grid-template-columns: repeat(var(--grid-size), 1fr);
          gap: 8px;
        }

        .replay-step-info {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-align: center;
          background: var(--surface-elevated);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
        }

        .replay-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .ctrl-btn {
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .ctrl-btn:hover:not(:disabled) {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .ctrl-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .play-btn {
          background: rgba(0, 245, 255, 0.15);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          width: 44px;
          height: 44px;
        }
      `}</style>
    </div>
  );
}


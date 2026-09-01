import React from 'react';
import { RotateCcw, Lightbulb, Undo2, SlidersHorizontal, ArrowRight } from 'lucide-react';

export function GameControls({
  onResetRound,
  onUndo,
  onHint,
  onReturnToSetup,
  isGameOver,
  canUndo,
  isAiThinking,
}) {
  return (
    <div className="controls-container">
      <div className="tactical-actions-row">
        {/* Undo Button */}
        <button
          type="button"
          className="cyber-btn tactical-btn"
          onClick={onUndo}
          disabled={!canUndo || isGameOver || isAiThinking}
          title="Undo Last Move (U)"
          aria-label="Undo Last Move"
        >
          <Undo2 size={15} />
          <span>UNDO</span>
          <span className="kbd-badge">U</span>
        </button>

        {/* Tactical Hint Button */}
        <button
          type="button"
          className="cyber-btn tactical-btn hint-btn"
          onClick={onHint}
          disabled={isGameOver || isAiThinking}
          title="Strategic Move Hint (H)"
          aria-label="Strategic Move Hint"
        >
          <Lightbulb size={15} />
          <span>HINT</span>
          <span className="kbd-badge">H</span>
        </button>

        {/* New Round / Reboot Button */}
        <button
          type="button"
          className={`cyber-btn cyber-btn-primary new-round-btn ${isGameOver ? 'pulse-prompt' : ''}`}
          onClick={onResetRound}
          title="New Round (R)"
          aria-label="New Round"
        >
          <RotateCcw size={15} />
          <span>NEW ROUND</span>
          <span className="kbd-badge">R</span>
        </button>
      </div>

      <style>{`
        .controls-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          max-width: var(--board-max-size);
          margin: 0 auto;
        }

        .tactical-actions-row {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }

        .tactical-btn {
          flex: 1;
          height: 42px;
          font-size: 0.75rem;
          padding: 6px 8px;
        }

        .hint-btn:hover:not(:disabled) {
          border-color: var(--accent-success);
          color: var(--accent-success);
          box-shadow: 0 0 12px var(--accent-success-glow);
        }

        .new-round-btn {
          flex: 1.4;
          height: 42px;
        }

        .pulse-prompt {
          animation: promptPulse 1.6s infinite alternate;
        }

        @keyframes promptPulse {
          0% { box-shadow: 0 0 10px rgba(0, 245, 255, 0.3); }
          100% { box-shadow: 0 0 24px rgba(0, 245, 255, 0.7); }
        }

        .kbd-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 17px;
          height: 17px;
          border-radius: 3px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(0, 245, 255, 0.35);
          font-family: var(--font-mono);
          font-size: 0.62rem;
          margin-left: 3px;
        }

        [data-color-mode="light"] .kbd-badge {
          background: rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 480px) {
          .tactical-btn, .new-round-btn {
            font-size: 0.7rem;
            padding: 4px 6px;
          }
          .kbd-badge {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

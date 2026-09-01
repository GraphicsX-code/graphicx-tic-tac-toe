import React from 'react';

export function Cell({
  index,
  value,
  onClick,
  isWinningCell,
  isDisabled,
  currentPlayer,
  isAiThinking,
  player1,
  player2,
  isHinted,
  isInvalidMove,
  gridSize = 3,
}) {
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  const coordLabel = `${row},${col}`;

  const isP1 = value === player1?.marker;
  const cellColor = value ? (isP1 ? player1.color : player2.color) : undefined;
  const currentTurnColor = currentPlayer === player1?.marker ? player1?.color : player2?.color;

  return (
    <button
      type="button"
      className={`cell-btn ${value ? `occupied-${value.toLowerCase()}` : 'empty'} ${
        isWinningCell ? 'winning' : ''
      } ${isHinted ? 'hinted' : ''} ${isInvalidMove ? 'invalid-shake' : ''}`}
      onClick={onClick}
      disabled={isDisabled || value !== null || isAiThinking}
      aria-label={`Cell ${row + 1} comma ${col + 1}, ${value ? `Player ${value}` : 'Empty'}`}
      data-index={index}
      style={{
        '--cell-color': cellColor,
        '--turn-color': currentTurnColor,
      }}
    >
      {/* Coordinate Tag */}
      {gridSize <= 4 && (
        <span className="coord-tag" aria-hidden="true">
          {coordLabel}
        </span>
      )}

      {/* Cyber Corner Decals */}
      <span className="corner-accent tl" aria-hidden="true" />
      <span className="corner-accent br" aria-hidden="true" />

      {/* Value SVG */}
      {value === 'X' && (
        <svg
          className="symbol-svg symbol-x"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="18"
            y1="18"
            x2="62"
            y2="62"
            stroke={cellColor || 'var(--accent-cyan)'}
            strokeWidth="10"
            strokeLinecap="round"
            className="x-stroke-1"
          />
          <line
            x1="62"
            y1="18"
            x2="18"
            y2="62"
            stroke={cellColor || 'var(--accent-cyan)'}
            strokeWidth="10"
            strokeLinecap="round"
            className="x-stroke-2"
          />
        </svg>
      )}

      {value === 'O' && (
        <svg
          className="symbol-svg symbol-o"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="40"
            cy="40"
            r="23"
            stroke={cellColor || 'var(--accent-o-color)'}
            strokeWidth="9"
            className="o-circle"
          />
          <circle
            cx="40"
            cy="40"
            r="12"
            stroke={cellColor || 'rgba(255, 46, 147, 0.4)'}
            strokeWidth="2"
            strokeDasharray="4 4"
            className="o-inner-ring"
            opacity="0.6"
          />
        </svg>
      )}

      {/* Ghost preview */}
      {!value && !isDisabled && !isAiThinking && (
        <div
          className="ghost-preview"
          style={{ color: currentTurnColor }}
          aria-hidden="true"
        >
          {currentPlayer}
        </div>
      )}

      <style>{`
        .cell-btn {
          position: relative;
          aspect-ratio: 1 / 1;
          background: rgba(13, 20, 32, 0.75);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-normal);
          outline: none;
          padding: 0;
          overflow: hidden;
        }

        [data-color-mode="light"] .cell-btn {
          background: rgba(255, 255, 255, 0.9);
        }

        .cell-btn.empty:hover:not(:disabled) {
          background: rgba(22, 34, 56, 0.85);
          border-color: var(--turn-color, var(--accent-cyan));
          box-shadow: 0 0 16px var(--accent-cyan-dim), inset 0 0 12px rgba(0, 245, 255, 0.1);
          transform: translateY(-2px);
        }

        [data-color-mode="light"] .cell-btn.empty:hover:not(:disabled) {
          background: #F8FAFC;
        }

        .cell-btn:focus-visible {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 3px rgba(0, 245, 255, 0.4);
        }

        .cell-btn.winning {
          background: rgba(0, 245, 255, 0.18);
          border-color: var(--cell-color, var(--accent-success));
          box-shadow: 0 0 24px var(--accent-success-glow), inset 0 0 15px rgba(57, 255, 136, 0.2);
          animation: winCellPulse 1.5s infinite alternate ease-in-out;
          z-index: 2;
        }

        .cell-btn.hinted {
          animation: hintBeacon 1.2s infinite ease-in-out;
          z-index: 3;
        }

        .cell-btn.invalid-shake {
          animation: invalidShake 0.35s ease-in-out;
        }

        @keyframes winCellPulse {
          0% { transform: scale(1); filter: brightness(1); }
          100% { transform: scale(1.03); filter: brightness(1.2); }
        }

        .coord-tag {
          position: absolute;
          top: 4px;
          left: 6px;
          font-family: var(--font-mono);
          font-size: 0.52rem;
          color: var(--text-muted);
          opacity: 0.6;
          pointer-events: none;
        }

        .corner-accent {
          position: absolute;
          width: 5px;
          height: 5px;
          pointer-events: none;
          opacity: 0.35;
        }

        .corner-accent.tl {
          top: 3px;
          left: 3px;
          border-top: 1px solid var(--accent-cyan);
          border-left: 1px solid var(--accent-cyan);
        }

        .corner-accent.br {
          bottom: 3px;
          right: 3px;
          border-bottom: 1px solid var(--accent-cyan);
          border-right: 1px solid var(--accent-cyan);
        }

        .symbol-svg {
          width: 68%;
          height: 68%;
          filter: drop-shadow(0 0 10px currentColor);
          animation: popIn 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .x-stroke-1, .x-stroke-2, .o-circle {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawStroke 0.22s ease-out forwards;
        }

        .x-stroke-2 {
          animation-delay: 0.08s;
        }

        @keyframes drawStroke {
          to { stroke-dashoffset: 0; }
        }

        @keyframes popIn {
          0% { transform: scale(0.4); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .ghost-preview {
          position: absolute;
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 900;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
          transform: scale(0.8);
        }

        .cell-btn.empty:hover .ghost-preview {
          opacity: 0.25;
          transform: scale(1);
        }
      `}</style>
    </button>
  );
}

import React, { useEffect, useRef } from 'react';
import { Cell } from './Cell';

export function Board({
  board,
  gridSize = 3,
  onCellClick,
  winnerInfo,
  isDraw,
  isGameOver,
  isAiThinking,
  currentPlayer,
  player1,
  player2,
  activeHintCell,
  invalidMoveIndex,
}) {
  const boardRef = useRef(null);

  // Keyboard shortcut listener for grid moves
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (gridSize === 3) {
        const numpadMap = {
          Numpad7: 0, Numpad8: 1, Numpad9: 2,
          Numpad4: 3, Numpad5: 4, Numpad6: 5,
          Numpad1: 6, Numpad2: 7, Numpad3: 8,
          Digit1: 0, Digit2: 1, Digit3: 2,
          Digit4: 3, Digit5: 4, Digit6: 5,
          Digit7: 6, Digit8: 7, Digit9: 8,
        };
        if (e.code in numpadMap) {
          onCellClick(numpadMap[e.code]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gridSize, onCellClick]);

  // Dynamic Laser Strike Line for any NxN grid
  const renderWinningStrikeLine = () => {
    if (!winnerInfo) return null;

    const { line, winner } = winnerInfo;
    const strokeColor = winner === player1?.marker ? player1.color : player2.color;

    // Calculate percentage center for start cell and end cell
    const firstIdx = line[0];
    const lastIdx = line[line.length - 1];

    const startRow = Math.floor(firstIdx / gridSize);
    const startCol = firstIdx % gridSize;
    const endRow = Math.floor(lastIdx / gridSize);
    const endCol = lastIdx % gridSize;

    // Center percentage of a cell on NxN grid: (index + 0.5) * (100 / gridSize)
    const step = 100 / gridSize;
    const x1 = (startCol + 0.5) * step;
    const y1 = (startRow + 0.5) * step;
    const x2 = (endCol + 0.5) * step;
    const y2 = (endRow + 0.5) * step;

    return (
      <svg
        className="winning-strike-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Glow */}
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
          className="strike-glow"
        />
        {/* Core Laser */}
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="strike-laser"
        />
      </svg>
    );
  };

  const winningCells = winnerInfo ? winnerInfo.line : [];

  return (
    <div className="board-wrapper" ref={boardRef} style={{ '--grid-cols': gridSize }}>
      {/* Outer Cyber Frame Decals */}
      <div className="board-frame-corner top-left" aria-hidden="true" />
      <div className="board-frame-corner top-right" aria-hidden="true" />
      <div className="board-frame-corner bottom-left" aria-hidden="true" />
      <div className="board-frame-corner bottom-right" aria-hidden="true" />

      {/* NxN Cells Grid */}
      <div
        className="board-grid"
        role="grid"
        aria-label={`${gridSize} by ${gridSize} Tic-Tac-Toe Game Grid`}
      >
        {board.map((cellValue, idx) => (
          <Cell
            key={idx}
            index={idx}
            value={cellValue}
            onClick={() => onCellClick(idx)}
            isWinningCell={winningCells.includes(idx)}
            isDisabled={isGameOver}
            currentPlayer={currentPlayer}
            isAiThinking={isAiThinking}
            player1={player1}
            player2={player2}
            isHinted={activeHintCell === idx}
            isInvalidMove={invalidMoveIndex === idx}
            gridSize={gridSize}
          />
        ))}
      </div>

      {/* Winning Laser Strike Line */}
      {renderWinningStrikeLine()}

      <style>{`
        .board-wrapper {
          position: relative;
          width: 100%;
          max-width: var(--board-max-size);
          margin: 0 auto;
          padding: 12px;
          background: rgba(10, 15, 24, 0.7);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7), inset 0 0 30px rgba(0, 245, 255, 0.03);
        }

        [data-color-mode="light"] .board-wrapper {
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
        }

        .board-frame-corner {
          position: absolute;
          width: 12px;
          height: 12px;
          pointer-events: none;
          z-index: 3;
        }

        .board-frame-corner.top-left {
          top: -2px;
          left: -2px;
          border-top: 3px solid var(--accent-cyan);
          border-left: 3px solid var(--accent-cyan);
          border-top-left-radius: 8px;
        }

        .board-frame-corner.top-right {
          top: -2px;
          right: -2px;
          border-top: 3px solid var(--accent-cyan);
          border-right: 3px solid var(--accent-cyan);
          border-top-right-radius: 8px;
        }

        .board-frame-corner.bottom-left {
          bottom: -2px;
          left: -2px;
          border-bottom: 3px solid var(--accent-cyan);
          border-left: 3px solid var(--accent-cyan);
          border-bottom-left-radius: 8px;
        }

        .board-frame-corner.bottom-right {
          bottom: -2px;
          right: -2px;
          border-bottom: 3px solid var(--accent-cyan);
          border-right: 3px solid var(--accent-cyan);
          border-bottom-right-radius: 8px;
        }

        .board-grid {
          display: grid;
          grid-template-columns: repeat(var(--grid-cols), 1fr);
          grid-template-rows: repeat(var(--grid-cols), 1fr);
          gap: var(--cell-gap);
          width: 100%;
        }

        .winning-strike-svg {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          bottom: 12px;
          width: calc(100% - 24px);
          height: calc(100% - 24px);
          pointer-events: none;
          z-index: 5;
        }

        .strike-glow {
          filter: blur(4px) drop-shadow(0 0 12px currentColor);
          opacity: 0.95;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawLaser 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .strike-laser {
          opacity: 0.98;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawLaser 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes drawLaser {
          to { stroke-dashoffset: 0; }
        }

        @media (max-width: 480px) {
          .board-wrapper {
            padding: 8px;
          }
          .board-grid {
            gap: 6px;
          }
          .winning-strike-svg {
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            width: calc(100% - 16px);
            height: calc(100% - 16px);
          }
        }
      `}</style>
    </div>
  );
}

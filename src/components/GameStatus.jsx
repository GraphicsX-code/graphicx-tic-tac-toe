import React from 'react';
import { Cpu, Trophy, AlertTriangle, Zap, Clock } from 'lucide-react';
import { AVATAR_OPTIONS } from '../hooks/useGame';

export function GameStatus({
  currentPlayer,
  winnerInfo,
  isDraw,
  isAiThinking,
  gameMode,
  roundNumber,
  player1,
  player2,
  seriesMode,
  seriesScores,
  seriesTargetWins,
  timerOption,
  timeRemaining,
}) {
  const isP1Turn = currentPlayer === player1.marker;
  const activePlayer = isP1Turn ? player1 : player2;
  const isAi = gameMode === 'ai';

  const p1Icon = AVATAR_OPTIONS.find((a) => a.id === player1.avatar)?.icon || '⚔️';
  const p2Icon = AVATAR_OPTIONS.find((a) => a.id === player2.avatar)?.icon || (isAi ? '🤖' : '🎯');

  let statusText = '';
  let statusSubtext = '';
  let statusType = 'turn';

  if (winnerInfo) {
    statusType = 'win';
    const isP1Win = winnerInfo.winner === player1.marker;
    statusText = `${isP1Win ? player1.name : isAi ? 'CYBER AI' : player2.name} VICTORIOUS`;
    statusSubtext = 'TACTICAL DOMINANCE ACHIEVED';
  } else if (isDraw) {
    statusType = 'draw';
    statusText = 'STALEMATE DETECTED';
    statusSubtext = 'GRID SATURATED — NO TARGETS REMAINING';
  } else if (isAiThinking) {
    statusType = 'thinking';
    statusText = 'CYBER AI CALCULATING';
    statusSubtext = 'EVALUATING NEURAL STRIKE VECTORS...';
  } else {
    statusType = 'turn';
    statusText = `${activePlayer.name}'s TURN [${currentPlayer}]`;
    statusSubtext = isP1Turn ? 'DEPLOY COORDINATE ON MATRIX' : 'AWAITING RESPONSE SEQUENCE';
  }

  // Timer Progress Percentage
  const timerPercent = timerOption > 0 ? (timeRemaining / timerOption) * 100 : 0;
  const isTimerUrgent = timerOption > 0 && timeRemaining <= 3;

  return (
    <div
      className={`status-card ${statusType}`}
      style={{
        '--active-color': activePlayer.color,
        borderColor: statusType === 'win' ? (winnerInfo.winner === player1.marker ? player1.color : player2.color) : undefined,
      }}
    >
      {/* Top HUD Metadata */}
      <div className="status-header">
        <div className="status-tags-group">
          <span className="status-round-tag">
            <Zap size={11} /> ROUND #{roundNumber}
          </span>
          {seriesMode !== 'single' && (
            <span className="series-tag">
              {seriesMode.toUpperCase()}: {player1.name} ({seriesScores.p1}) - ({seriesScores.p2}) {isAi ? 'AI' : player2.name}
            </span>
          )}
        </div>

        {/* Move Timer Counter (if enabled) */}
        {timerOption > 0 && !winnerInfo && !isDraw && !isAiThinking && (
          <div className={`timer-pill ${isTimerUrgent ? 'urgent' : ''}`}>
            <Clock size={11} />
            <span>{timeRemaining}s</span>
          </div>
        )}
      </div>

      {/* Main Status Display */}
      <div className="status-body">
        <div className="status-icon-wrapper">
          {statusType === 'win' ? (
            <div
              className="player-avatar-badge"
              style={{
                borderColor: winnerInfo.winner === player1.marker ? player1.color : player2.color,
                boxShadow: `0 0 15px ${winnerInfo.winner === player1.marker ? player1.color : player2.color}`,
              }}
            >
              <span>{winnerInfo.winner === player1.marker ? p1Icon : p2Icon}</span>
            </div>
          ) : statusType === 'draw' ? (
            <AlertTriangle className="status-icon alert-icon" size={24} />
          ) : statusType === 'thinking' ? (
            <Cpu className="status-icon spinning" size={24} style={{ color: player2.color }} />
          ) : (
            <div
              className="player-avatar-badge"
              style={{
                borderColor: activePlayer.color,
                boxShadow: `0 0 12px ${activePlayer.color}`,
              }}
            >
              <span>{isP1Turn ? p1Icon : p2Icon}</span>
            </div>
          )}
        </div>

        <div className="status-text-group">
          <h2 className="status-title">{statusText}</h2>
          <p className="status-sub">{statusSubtext}</p>
        </div>
      </div>

      {/* Timer Progress Bar */}
      {timerOption > 0 && !winnerInfo && !isDraw && !isAiThinking && (
        <div className="timer-bar-track">
          <div
            className={`timer-bar-fill ${isTimerUrgent ? 'urgent' : ''}`}
            style={{ width: `${timerPercent}%`, backgroundColor: isTimerUrgent ? 'var(--accent-danger)' : activePlayer.color }}
          />
        </div>
      )}

      <style>{`
        .status-card {
          width: 100%;
          max-width: var(--board-max-size);
          margin: 0 auto;
          background: rgba(13, 20, 32, 0.8);
          border: 1px solid var(--border-subtle);
          border-left: 4px solid var(--active-color);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          backdrop-filter: blur(12px);
          position: relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          transition: all var(--transition-normal);
          overflow: hidden;
        }

        [data-color-mode="light"] .status-card {
          background: rgba(255, 255, 255, 0.88);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .status-card.win {
          animation: winCardPulse 1.8s infinite alternate ease-in-out;
        }

        .status-card.draw {
          border-left-color: var(--accent-amber);
          border-color: var(--accent-amber);
        }

        .status-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .status-tags-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-round-tag, .series-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-secondary);
          display: inline-flex;
          align-items: center;
          gap: 4px;
          text-transform: uppercase;
        }

        .series-tag {
          color: var(--accent-cyan);
          background: rgba(0, 245, 255, 0.1);
          padding: 1px 6px;
          border-radius: 3px;
        }

        .timer-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-cyan);
          background: rgba(0, 245, 255, 0.12);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(0, 245, 255, 0.3);
        }

        .timer-pill.urgent {
          color: var(--accent-danger);
          background: rgba(255, 51, 102, 0.2);
          border-color: var(--accent-danger);
          animation: timerPulse 0.5s infinite alternate;
        }

        @keyframes timerPulse {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }

        .status-body {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .player-avatar-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--surface-elevated);
          border: 2px solid var(--active-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .alert-icon {
          color: var(--accent-amber);
        }

        .status-text-group {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .status-title {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .status-sub {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
          margin-top: 1px;
          text-transform: uppercase;
        }

        .timer-bar-track {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(0, 0, 0, 0.2);
        }

        .timer-bar-fill {
          height: 100%;
          transition: width 1s linear;
        }
      `}</style>
    </div>
  );
}

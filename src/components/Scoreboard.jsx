import React from 'react';
import { Flame, Shield } from 'lucide-react';
import { AVATAR_OPTIONS } from '../hooks/useGame';

export function Scoreboard({
  player1,
  player2,
  gameMode,
  seriesScores,
  seriesMode,
  seriesTargetWins,
  stats,
}) {
  const isAi = gameMode === 'ai';
  const p1Icon = AVATAR_OPTIONS.find((a) => a.id === player1?.avatar)?.icon || '⚔️';
  const p2Icon = AVATAR_OPTIONS.find((a) => a.id === player2?.avatar)?.icon || (isAi ? '🤖' : '🎯');

  return (
    <div className="scoreboard-container" aria-label="Game Scoreboard">
      {/* Player 1 Card */}
      <div
        className="score-card player-x"
        style={{ borderTopColor: player1.color }}
      >
        <div className="score-header">
          <span className="p-avatar-sm">{p1Icon}</span>
          <span className="player-label">{player1.name}</span>
          {stats.currentStreak > 1 && (
            <span
              className="streak-badge"
              style={{
                backgroundColor: `${player1.color}25`,
                color: player1.color,
                borderColor: player1.color,
              }}
              title={`${stats.currentStreak} Win Streak!`}
            >
              <Flame size={10} /> {stats.currentStreak}
            </span>
          )}
        </div>
        <div className="score-val" style={{ color: player1.color }}>
          {seriesScores.p1}
        </div>
        <div className="score-footer">
          {seriesMode !== 'single' ? `SERIES (${seriesTargetWins} TO WIN)` : 'VICTORIES'}
        </div>
      </div>

      {/* Stalemate Card */}
      <div className="score-card draws">
        <div className="score-header">
          <Shield size={12} className="shield-icon" />
          <span className="player-label">DRAWS</span>
        </div>
        <div className="score-val" style={{ color: 'var(--accent-amber)' }}>
          {seriesScores.draws}
        </div>
        <div className="score-footer">STALEMATES</div>
      </div>

      {/* Player 2 / AI Card */}
      <div
        className="score-card player-o"
        style={{ borderTopColor: player2.color }}
      >
        <div className="score-header">
          <span className="p-avatar-sm">{p2Icon}</span>
          <span className="player-label">{isAi ? 'CYBER AI' : player2.name}</span>
        </div>
        <div className="score-val" style={{ color: player2.color }}>
          {seriesScores.p2}
        </div>
        <div className="score-footer">
          {seriesMode !== 'single' ? `SERIES (${seriesTargetWins} TO WIN)` : 'VICTORIES'}
        </div>
      </div>

      <style>{`
        .scoreboard-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          width: 100%;
          max-width: var(--board-max-size);
          margin: 0 auto;
        }

        .score-card {
          background: rgba(13, 20, 32, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-subtle);
          border-top: 3px solid var(--accent-cyan);
          border-radius: var(--radius-md);
          padding: 10px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          transition: all var(--transition-fast);
        }

        [data-color-mode="light"] .score-card {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .score-card:hover {
          transform: translateY(-2px);
        }

        .score-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 100%;
          margin-bottom: 2px;
        }

        .p-avatar-sm {
          font-size: 0.9rem;
        }

        .player-label {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 75px;
        }

        .shield-icon {
          color: var(--accent-amber);
        }

        .streak-badge {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          padding: 1px 4px;
          border-radius: 4px;
          border: 1px solid transparent;
          animation: pulseStreak 1.2s infinite alternate;
        }

        @keyframes pulseStreak {
          from { transform: scale(0.95); }
          to { transform: scale(1.05); }
        }

        .score-val {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 900;
          line-height: 1;
          margin: 3px 0;
          text-shadow: 0 0 12px currentColor;
        }

        .score-footer {
          font-family: var(--font-mono);
          font-size: 0.52rem;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        @media (max-width: 480px) {
          .scoreboard-container {
            gap: 6px;
          }
          .score-card {
            padding: 8px 4px;
          }
          .score-val {
            font-size: 1.35rem;
          }
          .player-label {
            font-size: 0.62rem;
            max-width: 60px;
          }
        }
      `}</style>
    </div>
  );
}

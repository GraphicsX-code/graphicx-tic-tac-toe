import React from 'react';
import { X, BarChart3, Trophy, Flame, Zap, Shield, RotateCcw, Award } from 'lucide-react';

export function StatsModal({
  isOpen,
  onClose,
  stats,
  player1,
  player2,
  gameMode,
  onResetStats,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content stats-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <BarChart3 size={20} className="modal-icon" />
            <h3 className="modal-title">TACTICAL STATISTICS</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Big Highlight Grid */}
        <div className="stats-highlight-grid">
          {/* Win Rate */}
          <div className="stat-card featured">
            <span className="stat-label">WIN RATE</span>
            <div className="stat-big-val">{stats.winRate}%</div>
            <div className="stat-progress-bar">
              <div className="progress-fill" style={{ width: `${stats.winRate}%` }} />
            </div>
          </div>

          {/* Total Engagements */}
          <div className="stat-card">
            <span className="stat-label">TOTAL GAMES</span>
            <div className="stat-val">{stats.totalGames}</div>
          </div>

          {/* Current Streak */}
          <div className="stat-card">
            <div className="stat-label-icon">
              <Flame size={12} color="var(--accent-cyan)" />
              <span className="stat-label">STREAK</span>
            </div>
            <div className="stat-val">{Math.max(0, stats.currentStreak)}</div>
          </div>

          {/* Best Streak */}
          <div className="stat-card">
            <div className="stat-label-icon">
              <Award size={12} color="var(--accent-amber)" />
              <span className="stat-label">MAX STREAK</span>
            </div>
            <div className="stat-val">{stats.maxStreak}</div>
          </div>

          {/* Fastest Win */}
          <div className="stat-card">
            <div className="stat-label-icon">
              <Zap size={12} color="var(--accent-success)" />
              <span className="stat-label">FASTEST WIN</span>
            </div>
            <div className="stat-val">{stats.fastestWinSeconds ? `${stats.fastestWinSeconds}s` : '—'}</div>
          </div>
        </div>

        {/* Breakdown Row */}
        <div className="breakdown-card">
          <h4 className="breakdown-title">OUTCOME BREAKDOWN</h4>
          <div className="breakdown-pills">
            <div className="pill p1">
              <Trophy size={14} />
              <span>{player1.name}: <strong>{stats.p1Wins}</strong></span>
            </div>
            <div className="pill draw">
              <Shield size={14} />
              <span>Draws: <strong>{stats.draws}</strong></span>
            </div>
            <div className="pill p2">
              <Trophy size={14} />
              <span>{gameMode === 'ai' ? 'Cyber AI' : player2.name}: <strong>{stats.p2Wins}</strong></span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="cyber-btn reset-stats-btn" onClick={onResetStats}>
            <RotateCcw size={14} /> RESET LIFETIME STATS
          </button>
        </div>
      </div>

      <style>{`
        .stats-modal {
          max-width: 460px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 10px;
        }

        .modal-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-icon {
          color: var(--accent-cyan);
        }

        .modal-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: var(--text-primary);
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

        .stats-highlight-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .stat-card {
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-card.featured {
          grid-column: span 2;
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.08), rgba(168, 85, 247, 0.08));
          border-color: rgba(0, 245, 255, 0.3);
        }

        .stat-label-icon {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stat-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .stat-big-val {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 900;
          color: var(--accent-cyan);
          line-height: 1;
        }

        .stat-progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
          overflow: hidden;
          margin-top: 4px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(to right, var(--accent-cyan), var(--accent-success));
          border-radius: 3px;
          transition: width 0.4s ease;
        }

        .stat-val {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .breakdown-card {
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .breakdown-title {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .breakdown-pills {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }

        .pill.p1 {
          background: rgba(0, 245, 255, 0.12);
          color: var(--accent-cyan);
        }

        .pill.draw {
          background: rgba(255, 183, 3, 0.12);
          color: var(--accent-amber);
        }

        .pill.p2 {
          background: rgba(168, 85, 247, 0.12);
          color: var(--accent-o-color);
        }

        .modal-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 10px;
          display: flex;
          justify-content: flex-end;
        }

        .reset-stats-btn {
          font-size: 0.75rem;
          color: var(--accent-danger);
          border-color: rgba(255, 51, 102, 0.3);
        }

        .reset-stats-btn:hover {
          background: rgba(255, 51, 102, 0.15);
          border-color: var(--accent-danger);
        }
      `}</style>
    </div>
  );
}


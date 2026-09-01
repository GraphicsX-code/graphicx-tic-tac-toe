import React from 'react';
import { X, Play, Trash2, History, Shield, Trophy } from 'lucide-react';
import { AVATAR_OPTIONS } from '../../hooks/useGame';

export function HistoryModal({
  isOpen,
  onClose,
  matchHistory,
  onLaunchReplay,
  onClearHistory,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content history-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <History size={20} className="modal-icon" />
            <h3 className="modal-title">MATCH LOGS ({matchHistory.length})</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* History List */}
        <div className="history-list-container">
          {matchHistory.length === 0 ? (
            <div className="empty-history">
              <History size={36} className="empty-icon" />
              <p>NO ENGAGEMENTS RECORDED YET</p>
              <small>Play matches to populate your tactical battle logs.</small>
            </div>
          ) : (
            <div className="history-list">
              {matchHistory.map((match) => {
                const p1Icon = AVATAR_OPTIONS.find((a) => a.id === match.p1Avatar)?.icon || '🎮';
                const p2Icon = AVATAR_OPTIONS.find((a) => a.id === match.p2Avatar)?.icon || '🤖';

                return (
                  <div key={match.id} className="history-item">
                    <div className="history-item-left">
                      <div className="match-players">
                        <span className="player-tag">
                          {p1Icon} {match.p1Name}
                        </span>
                        <span className="vs-tag">vs</span>
                        <span className="player-tag">
                          {p2Icon} {match.p2Name}
                        </span>
                      </div>
                      <div className="match-meta">
                        <span>{match.date} {match.time}</span>
                        <span>•</span>
                        <span>{match.gridSize}×{match.gridSize} Grid</span>
                        <span>•</span>
                        <span>{match.movesCount} Moves ({match.durationSeconds}s)</span>
                      </div>
                    </div>

                    <div className="history-item-right">
                      <div className={`outcome-badge ${match.winner}`}>
                        {match.winner === 'draw' ? (
                          <>
                            <Shield size={12} /> DRAW
                          </>
                        ) : (
                          <>
                            <Trophy size={12} /> {match.winnerName}
                          </>
                        )}
                      </div>

                      <button
                        type="button"
                        className="cyber-btn replay-btn"
                        onClick={() => {
                          onLaunchReplay(match);
                        }}
                        title="Replay this match"
                      >
                        <Play size={13} />
                        <span>REPLAY</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {matchHistory.length > 0 && (
          <div className="modal-footer">
            <button type="button" className="cyber-btn clear-btn" onClick={onClearHistory}>
              <Trash2 size={14} /> CLEAR HISTORY
            </button>
          </div>
        )}
      </div>

      <style>{`
        .history-modal {
          max-width: 520px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 12px;
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

        .history-list-container {
          overflow-y: auto;
          max-height: 55vh;
          padding-right: 4px;
        }

        .empty-history {
          text-align: center;
          padding: 36px 16px;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .empty-icon {
          opacity: 0.3;
          margin-bottom: 4px;
        }

        .empty-history p {
          font-family: var(--font-display);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .empty-history small {
          font-family: var(--font-mono);
          font-size: 0.7rem;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .history-item {
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          transition: border-color var(--transition-fast);
        }

        .history-item:hover {
          border-color: rgba(0, 245, 255, 0.3);
        }

        .history-item-left {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .match-players {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .vs-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .match-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-secondary);
        }

        .history-item-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .outcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .outcome-badge.p1 {
          background: rgba(0, 245, 255, 0.15);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 245, 255, 0.4);
        }

        .outcome-badge.p2 {
          background: rgba(168, 85, 247, 0.15);
          color: var(--accent-o-color);
          border: 1px solid rgba(168, 85, 247, 0.4);
        }

        .outcome-badge.draw {
          background: rgba(255, 183, 3, 0.15);
          color: var(--accent-amber);
          border: 1px solid rgba(255, 183, 3, 0.4);
        }

        .replay-btn {
          padding: 4px 8px;
          font-size: 0.7rem;
          background: var(--surface);
          gap: 4px;
        }

        .modal-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 10px;
          display: flex;
          justify-content: flex-end;
        }

        .clear-btn {
          font-size: 0.75rem;
          color: var(--accent-danger);
          border-color: rgba(255, 51, 102, 0.3);
        }

        .clear-btn:hover {
          background: rgba(255, 51, 102, 0.15);
          border-color: var(--accent-danger);
        }
      `}</style>
    </div>
  );
}


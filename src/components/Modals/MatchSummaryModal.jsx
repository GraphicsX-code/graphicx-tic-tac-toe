import React, { useState } from 'react';
import { Trophy, Share2, RotateCcw, ArrowRight, Check, Sparkles, Clock, Layers, Shield } from 'lucide-react';
import { AVATAR_OPTIONS } from '../../hooks/useGame';

export function MatchSummaryModal({
  isOpen,
  onClose,
  winnerInfo,
  isDraw,
  player1,
  player2,
  gameMode,
  seriesMode,
  seriesScores,
  seriesTargetWins,
  seriesChampion,
  roundNumber,
  moveHistory,
  onNextRound,
  onRestartSeries,
  onReturnToSetup,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isP1Win = winnerInfo && winnerInfo.winner === player1.marker;
  const isP2Win = winnerInfo && winnerInfo.winner === player2.marker;
  const winner = isP1Win ? player1 : isP2Win ? player2 : null;
  const isAi = gameMode === 'ai';

  const p1Icon = AVATAR_OPTIONS.find((a) => a.id === player1.avatar)?.icon || '🎮';
  const p2Icon = AVATAR_OPTIONS.find((a) => a.id === player2.avatar)?.icon || (isAi ? '🤖' : '🎮');

  // Copy result string to clipboard
  const handleShareResult = () => {
    let outcomeText = '';
    if (seriesChampion) {
      const champName = seriesChampion === 'p1' ? player1.name : isAi ? 'Cyber AI' : player2.name;
      outcomeText = `🏆 Series Champion: ${champName} won the ${seriesMode.toUpperCase()} series (${seriesScores.p1}-${seriesScores.p2})!`;
    } else if (winner) {
      outcomeText = `🎉 ${winner.name} won Round #${roundNumber} in ${moveHistory.length} moves!`;
    } else {
      outcomeText = `⚔️ Stalemate in Round #${roundNumber} (${moveHistory.length} moves).`;
    }

    const shareText = `🎮 GraphicX // TIC-TAC-TOE MATCH RESULT\n` +
      `${outcomeText}\n` +
      `📊 Series Score: ${player1.name} (${seriesScores.p1}) vs ${isAi ? 'Cyber AI' : player2.name} (${seriesScores.p2}) [Ties: ${seriesScores.draws}]\n` +
      `⚡ Built by GraphicX`;

    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content summary-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header Badge */}
        <div className="summary-badge">
          {seriesChampion ? (
            <div className="champion-tag">
              <Trophy size={16} /> SERIES CONCLUDED
            </div>
          ) : (
            <div className="round-tag">
              <Sparkles size={14} /> ROUND #{roundNumber} SUMMARY
            </div>
          )}
        </div>

        {/* Winner Announcement */}
        <div className="winner-showcase">
          {seriesChampion ? (
            <>
              <div
                className="winner-avatar"
                style={{
                  borderColor: seriesChampion === 'p1' ? player1.color : player2.color,
                  boxShadow: `0 0 25px ${seriesChampion === 'p1' ? player1.color : player2.color}`,
                }}
              >
                <span className="avatar-emoji">
                  {seriesChampion === 'p1' ? p1Icon : p2Icon}
                </span>
              </div>
              <h2 className="winner-name">
                {seriesChampion === 'p1' ? player1.name : isAi ? 'CYBER AI' : player2.name}
              </h2>
              <div className="series-crown">
                <Trophy size={18} /> SERIES CHAMPION
              </div>
            </>
          ) : winner ? (
            <>
              <div
                className="winner-avatar"
                style={{
                  borderColor: winner.color,
                  boxShadow: `0 0 25px ${winner.color}`,
                }}
              >
                <span className="avatar-emoji">
                  {isP1Win ? p1Icon : p2Icon}
                </span>
              </div>
              <h2 className="winner-name">{winner.name}</h2>
              <div className="winner-sub">VICTORY ACHIEVED</div>
            </>
          ) : (
            <>
              <div className="winner-avatar draw-avatar">
                <Shield size={36} className="shield-icon" />
              </div>
              <h2 className="winner-name">STALEMATE</h2>
              <div className="winner-sub">TACTICAL DRAW</div>
            </>
          )}
        </div>

        {/* Series Scoreboard Progress */}
        <div className="series-hud-bar">
          <div className="series-player-stat">
            <span className="p-icon">{p1Icon}</span>
            <span className="p-name">{player1.name}</span>
            <span className="p-score" style={{ color: player1.color }}>{seriesScores.p1}</span>
          </div>

          <div className="series-vs-pill">
            <span>VS</span>
            <small>{seriesMode === 'single' ? '1-GAME' : seriesMode.toUpperCase()}</small>
          </div>

          <div className="series-player-stat">
            <span className="p-score" style={{ color: player2.color }}>{seriesScores.p2}</span>
            <span className="p-name">{isAi ? 'Cyber AI' : player2.name}</span>
            <span className="p-icon">{p2Icon}</span>
          </div>
        </div>

        {/* Match Metadata Stats */}
        <div className="match-meta-grid">
          <div className="meta-card">
            <Layers size={14} className="meta-icon" />
            <span className="meta-val">{moveHistory.length}</span>
            <span className="meta-lbl">TOTAL MOVES</span>
          </div>
          <div className="meta-card">
            <Shield size={14} className="meta-icon" />
            <span className="meta-val">{seriesScores.draws}</span>
            <span className="meta-lbl">STALEMATES</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="summary-actions">
          <button type="button" className="cyber-btn share-btn" onClick={handleShareResult}>
            {copied ? <Check size={16} color="var(--accent-success)" /> : <Share2 size={16} />}
            <span>{copied ? 'COPIED RESULT!' : 'SHARE RESULT'}</span>
          </button>

          {seriesChampion ? (
            <button type="button" className="cyber-btn cyber-btn-primary rematch-btn" onClick={onRestartSeries}>
              <RotateCcw size={16} />
              <span>SERIES REMATCH</span>
            </button>
          ) : (
            <button type="button" className="cyber-btn cyber-btn-primary next-round-btn" onClick={onNextRound}>
              <span>NEXT ROUND</span>
              <ArrowRight size={16} />
            </button>
          )}

          <button type="button" className="setup-link-btn" onClick={onReturnToSetup}>
            Return to Setup / Main Menu
          </button>
        </div>
      </div>

      <style>{`
        .summary-modal {
          max-width: 440px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .summary-badge {
          display: inline-flex;
        }

        .round-tag, .champion-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .round-tag {
          background: rgba(0, 245, 255, 0.15);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 245, 255, 0.4);
        }

        .champion-tag {
          background: rgba(255, 183, 3, 0.2);
          color: var(--accent-amber);
          border: 1px solid var(--accent-amber);
          box-shadow: 0 0 15px rgba(255, 183, 3, 0.3);
        }

        .winner-showcase {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .winner-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--surface-elevated);
          border: 3px solid var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .avatar-emoji {
          font-size: 2.2rem;
        }

        .draw-avatar {
          border-color: var(--accent-amber);
          box-shadow: 0 0 20px rgba(255, 183, 3, 0.3);
        }

        .draw-avatar .shield-icon {
          color: var(--accent-amber);
        }

        .winner-name {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1;
        }

        .winner-sub {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-cyan);
          letter-spacing: 0.12em;
        }

        .series-crown {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--accent-amber);
          letter-spacing: 0.1em;
        }

        .series-hud-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 10px 14px;
        }

        .series-player-stat {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .p-icon {
          font-size: 1.2rem;
        }

        .p-name {
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          max-width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .p-score {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 900;
        }

        .series-vs-pill {
          display: flex;
          flex-direction: column;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .match-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }

        .meta-card {
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .meta-icon {
          color: var(--accent-cyan);
        }

        .meta-val {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 900;
          color: var(--text-primary);
        }

        .meta-lbl {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--text-muted);
        }

        .summary-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          margin-top: 4px;
        }

        .share-btn {
          width: 100%;
          border-color: rgba(0, 245, 255, 0.4);
        }

        .next-round-btn, .rematch-btn {
          width: 100%;
          height: 44px;
        }

        .setup-link-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          cursor: pointer;
          padding: 4px;
          transition: color var(--transition-fast);
        }

        .setup-link-btn:hover {
          color: var(--accent-cyan);
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}


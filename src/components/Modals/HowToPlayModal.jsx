import React from 'react';
import { X, HelpCircle, Target, Zap, RotateCcw, Lightbulb, Keyboard, Grid3x3 } from 'lucide-react';

export function HowToPlayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content how-to-play-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <HelpCircle size={20} className="modal-icon" />
            <h3 className="modal-title">TACTICAL PROTOCOLS // HOW TO PLAY</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="how-to-play-body">
          {/* Objective */}
          <div className="guide-card">
            <div className="guide-card-header">
              <Target size={16} className="guide-icon" />
              <h4>PRIMARY OBJECTIVE</h4>
            </div>
            <p>
              Deploy your cyber markers onto the matrix. Form an unbroken line horizontally, vertically, or diagonally before your opponent to achieve victory.
            </p>
          </div>

          {/* Board Win Rules */}
          <div className="guide-card">
            <div className="guide-card-header">
              <Grid3x3 size={16} className="guide-icon" />
              <h4>GRID MATRIX RULES</h4>
            </div>
            <ul className="guide-list">
              <li><strong>3×3 Grid:</strong> Connect <strong>3</strong> markers in a row to win.</li>
              <li><strong>4×4 Grid:</strong> Connect <strong>4</strong> markers in a row to win.</li>
              <li><strong>5×5 Grid:</strong> Connect <strong>4</strong> markers in a row for fast tactical dominance.</li>
            </ul>
          </div>

          {/* Tactical Features */}
          <div className="guide-card">
            <div className="guide-card-header">
              <Zap size={16} className="guide-icon" />
              <h4>TACTICAL POWERUPS</h4>
            </div>
            <div className="features-mini-grid">
              <div className="feature-item">
                <Lightbulb size={16} color="var(--accent-success)" />
                <div>
                  <strong>HINT (H):</strong> Scans the neural board and highlights the optimal strategic move.
                </div>
              </div>
              <div className="feature-item">
                <RotateCcw size={16} color="var(--accent-cyan)" />
                <div>
                  <strong>UNDO (U):</strong> Rewinds the last move (or both player & AI moves).
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="guide-card">
            <div className="guide-card-header">
              <Keyboard size={16} className="guide-icon" />
              <h4>KEYBOARD SHORTCUTS</h4>
            </div>
            <div className="shortcuts-table">
              <div className="shortcut-row">
                <kbd>1</kbd>–<kbd>9</kbd> / <kbd>NUMPAD</kbd>
                <span>Deploy marker on corresponding grid cell</span>
              </div>
              <div className="shortcut-row">
                <kbd>R</kbd>
                <span>Reboot round (New Round)</span>
              </div>
              <div className="shortcut-row">
                <kbd>U</kbd>
                <span>Undo previous move</span>
              </div>
              <div className="shortcut-row">
                <kbd>H</kbd>
                <span>Calculate & highlight tactical hint</span>
              </div>
              <div className="shortcut-row">
                <kbd>ESC</kbd>
                <span>Close any open modal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="cyber-btn cyber-btn-primary" onClick={onClose}>
            ACKNOWLEDGED
          </button>
        </div>
      </div>

      <style>{`
        .how-to-play-modal {
          max-width: 500px;
          max-height: 88vh;
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
          font-size: 1rem;
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

        .how-to-play-body {
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-right: 4px;
        }

        .guide-card {
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .guide-card-header {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .guide-icon {
          color: var(--accent-cyan);
        }

        .guide-card h4 {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-primary);
          letter-spacing: 0.06em;
        }

        .guide-card p {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .guide-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .guide-list strong {
          color: var(--accent-cyan);
        }

        .features-mini-grid {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .feature-item strong {
          color: var(--text-primary);
        }

        .shortcuts-table {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .shortcut-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-secondary);
        }

        .shortcut-row kbd {
          background: var(--surface);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: var(--accent-cyan);
          padding: 2px 6px;
          border-radius: 3px;
          font-weight: 700;
          font-size: 0.65rem;
        }

        .modal-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 10px;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
}


import React from 'react';

export function Footer() {
  return (
    <footer className="footer-container">
      {/* Keyboard Shortcuts Hint Bar */}
      <div className="shortcuts-hint">
        <div className="hint-item">
          <kbd>1</kbd>–<kbd>9</kbd> / <kbd>NUMPAD</kbd> <span>MOVE</span>
        </div>
        <div className="hint-divider">•</div>
        <div className="hint-item">
          <kbd>R</kbd> <span>REBOOT</span>
        </div>
        <div className="hint-divider">•</div>
        <div className="hint-item">
          <kbd>U</kbd> <span>UNDO</span>
        </div>
        <div className="hint-divider">•</div>
        <div className="hint-item">
          <kbd>H</kbd> <span>HINT</span>
        </div>
      </div>

      {/* Brand & System Status */}
      <div className="footer-meta">
        <div className="engine-status">
          <span className="live-radar-dot" />
          <span>GRAPHICX NEURAL MATRIX // PROTOCOL ACTIVE</span>
        </div>
        <div className="copyright-tag">
          POWERED BY <strong className="brand-highlight">GRAPHICX</strong> 2026
        </div>
      </div>

      <style>{`
        .footer-container {
          margin-top: auto;
          padding: 14px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          border-top: 1px solid var(--border-subtle);
          background: rgba(10, 15, 24, 0.8);
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 20;
        }

        [data-color-mode="light"] .footer-container {
          background: rgba(255, 255, 255, 0.9);
        }

        .shortcuts-hint {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-secondary);
        }

        .shortcuts-hint kbd {
          background: var(--surface);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: var(--accent-cyan);
          padding: 1px 5px;
          border-radius: 3px;
          font-weight: 700;
          font-size: 0.62rem;
        }

        .shortcuts-hint span {
          margin-left: 3px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .hint-divider {
          color: var(--text-muted);
          opacity: 0.5;
        }

        .footer-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 800px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .engine-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.08em;
        }

        .live-radar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-cyan);
          box-shadow: 0 0 6px var(--accent-cyan);
        }

        .brand-highlight {
          color: var(--accent-cyan);
          font-family: var(--font-display);
          letter-spacing: 0.08em;
        }

        @media (max-width: 640px) {
          .footer-container {
            padding: 10px 14px;
          }
          .shortcuts-hint {
            display: none;
          }
          .footer-meta {
            flex-direction: column;
            gap: 4px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}

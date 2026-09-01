import React from 'react';
import {
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Settings,
  HelpCircle,
  History,
  BarChart3,
  SlidersHorizontal,
} from 'lucide-react';

export function Header({
  gameStarted,
  colorMode,
  setColorMode,
  soundEnabled,
  toggleSound,
  onOpenSettings,
  onOpenHowToPlay,
  onOpenHistory,
  onOpenStats,
  onReturnToSetup,
}) {
  return (
    <header className="header-container">
      {/* Brand & Wordmark */}
      <div className="brand-section">
        <button
          type="button"
          className="brand-link-btn"
          onClick={onReturnToSetup}
          title="Return to Main Menu"
        >
          <div className="brand-badge">
            <span className="brand-name">
              GRAPHIC<span className="brand-x">X</span>
            </span>
            <span className="brand-sub">TACTICAL PROTOCOL</span>
          </div>
        </button>
      </div>

      {/* Header Quick Controls */}
      <div className="header-controls">
        {/* Setup / Menu button (when in arena) */}
        {gameStarted && (
          <button
            type="button"
            className="icon-btn"
            onClick={onReturnToSetup}
            title="Setup / Change Config"
            aria-label="Setup"
          >
            <SlidersHorizontal size={16} />
          </button>
        )}

        {/* Match History */}
        <button
          type="button"
          className="icon-btn"
          onClick={onOpenHistory}
          title="Match Logs & Replays"
          aria-label="Match History"
        >
          <History size={16} />
        </button>

        {/* Stats */}
        <button
          type="button"
          className="icon-btn"
          onClick={onOpenStats}
          title="Lifetime Stats"
          aria-label="Statistics"
        >
          <BarChart3 size={16} />
        </button>

        {/* How to Play */}
        <button
          type="button"
          className="icon-btn"
          onClick={onOpenHowToPlay}
          title="How to Play & Shortcuts"
          aria-label="How to Play"
        >
          <HelpCircle size={16} />
        </button>

        {/* Dark / Light Toggle */}
        <button
          type="button"
          className="icon-btn"
          onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
          title={colorMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Dark/Light Mode"
        >
          {colorMode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Sound Toggle */}
        <button
          type="button"
          className={`icon-btn ${soundEnabled ? 'active' : 'muted'}`}
          onClick={toggleSound}
          title={soundEnabled ? 'Mute Audio FX' : 'Unmute Audio FX'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Full Settings */}
        <button
          type="button"
          className="icon-btn"
          onClick={onOpenSettings}
          title="System Settings"
          aria-label="Settings"
        >
          <Settings size={16} />
        </button>
      </div>

      <style>{`
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: rgba(10, 15, 24, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
          z-index: 50;
        }

        [data-color-mode="light"] .header-container {
          background: rgba(255, 255, 255, 0.9);
        }

        .brand-section {
          display: flex;
          align-items: center;
        }

        .brand-link-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          text-align: left;
        }

        .brand-badge {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          color: var(--text-primary);
          line-height: 1;
        }

        .brand-x {
          color: var(--accent-cyan);
          text-shadow: 0 0 12px var(--accent-cyan);
        }

        .brand-sub {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          color: var(--accent-cyan);
          opacity: 0.85;
          margin-top: 2px;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .icon-btn {
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .icon-btn:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 8px var(--accent-cyan-dim);
        }

        .icon-btn.active {
          color: var(--accent-cyan);
        }

        .icon-btn.muted {
          color: var(--text-muted);
          opacity: 0.6;
        }

        @media (max-width: 640px) {
          .header-container {
            padding: 10px 12px;
          }
          .brand-name {
            font-size: 1.1rem;
          }
          .icon-btn {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </header>
  );
}

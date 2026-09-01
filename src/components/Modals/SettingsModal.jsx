import React from 'react';
import { X, Settings, Palette, Sun, Moon, Volume2, VolumeX, Grid3x3, Clock, Gauge, RotateCcw } from 'lucide-react';

export function SettingsModal({
  isOpen,
  onClose,
  theme,
  setTheme,
  colorMode,
  setColorMode,
  soundEnabled,
  toggleSound,
  timerOption,
  setTimerOption,
  gridSize,
  setGridSize,
  aiDifficulty,
  setAiDifficulty,
  onResetAllData,
}) {
  if (!isOpen) return null;

  const themes = [
    { id: 'cyberpunk', name: 'Cyberpunk', color: '#00F5FF' },
    { id: 'neon-matrix', name: 'Neon Matrix', color: '#39FF88' },
    { id: 'minimal', name: 'Minimal Slate', color: '#38BDF8' },
    { id: 'classic', name: 'Arcade Classic', color: '#3B82F6' },
  ];

  const timerOptions = [
    { value: 0, label: 'OFF' },
    { value: 5, label: '5s' },
    { value: 10, label: '10s' },
    { value: 15, label: '15s' },
    { value: 30, label: '30s' },
  ];

  const gridSizes = [
    { size: 3, label: '3×3 (3 Win)' },
    { size: 4, label: '4×4 (4 Win)' },
    { size: 5, label: '5×5 (4 Win)' },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content settings-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <Settings size={20} className="modal-icon" />
            <h3 className="modal-title">SYSTEM SETTINGS</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="settings-body">
          {/* Theme Section */}
          <div className="setting-group">
            <div className="setting-label">
              <Palette size={15} />
              <span>VISUAL THEME</span>
            </div>
            <div className="theme-grid">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-btn ${theme === t.id ? 'active' : ''}`}
                  onClick={() => setTheme(t.id)}
                >
                  <span className="theme-dot" style={{ backgroundColor: t.color }} />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dark / Light & Sound Row */}
          <div className="setting-row-double">
            {/* Color Mode */}
            <div className="setting-group">
              <div className="setting-label">
                {colorMode === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
                <span>COLOR MODE</span>
              </div>
              <div className="mode-pill-toggle">
                <button
                  type="button"
                  className={`pill-btn ${colorMode === 'dark' ? 'active' : ''}`}
                  onClick={() => setColorMode('dark')}
                >
                  <Moon size={13} /> DARK
                </button>
                <button
                  type="button"
                  className={`pill-btn ${colorMode === 'light' ? 'active' : ''}`}
                  onClick={() => setColorMode('light')}
                >
                  <Sun size={13} /> LIGHT
                </button>
              </div>
            </div>

            {/* Sound FX */}
            <div className="setting-group">
              <div className="setting-label">
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span>AUDIO FX</span>
              </div>
              <button
                type="button"
                className={`cyber-btn audio-toggle-btn ${soundEnabled ? 'active' : ''}`}
                onClick={toggleSound}
              >
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span>{soundEnabled ? 'ENABLED' : 'MUTED'}</span>
              </button>
            </div>
          </div>

          {/* Move Timer */}
          <div className="setting-group">
            <div className="setting-label">
              <Clock size={15} />
              <span>TURN TIMER LIMIT</span>
            </div>
            <div className="pills-row">
              {timerOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`pill-btn ${timerOption === opt.value ? 'active' : ''}`}
                  onClick={() => setTimerOption(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Size */}
          <div className="setting-group">
            <div className="setting-label">
              <Grid3x3 size={15} />
              <span>DEFAULT BOARD DIMENSION</span>
            </div>
            <div className="pills-row">
              {gridSizes.map((g) => (
                <button
                  key={g.size}
                  type="button"
                  className={`pill-btn ${gridSize === g.size ? 'active' : ''}`}
                  onClick={() => setGridSize(g.size)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Difficulty */}
          <div className="setting-group">
            <div className="setting-label">
              <Gauge size={15} />
              <span>AI NEURAL LEVEL</span>
            </div>
            <div className="pills-row">
              <button
                type="button"
                className={`pill-btn ${aiDifficulty === 'easy' ? 'active' : ''}`}
                onClick={() => setAiDifficulty('easy')}
              >
                CADET
              </button>
              <button
                type="button"
                className={`pill-btn ${aiDifficulty === 'medium' ? 'active' : ''}`}
                onClick={() => setAiDifficulty('medium')}
              >
                TACTICAL
              </button>
              <button
                type="button"
                className={`pill-btn ${aiDifficulty === 'hard' ? 'active' : ''}`}
                onClick={() => setAiDifficulty('hard')}
              >
                UNBEATABLE
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="cyber-btn danger-btn" onClick={onResetAllData}>
            <RotateCcw size={14} /> RESET ALL GAME DATA
          </button>
        </div>
      </div>

      <style>{`
        .settings-modal {
          max-width: 480px;
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

        .settings-body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .setting-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .setting-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-secondary);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .theme-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .theme-btn {
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 8px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 0.75rem;
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-btn:hover {
          border-color: rgba(0, 245, 255, 0.4);
        }

        .theme-btn.active {
          border-color: var(--accent-cyan);
          background: rgba(0, 245, 255, 0.12);
          box-shadow: 0 0 10px rgba(0, 245, 255, 0.2);
        }

        .theme-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          box-shadow: 0 0 6px currentColor;
        }

        .setting-row-double {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .mode-pill-toggle, .pills-row {
          display: flex;
          background: var(--surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 3px;
          gap: 3px;
        }

        .pill-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 6px 8px;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          transition: all var(--transition-fast);
        }

        .pill-btn:hover {
          color: var(--text-primary);
        }

        .pill-btn.active {
          background: rgba(0, 245, 255, 0.15);
          color: var(--accent-cyan);
          box-shadow: 0 0 8px rgba(0, 245, 255, 0.2);
        }

        .audio-toggle-btn {
          height: 38px;
          font-size: 0.75rem;
        }

        .modal-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 10px;
          display: flex;
          justify-content: flex-end;
        }

        .danger-btn {
          font-size: 0.75rem;
          color: var(--accent-danger);
          border-color: rgba(255, 51, 102, 0.3);
        }

        .danger-btn:hover {
          background: rgba(255, 51, 102, 0.15);
          border-color: var(--accent-danger);
        }
      `}</style>
    </div>
  );
}


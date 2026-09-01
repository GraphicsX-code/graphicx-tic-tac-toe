import React from 'react';
import { AlertTriangle, X, Check } from 'lucide-react';

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon-wrapper">
          <AlertTriangle size={32} className="warning-icon" />
        </div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button type="button" className="cyber-btn" onClick={onCancel}>
            <X size={15} /> CANCEL
          </button>
          <button type="button" className="cyber-btn confirm-danger-btn" onClick={onConfirm}>
            <Check size={15} /> CONFIRM
          </button>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(5, 7, 13, 0.78);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
        }

        .modal-content {
          background: var(--surface);
          border: 1px solid var(--border-glow);
          border-radius: var(--radius-lg);
          padding: 24px;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
          animation: modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          position: relative;
        }

        .confirm-modal {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .confirm-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255, 183, 3, 0.15);
          border: 1px solid var(--accent-amber);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .warning-icon {
          color: var(--accent-amber);
          filter: drop-shadow(0 0 8px var(--accent-amber));
        }

        .confirm-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .confirm-message {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .confirm-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
          width: 100%;
        }

        .confirm-actions .cyber-btn {
          flex: 1;
        }

        .confirm-danger-btn {
          background: rgba(255, 51, 102, 0.2);
          border-color: var(--accent-danger);
          color: var(--accent-danger);
        }

        .confirm-danger-btn:hover {
          background: var(--accent-danger);
          color: #FFF;
          box-shadow: 0 0 15px rgba(255, 51, 102, 0.4);
        }
      `}</style>
    </div>
  );
}


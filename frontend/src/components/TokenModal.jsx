import { useState } from 'react';
import useStore from '../store/useStore';
import './TokenModal.css';

export default function TokenModal({ open, onClose }) {
  const githubToken = useStore((s) => s.githubToken);
  const setGithubToken = useStore((s) => s.setGithubToken);
  const [inputVal, setInputVal] = useState(githubToken);
  const [show, setShow] = useState(false);

  if (!open) return null;

  const handleSave = () => {
    setGithubToken(inputVal.trim());
    onClose();
  };

  const handleClear = () => {
    setInputVal('');
    setGithubToken('');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Dialog */}
      <div className="token-modal animate-fade-in-up" role="dialog" aria-label="GitHub Token" aria-modal="true">
        <div className="token-modal-header">
          <h2 className="token-modal-title">🔑 GitHub Token <span className="tag tag-primary">Optional</span></h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="token-modal-body">
          <div className="token-info-card">
            <p>
              GitHub's unauthenticated API allows <strong>60 requests/hour</strong>.
              Adding a personal access token increases this to <strong>5,000/hour</strong>.
            </p>
            <ul className="token-info-list">
              <li>✅ Stored only in your browser (localStorage)</li>
              <li>✅ Never sent to any server</li>
              <li>✅ Only <code>public_repo</code> read scope needed</li>
              <li>✅ You can clear it at any time</li>
            </ul>
          </div>

          <label className="token-label" htmlFor="input-github-token">
            Personal Access Token (classic)
          </label>
          <div className="token-input-wrap">
            <input
              id="input-github-token"
              type={show ? 'text' : 'password'}
              className="input token-input"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            <button
              className="token-show-btn"
              onClick={() => setShow(!show)}
              aria-label={show ? 'Hide token' : 'Show token'}
            >
              {show ? '🙈' : '👁️'}
            </button>
          </div>

          <a
            href="https://github.com/settings/tokens/new?description=Anti+Gravity+Open+Source+Finder&scopes=public_repo"
            target="_blank"
            rel="noopener noreferrer"
            className="token-create-link"
          >
            Create a token on GitHub →
          </a>
        </div>

        <div className="token-modal-footer">
          {githubToken && (
            <button id="btn-clear-token" className="btn btn-danger btn-sm" onClick={handleClear}>
              Clear Token
            </button>
          )}
          <button id="btn-cancel-token" className="btn btn-ghost btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            id="btn-save-token"
            className="btn btn-primary btn-sm"
            onClick={handleSave}
            disabled={!inputVal.trim()}
          >
            Save Token
          </button>
        </div>
      </div>
    </>
  );
}

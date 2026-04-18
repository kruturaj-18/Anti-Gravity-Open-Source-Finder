import { useState } from 'react';
import useStore from '../store/useStore';
import './Navbar.css';

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function Navbar({ onTokenClick }) {
  const savedIssues = useStore((s) => s.savedIssues);
  const setSavedPanelOpen = useStore((s) => s.setSavedPanelOpen);
  const savedPanelOpen = useStore((s) => s.savedPanelOpen);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <span className="navbar-logo-icon">⚡</span>
          <span className="navbar-logo-text">Anti Gravity</span>
        </a>

        {/* Right actions */}
        <div className="navbar-actions">
          {/* Privacy badge */}
          <div className="navbar-privacy-badge">
            <LockIcon />
            <span>0 data stored</span>
          </div>

          {/* Token button */}
          <button
            id="btn-github-token"
            className="btn btn-ghost btn-sm navbar-token-btn"
            onClick={onTokenClick}
            title="Add GitHub token for higher rate limits"
          >
            🔑 Token
          </button>

          {/* Saved issues */}
          <button
            id="btn-saved-issues"
            className="btn btn-ghost btn-sm navbar-saved-btn"
            onClick={() => setSavedPanelOpen(!savedPanelOpen)}
          >
            🔖 Saved
            {savedIssues.length > 0 && (
              <span className="navbar-saved-badge">{savedIssues.length}</span>
            )}
          </button>

          {/* GitHub link */}
          <a
            id="link-github-repo"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-github-link"
            title="View on GitHub"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}

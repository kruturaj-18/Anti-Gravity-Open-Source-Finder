import './Footer.css';

const PRIVACY_ITEMS = [
  'No signup or account required',
  'No analytics or tracking by default',
  'No server-side logging of searches',
  'All data lives only in your browser',
];

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* Privacy pledge */}
        <div className="footer-pledge glass">
          <div className="footer-pledge-header">
            <span className="footer-pledge-icon">🔒</span>
            <div>
              <h3 className="footer-pledge-title">We don't want your data.</h3>
              <p className="footer-pledge-subtitle">
                <em>What you search stays yours.</em>
              </p>
            </div>
          </div>
          <ul className="footer-pledge-list">
            {PRIVACY_ITEMS.map((item) => (
              <li key={item} className="footer-pledge-item">
                <span className="footer-pledge-check">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="footer-privacy-link"
            onClick={(e) => e.preventDefault()}
          >
            Read our 5-line privacy policy →
          </a>
        </div>

        {/* Bottom row */}
        <div className="footer-bottom">
          <div className="footer-logo">
            <span className="footer-logo-icon">⚡</span>
            <span className="footer-logo-text">Anti Gravity</span>
          </div>

          <p className="footer-tagline">
            Discover your next open source contribution. Zero friction. Zero data leaks.
          </p>

          <div className="footer-links">
            <a
              id="link-footer-github"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <GitHubIcon />
              GitHub
            </a>
            <span className="footer-separator">·</span>
            <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            <span className="footer-separator">·</span>
            <span className="footer-gdpr">GDPR + CCPA compliant by design</span>
          </div>

          <p className="footer-credit">
            Built with ⚡ by the community · Open source forever · No VC money, no data selling
          </p>
        </div>
      </div>
    </footer>
  );
}

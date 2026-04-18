import './EmptyState.css';

const illustrations = {
  empty: (
    <svg className="empty-illustration" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Space background stars */}
      <circle cx="20" cy="20" r="1.5" fill="#a855f7" opacity="0.6" />
      <circle cx="180" cy="40" r="1" fill="#22d3ee" opacity="0.5" />
      <circle cx="160" cy="15" r="2" fill="#a855f7" opacity="0.4" />
      <circle cx="40" cy="130" r="1.5" fill="#22d3ee" opacity="0.5" />
      <circle cx="170" cy="140" r="1" fill="#a855f7" opacity="0.6" />
      {/* Planet */}
      <circle cx="100" cy="80" r="40" fill="url(#planetGrad)" />
      <ellipse cx="100" cy="80" rx="60" ry="12" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.5" />
      {/* Astronaut */}
      <circle cx="100" cy="50" r="10" fill="#1e1e3f" stroke="#a855f7" strokeWidth="1.5" />
      <rect x="92" y="60" width="16" height="18" rx="4" fill="#1e1e3f" stroke="#a855f7" strokeWidth="1.5" />
      <line x1="92" y1="65" x2="82" y2="72" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="108" y1="65" x2="118" y2="72" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="96" y1="78" x2="93" y2="92" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="104" y1="78" x2="107" y2="92" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
      {/* Helmet visor */}
      <circle cx="100" cy="49" r="5" fill="#22d3ee" opacity="0.3" />
      <defs>
        <radialGradient id="planetGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#2d1b69" />
          <stop offset="100%" stopColor="#0d0d1f" />
        </radialGradient>
      </defs>
    </svg>
  ),
  error: (
    <svg className="empty-illustration" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="1.5" fill="#f43f5e" opacity="0.6" />
      <circle cx="180" cy="40" r="1" fill="#f43f5e" opacity="0.5" />
      <circle cx="160" cy="15" r="2" fill="#f59e0b" opacity="0.4" />
      <circle cx="100" cy="80" r="40" fill="url(#errPlanetGrad)" />
      <text x="88" y="88" fontSize="32" fill="#f43f5e" opacity="0.8">⚠</text>
      <defs>
        <radialGradient id="errPlanetGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#2d0d1a" />
          <stop offset="100%" stopColor="#0d0d1f" />
        </radialGradient>
      </defs>
    </svg>
  ),
};

export default function EmptyState({ type = 'empty', title, message }) {
  return (
    <div className="empty-state animate-fade-in">
      {illustrations[type]}
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>

      {type === 'empty' && (
        <div className="empty-state-suggestions">
          <p className="empty-suggestions-label">Try these popular stacks:</p>
          <div className="empty-suggestion-tags">
            {['Python', 'JavaScript', 'TypeScript', 'Go', 'Rust'].map((s) => (
              <span key={s} className="tag tag-primary">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

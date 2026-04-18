import './HeroSection.css';

const TRUST_BADGES = [
  { icon: '🔒', text: 'No account required' },
  { icon: '🚫', text: 'No personal data collected' },
  { icon: '🧠', text: 'Your searches stay in your browser' },
];

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Particle dots (CSS only) */}
      <div className="hero-particles" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="hero-particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="container hero-content">
        <div className="hero-eyebrow animate-fade-in-up">
          <span className="hero-eyebrow-dot" />
          Open Source Finder
        </div>

        <h1 className="hero-title animate-fade-in-up" style={{ animationDelay: '0.08s' }}>
          Find issues that{' '}
          <span className="gradient-text">fit you</span>
          {' '}—<br className="hero-br" />
          without the weight<br className="hero-br-sm" />
          {' '}of surveillance.
        </h1>

        <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.16s' }}>
          Anti Gravity matches you with <strong>beginner-friendly GitHub issues</strong> based
          on your tech stack and skill level. No signup. No tracking. No noise.
        </p>

        <div className="hero-trust-badges animate-fade-in-up" style={{ animationDelay: '0.24s' }}>
          {TRUST_BADGES.map((b) => (
            <div key={b.text} className="hero-trust-badge">
              <span>{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <span>Select your stack below</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

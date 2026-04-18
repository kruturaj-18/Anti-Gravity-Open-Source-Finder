import useStore from '../store/useStore';
import './SkillSlider.css';

const SKILL_LEVELS = [
  {
    value: 'beginner',
    label: 'Beginner',
    icon: '🌱',
    description: 'Good first issue, docs, simple bugs',
    color: '#10b981',
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    icon: '⚡',
    description: 'Help wanted, medium complexity',
    color: '#f59e0b',
  },
  {
    value: 'advanced',
    label: 'Advanced',
    icon: '🔥',
    description: 'Complex features, architecture work',
    color: '#f43f5e',
  },
];

export default function SkillSlider() {
  const skillLevel = useStore((s) => s.skillLevel);
  const setSkillLevel = useStore((s) => s.setSkillLevel);

  const currentIndex = SKILL_LEVELS.findIndex((s) => s.value === skillLevel);
  const current = SKILL_LEVELS[currentIndex] || SKILL_LEVELS[0];

  const handleSlider = (e) => {
    const idx = parseInt(e.target.value, 10);
    setSkillLevel(SKILL_LEVELS[idx].value);
  };

  return (
    <div className="skill-slider-card">
      <div className="skill-slider-header">
        <h2 className="skill-slider-title">
          <span>{current.icon}</span>
          Skill Level
        </h2>
        <div className="skill-current-badge" style={{ color: current.color, borderColor: current.color + '40', background: current.color + '14' }}>
          {current.label}
        </div>
      </div>

      <p className="skill-slider-desc">{current.description}</p>

      {/* Slider */}
      <div className="skill-slider-track-wrap">
        <div className="skill-slider-labels">
          {SKILL_LEVELS.map((s, i) => (
            <button
              key={s.value}
              id={`skill-${s.value}`}
              className={`skill-label-btn ${skillLevel === s.value ? 'skill-label-btn--active' : ''}`}
              onClick={() => setSkillLevel(s.value)}
              style={skillLevel === s.value ? { color: s.color } : {}}
            >
              <span className="skill-label-icon">{s.icon}</span>
              <span className="skill-label-text">{s.label}</span>
            </button>
          ))}
        </div>

        <div className="skill-slider-track">
          <div
            className="skill-slider-fill"
            style={{
              width: `${(currentIndex / (SKILL_LEVELS.length - 1)) * 100}%`,
              background: current.color,
              boxShadow: `0 0 12px ${current.color}66`,
            }}
          />
          <input
            id="slider-skill-level"
            type="range"
            min={0}
            max={SKILL_LEVELS.length - 1}
            step={1}
            value={currentIndex}
            onChange={handleSlider}
            className="skill-slider-input"
            aria-label="Skill level"
          />
        </div>
      </div>
    </div>
  );
}

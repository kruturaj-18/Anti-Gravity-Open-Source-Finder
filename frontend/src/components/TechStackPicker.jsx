import { useState } from 'react';
import useStore from '../store/useStore';
import './TechStackPicker.css';

export const POPULAR_TECHS = [
  { name: 'JavaScript', icon: '🟨' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Python', icon: '🐍' },
  { name: 'Rust', icon: '🦀' },
  { name: 'Go', icon: '🐹' },
  { name: 'Java', icon: '☕' },
  { name: 'C++', icon: '⚙️' },
  { name: 'C#', icon: '💜' },
  { name: 'Ruby', icon: '💎' },
  { name: 'PHP', icon: '🐘' },
  { name: 'Swift', icon: '🍎' },
  { name: 'Kotlin', icon: '🎯' },
  { name: 'React', icon: '⚛️' },
  { name: 'Vue', icon: '💚' },
  { name: 'Angular', icon: '🔴' },
  { name: 'Svelte', icon: '🔥' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Django', icon: '🎸' },
  { name: 'Flask', icon: '🧪' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'Node.js', icon: '🟩' },
  { name: 'Dart', icon: '🎯' },
  { name: 'Elixir', icon: '💧' },
  { name: 'Haskell', icon: 'λ' },
];

export default function TechStackPicker() {
  const selectedStack = useStore((s) => s.selectedStack);
  const toggleStackItem = useStore((s) => s.toggleStackItem);
  const addCustomStack = useStore((s) => s.addCustomStack);

  const [customInput, setCustomInput] = useState('');

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      addCustomStack(customInput.trim());
      setCustomInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddCustom(e);
  };

  // Extra selected tags not in the popular list
  const extraTags = selectedStack.filter(
    (s) => !POPULAR_TECHS.find((t) => t.name === s)
  );

  return (
    <div className="stack-picker">
      <div className="stack-picker-header">
        <h2 className="stack-picker-title">
          <span className="stack-picker-title-icon">🔧</span>
          Your Tech Stack
        </h2>
        <p className="stack-picker-subtitle">
          Select one or more technologies. We'll find real open issues that match.
        </p>
      </div>

      {/* Popular techs grid */}
      <div className="stack-grid" role="group" aria-label="Tech stack picker">
        {POPULAR_TECHS.map((tech) => {
          const isSelected = selectedStack.includes(tech.name);
          return (
            <button
              key={tech.name}
              id={`tech-${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`stack-tag ${isSelected ? 'stack-tag--selected' : ''}`}
              onClick={() => toggleStackItem(tech.name)}
              aria-pressed={isSelected}
            >
              <span className="stack-tag-icon">{tech.icon}</span>
              <span className="stack-tag-name">{tech.name}</span>
              {isSelected && <span className="stack-tag-check">✓</span>}
            </button>
          );
        })}

        {/* Extra custom tags */}
        {extraTags.map((tag) => (
          <button
            key={tag}
            className="stack-tag stack-tag--selected stack-tag--custom"
            onClick={() => toggleStackItem(tag)}
            aria-pressed={true}
          >
            <span className="stack-tag-name">{tag}</span>
            <span className="stack-tag-check">✕</span>
          </button>
        ))}
      </div>

      {/* Custom input */}
      <div className="stack-custom-input-row">
        <input
          id="input-custom-tech"
          type="text"
          className="input stack-custom-input"
          placeholder="Add another tech (e.g. Zig, Gleam, Elixir…)"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          id="btn-add-custom-tech"
          className="btn btn-secondary"
          onClick={handleAddCustom}
          disabled={!customInput.trim()}
        >
          + Add
        </button>
      </div>

      {/* Selection summary */}
      {selectedStack.length > 0 && (
        <div className="stack-selection-summary">
          <span className="stack-selection-label">Selected:</span>
          {selectedStack.map((s) => (
            <span key={s} className="tag tag-primary">
              {s}
              <button
                className="stack-remove-btn"
                onClick={() => toggleStackItem(s)}
                aria-label={`Remove ${s}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

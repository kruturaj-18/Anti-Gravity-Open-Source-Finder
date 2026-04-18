import { useState } from 'react';
import useStore from '../store/useStore';
import './FilterPanel.css';

export default function FilterPanel() {
  const [open, setOpen] = useState(false);
  const filters = useStore((s) => s.filters);
  const setFilter = useStore((s) => s.setFilter);

  const activeCount = [
    filters.staleDays !== 30,
    filters.excludeCLA,
    filters.minStars > 0,
  ].filter(Boolean).length;

  return (
    <div className="filter-panel">
      <button
        id="btn-toggle-filters"
        className={`filter-toggle ${open ? 'filter-toggle--open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="filter-toggle-icon">⚙️</span>
        <span>Advanced Filters</span>
        {activeCount > 0 && (
          <span className="filter-active-badge">{activeCount} active</span>
        )}
        <svg
          className={`filter-chevron ${open ? 'filter-chevron--open' : ''}`}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="filter-body animate-fade-in-up">
          {/* Stale days */}
          <div className="filter-row">
            <div className="filter-label-wrap">
              <label className="filter-label" htmlFor="filter-stale-days">
                🕐 Last activity within
              </label>
              <span className="filter-value-badge">{filters.staleDays} days</span>
            </div>
            <input
              id="filter-stale-days"
              type="range"
              min={7}
              max={365}
              step={7}
              value={filters.staleDays}
              onChange={(e) => setFilter('staleDays', Number(e.target.value))}
              className="filter-range"
            />
            <div className="filter-range-labels">
              <span>7 days</span>
              <span>1 year</span>
            </div>
          </div>

          <div className="filter-divider" />

          {/* Min stars */}
          <div className="filter-row">
            <div className="filter-label-wrap">
              <label className="filter-label" htmlFor="filter-min-stars">
                ⭐ Minimum repo stars
              </label>
              <span className="filter-value-badge">
                {filters.minStars === 0 ? 'Any' : filters.minStars === 100 ? '100+' : filters.minStars + '+'}
              </span>
            </div>
            <div className="filter-star-options">
              {[
                { label: 'Any', value: 0 },
                { label: '10+', value: 10 },
                { label: '100+', value: 100 },
                { label: '1k+', value: 1000 },
              ].map((opt) => (
                <button
                  key={opt.value}
                  id={`filter-stars-${opt.value}`}
                  className={`filter-option-btn ${filters.minStars === opt.value ? 'filter-option-btn--active' : ''}`}
                  onClick={() => setFilter('minStars', opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-divider" />

          {/* Exclude CLA */}
          <div className="filter-row filter-row--inline">
            <div>
              <label className="filter-label" htmlFor="filter-exclude-cla">
                📄 Exclude repos requiring CLA
              </label>
              <p className="filter-hint">Avoid repos with Contributor License Agreements</p>
            </div>
            <label className="toggle-switch">
              <input
                id="filter-exclude-cla"
                type="checkbox"
                checked={filters.excludeCLA}
                onChange={(e) => setFilter('excludeCLA', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {/* Reset */}
          {activeCount > 0 && (
            <button
              id="btn-reset-filters"
              className="btn btn-ghost btn-sm filter-reset-btn"
              onClick={() => {
                setFilter('staleDays', 30);
                setFilter('excludeCLA', false);
                setFilter('minStars', 0);
              }}
            >
              ↺ Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

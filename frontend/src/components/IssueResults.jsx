import IssueCard from './IssueCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import './IssueResults.css';

export default function IssueResults({ issues, isLoading, error, hasSearched }) {
  if (isLoading) {
    return (
      <section className="results-section">
        <div className="results-header">
          <div className="results-loading-msg">
            <span className="spinner" />
            Searching across 80,000+ repos…
          </div>
        </div>
        <div className="results-grid stagger-children">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="results-section">
        <EmptyState
          type="error"
          title="Oops — something went wrong"
          message={error}
        />
      </section>
    );
  }

  if (hasSearched && issues.length === 0) {
    return (
      <section className="results-section">
        <EmptyState
          type="empty"
          title="No issues found"
          message="Try adding Python or JavaScript to your stack, or broaden your filters."
        />
      </section>
    );
  }

  if (!hasSearched) {
    return null;
  }

  return (
    <section className="results-section" id="results">
      <div className="results-header">
        <h2 className="results-title">
          <span className="results-count">{issues.length}</span>
          {' '}issues found
        </h2>
        <p className="results-subtitle">
          Sorted by recent activity · All data is fetched fresh from GitHub
        </p>
      </div>

      <div className="results-grid stagger-children">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </section>
  );
}

import useStore from '../store/useStore';
import IssueCard from './IssueCard';
import './SavedIssues.css';

export default function SavedIssues() {
  const savedIssues = useStore((s) => s.savedIssues);
  const savedPanelOpen = useStore((s) => s.savedPanelOpen);
  const setSavedPanelOpen = useStore((s) => s.setSavedPanelOpen);
  const removeSavedIssue = useStore((s) => s.removeSavedIssue);

  return (
    <>
      {/* Backdrop */}
      {savedPanelOpen && (
        <div
          className="saved-backdrop"
          onClick={() => setSavedPanelOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside className={`saved-panel ${savedPanelOpen ? 'saved-panel--open' : ''}`} aria-label="Saved issues">
        <div className="saved-panel-header">
          <div>
            <h2 className="saved-panel-title">🔖 Saved Issues</h2>
            <p className="saved-panel-subtitle">
              {savedIssues.length} issue{savedIssues.length !== 1 ? 's' : ''} · stored in your browser
            </p>
          </div>
          <button
            id="btn-close-saved"
            className="btn btn-ghost btn-sm saved-close-btn"
            onClick={() => setSavedPanelOpen(false)}
            aria-label="Close saved panel"
          >
            ✕
          </button>
        </div>

        <div className="saved-panel-body">
          {savedIssues.length === 0 ? (
            <div className="saved-empty">
              <span className="saved-empty-icon">🔖</span>
              <p>No saved issues yet.</p>
              <p className="saved-empty-hint">Click the bookmark icon on any issue to save it here.</p>
            </div>
          ) : (
            <div className="saved-list">
              {savedIssues.map((issue) => (
                <div key={issue.id} className="saved-item">
                  <div className="saved-item-info">
                    <a
                      href={issue.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="saved-item-title"
                    >
                      {issue.title}
                    </a>
                    <span className="saved-item-repo">
                      {issue.owner}/{issue.repo}
                    </span>
                  </div>
                  <button
                    className="saved-remove-btn"
                    onClick={() => removeSavedIssue(issue.id)}
                    aria-label="Remove saved issue"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="saved-panel-footer">
          <p className="saved-privacy-note">
            🔒 Saved only in your browser's local storage. Never sent anywhere.
          </p>
          {savedIssues.length > 0 && (
            <button
              id="btn-clear-saved"
              className="btn btn-danger btn-sm"
              onClick={() => {
                savedIssues.forEach((i) => removeSavedIssue(i.id));
              }}
            >
              Clear all
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

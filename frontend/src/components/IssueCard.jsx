import { estimateDifficulty, timeAgo, formatNum } from '../utils/difficulty';
import useStore from '../store/useStore';
import './IssueCard.css';

// Convert GitHub label hex color to CSS
const hexToFilter = (hex) => {
  // Determine if label color is light or dark
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#1a1a2e' : '#ffffff';
};

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CommentIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const BookmarkIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function IssueCard({ issue }) {
  const saveIssue = useStore((s) => s.saveIssue);
  const removeSavedIssue = useStore((s) => s.removeSavedIssue);
  const isIssueSaved = useStore((s) => s.isIssueSaved);
  const showFeedback = useStore((s) => s.showFeedback);
  const feedbackMap = useStore((s) => s.feedbackMap);

  const difficulty = estimateDifficulty(issue);
  const isSaved = isIssueSaved(issue.id);
  const hasFeedback = feedbackMap[issue.id];

  const handleBookmark = (e) => {
    e.preventDefault();
    if (isSaved) removeSavedIssue(issue.id);
    else saveIssue(issue);
  };

  const handleOpen = () => {
    showFeedback(issue.id);
    window.open(issue.url, '_blank', 'noopener,noreferrer');
  };

  // Limit to max 3 visible labels
  const visibleLabels = issue.labels.slice(0, 3);
  const extraLabels = issue.labels.length - 3;

  return (
    <article className="issue-card">
      {/* Top section */}
      <div className="issue-card-top">
        <div className="issue-card-meta">
          <a
            href={issue.repoUrl}
            className="issue-card-repo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {issue.owner}/{issue.repo}
          </a>

          {issue.stars !== null && (
            <span className="issue-card-stars">
              <StarIcon />
              {formatNum(issue.stars)}
            </span>
          )}

          {issue.comments > 0 && (
            <span className="issue-card-comments">
              <CommentIcon />
              {issue.comments}
            </span>
          )}
        </div>

        {/* Bookmark */}
        <button
          className={`issue-bookmark-btn ${isSaved ? 'issue-bookmark-btn--saved' : ''}`}
          onClick={handleBookmark}
          aria-label={isSaved ? 'Remove from saved' : 'Save for later'}
          title={isSaved ? 'Remove from saved' : 'Save for later'}
        >
          <BookmarkIcon filled={isSaved} />
        </button>
      </div>

      {/* Title */}
      <h3 className="issue-card-title">
        <button className="issue-title-btn" onClick={handleOpen}>
          {issue.title}
        </button>
      </h3>

      {/* Repo description */}
      {issue.repoDescription && (
        <p className="issue-card-desc">{issue.repoDescription}</p>
      )}

      {/* Footer */}
      <div className="issue-card-footer">
        {/* Labels */}
        <div className="issue-card-labels">
          {visibleLabels.map((label) => (
            <span
              key={label.name}
              className="issue-label"
              style={{
                background: `#${label.color}22`,
                color: `#${label.color}`,
                borderColor: `#${label.color}44`,
              }}
            >
              {label.name}
            </span>
          ))}
          {extraLabels > 0 && (
            <span className="issue-label issue-label--extra">+{extraLabels}</span>
          )}
        </div>

        <div className="issue-card-right">
          {/* Difficulty badge */}
          <span
            className="issue-difficulty-badge"
            style={{
              color: difficulty.color,
              background: difficulty.bgColor,
              borderColor: difficulty.borderColor,
            }}
          >
            {difficulty.icon} {difficulty.level}
          </span>

          {/* Time */}
          <span className="issue-card-time">{timeAgo(issue.updatedAt)}</span>
        </div>
      </div>

      {/* Open button */}
      <div className="issue-card-actions">
        {hasFeedback && (
          <span className="issue-feedback-given">
            {hasFeedback === 'up' ? '👍' : '👎'} Feedback given
          </span>
        )}
        <button
          id={`btn-open-issue-${issue.id}`}
          className="btn btn-primary btn-sm issue-open-btn"
          onClick={handleOpen}
        >
          Open in GitHub <ExternalIcon />
        </button>
      </div>
    </article>
  );
}

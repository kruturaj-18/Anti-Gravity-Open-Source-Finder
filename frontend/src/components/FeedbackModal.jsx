import { useEffect } from 'react';
import useStore from '../store/useStore';
import './FeedbackModal.css';

export default function FeedbackModal() {
  const feedbackIssueId = useStore((s) => s.feedbackIssueId);
  const submitFeedback = useStore((s) => s.submitFeedback);
  const hideFeedback = useStore((s) => s.hideFeedback);

  // Auto-dismiss after 8s
  useEffect(() => {
    if (!feedbackIssueId) return;
    const timer = setTimeout(() => hideFeedback(), 8000);
    return () => clearTimeout(timer);
  }, [feedbackIssueId, hideFeedback]);

  if (!feedbackIssueId) return null;

  return (
    <div className="feedback-toast animate-fade-in-up" role="dialog" aria-label="Feedback">
      <p className="feedback-question">Was this actually beginner-friendly?</p>
      <div className="feedback-actions">
        <button
          id="btn-feedback-up"
          className="feedback-btn feedback-btn--up"
          onClick={() => submitFeedback(feedbackIssueId, 'up')}
          aria-label="Yes, beginner-friendly"
        >
          👍 Yes
        </button>
        <button
          id="btn-feedback-down"
          className="feedback-btn feedback-btn--down"
          onClick={() => submitFeedback(feedbackIssueId, 'down')}
          aria-label="No, not beginner-friendly"
        >
          👎 No
        </button>
        <button
          className="feedback-dismiss"
          onClick={hideFeedback}
          aria-label="Dismiss feedback"
          title="Dismiss"
        >
          ✕
        </button>
      </div>
      <p className="feedback-note">Anonymous · helps improve rankings</p>
    </div>
  );
}

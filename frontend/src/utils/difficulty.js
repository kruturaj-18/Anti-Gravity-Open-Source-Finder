/**
 * Difficulty heuristic for GitHub issues.
 * Uses label names, comment count, reaction count, and title keywords.
 */

const BEGINNER_LABELS = [
  'good first issue', 'good-first-issue', 'low hanging fruit',
  'easy', 'starter', 'beginner', 'beginner friendly', 'beginner-friendly',
  'newbie', 'first-time', 'first timers only',
];

const INTERMEDIATE_LABELS = [
  'help wanted', 'help-wanted', 'up for grabs', 'contributions welcome',
  'medium', 'moderate',
];

const ADVANCED_LABELS = [
  'complex', 'hard', 'advanced', 'performance', 'security',
  'refactor', 'architecture', 'breaking change',
];

const COMPLEXITY_KEYWORDS = {
  beginner: ['typo', 'docs', 'documentation', 'readme', 'example', 'test', 'simple', 'small'],
  intermediate: ['fix', 'bug', 'improve', 'update', 'add feature', 'enhancement'],
  advanced: ['refactor', 'architecture', 'performance', 'security', 'rewrite', 'optimize', 'breaking'],
};

/**
 * Returns { level: 'Beginner' | 'Intermediate' | 'Advanced', color, bgColor, score }
 */
export const estimateDifficulty = (issue) => {
  let score = 0; // lower = easier

  const labelNames = (issue.labels || []).map((l) =>
    (l.name || '').toLowerCase()
  );
  const titleLower = (issue.title || '').toLowerCase();

  // Label analysis
  if (labelNames.some((l) => BEGINNER_LABELS.some((b) => l.includes(b)))) {
    score -= 2;
  }
  if (labelNames.some((l) => INTERMEDIATE_LABELS.some((i) => l.includes(i)))) {
    score += 1;
  }
  if (labelNames.some((l) => ADVANCED_LABELS.some((a) => l.includes(a)))) {
    score += 3;
  }

  // Title keyword analysis
  if (COMPLEXITY_KEYWORDS.beginner.some((kw) => titleLower.includes(kw))) score -= 1;
  if (COMPLEXITY_KEYWORDS.intermediate.some((kw) => titleLower.includes(kw))) score += 0.5;
  if (COMPLEXITY_KEYWORDS.advanced.some((kw) => titleLower.includes(kw))) score += 2;

  // Comment count (proxy for complexity discussion)
  const comments = issue.comments || 0;
  if (comments === 0) score -= 0.5;
  else if (comments <= 3) score += 0;
  else if (comments <= 10) score += 1;
  else score += 2;

  // Reactions (popular = maybe more complex or well-known)
  const reactions = issue.reactions || 0;
  if (reactions > 20) score += 0.5;

  // Classify
  if (score <= 0) {
    return { level: 'Beginner', color: '#10b981', bgColor: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.3)', icon: '🟢' };
  } else if (score <= 2.5) {
    return { level: 'Intermediate', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.3)', icon: '🟡' };
  } else {
    return { level: 'Advanced', color: '#f43f5e', bgColor: 'rgba(244,63,94,0.12)', borderColor: 'rgba(244,63,94,0.3)', icon: '🔴' };
  }
};

/**
 * Returns a human-readable time since a date string.
 */
export const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months >= 1) return `${months}mo ago`;
  if (days >= 1) return `${days}d ago`;
  if (hours >= 1) return `${hours}h ago`;
  return `${mins}m ago`;
};

/**
 * Format large numbers e.g. 12400 → '12.4k'
 */
export const formatNum = (n) => {
  if (n === null || n === undefined) return '—';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
};

import './SkeletonCard.css';

export default function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card-top">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-repo" />
      </div>
      <div className="skeleton skeleton-body" />
      <div className="skeleton-footer">
        <div className="skeleton skeleton-tag" />
        <div className="skeleton skeleton-tag skeleton-tag--short" />
        <div className="skeleton skeleton-badge" />
      </div>
    </div>
  );
}

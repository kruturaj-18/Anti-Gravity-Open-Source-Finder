import { useState } from 'react';
import useStore from './store/useStore';
import { searchGitHubIssues } from './api/github';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TechStackPicker from './components/TechStackPicker';
import SkillSlider from './components/SkillSlider';
import FilterPanel from './components/FilterPanel';
import IssueResults from './components/IssueResults';
import SavedIssues from './components/SavedIssues';
import FeedbackModal from './components/FeedbackModal';
import Footer from './components/Footer';
import TokenModal from './components/TokenModal';
import './App.css';

export default function App() {
  const [tokenModalOpen, setTokenModalOpen] = useState(false);

  // Store state
  const selectedStack = useStore((s) => s.selectedStack);
  const skillLevel = useStore((s) => s.skillLevel);
  const filters = useStore((s) => s.filters);
  const githubToken = useStore((s) => s.githubToken);
  const issues = useStore((s) => s.issues);
  const isLoading = useStore((s) => s.isLoading);
  const error = useStore((s) => s.error);
  const hasSearched = useStore((s) => s.hasSearched);

  // Store actions
  const setIssues = useStore((s) => s.setIssues);
  const setLoading = useStore((s) => s.setLoading);
  const setError = useStore((s) => s.setError);

  const handleSearch = async () => {
    setLoading(true);
    // Scroll to results smoothly
    setTimeout(() => {
      document.getElementById('results-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const results = await searchGitHubIssues(
        selectedStack,
        skillLevel,
        filters,
        githubToken
      );
      setIssues(results);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleRefresh = () => {
    handleSearch();
  };

  return (
    <div className="app">
      {/* Navigation */}
      <Navbar onTokenClick={() => setTokenModalOpen(true)} />

      {/* Hero */}
      <HeroSection />

      {/* Main content */}
      <main className="app-main">
        <div className="container">

          {/* Stack Picker */}
          <TechStackPicker />

          {/* Skill Slider */}
          <SkillSlider />

          {/* Advanced Filters */}
          <FilterPanel />

          {/* Search CTA */}
          <div className="search-cta-wrap">
            <button
              id="btn-find-issues"
              className="btn btn-primary btn-lg search-cta-btn"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" />
                  Searching…
                </>
              ) : (
                <>
                  <span className="search-cta-icon">🔍</span>
                  Find Open Issues
                </>
              )}
            </button>

            {hasSearched && !isLoading && (
              <button
                id="btn-refresh-issues"
                className="btn btn-ghost search-refresh-btn"
                onClick={handleRefresh}
                title="Re-fetch fresh results from GitHub"
              >
                ↺ Find new issues
              </button>
            )}

            {/* Token status pill */}
            {githubToken ? (
              <div className="token-status-pill token-status-pill--active">
                🔑 Token active · 5k req/hr
              </div>
            ) : (
              <button
                className="token-status-pill token-status-pill--inactive"
                onClick={() => setTokenModalOpen(true)}
              >
                ⚠ 60 req/hr · Add token for more
              </button>
            )}
          </div>

          {/* Results anchor */}
          <div id="results-anchor" style={{ marginTop: 0 }} />

          {/* Results */}
          <IssueResults
            issues={issues}
            isLoading={isLoading}
            error={error}
            hasSearched={hasSearched}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays */}
      <SavedIssues />
      <FeedbackModal />
      <TokenModal
        open={tokenModalOpen}
        onClose={() => setTokenModalOpen(false)}
      />
    </div>
  );
}

import { create } from 'zustand';

// ── localStorage helpers ──────────────────────────────────────────────
const LS_KEYS = {
  STACK: 'ag_selected_stack',
  SKILL: 'ag_skill_level',
  SAVED: 'ag_saved_issues',
  TOKEN: 'ag_gh_token',
  FEEDBACK: 'ag_feedback',
};

const loadFromLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const saveToLS = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota exceeded – silent fail */
  }
};

// ── Store ─────────────────────────────────────────────────────────────
const useStore = create((set, get) => ({
  // ── Search state ──
  selectedStack: loadFromLS(LS_KEYS.STACK, []),
  skillLevel: loadFromLS(LS_KEYS.SKILL, 'beginner'),
  filters: {
    staleDays: 30,
    excludeCLA: false,
    minStars: 0,
  },

  // ── Results ──
  issues: [],
  isLoading: false,
  error: null,
  hasSearched: false,

  // ── Saved issues ──
  savedIssues: loadFromLS(LS_KEYS.SAVED, []),
  savedPanelOpen: false,

  // ── Token (optional, localStorage only) ──
  githubToken: loadFromLS(LS_KEYS.TOKEN, ''),

  // ── Feedback ──
  feedbackIssueId: null,
  feedbackMap: loadFromLS(LS_KEYS.FEEDBACK, {}),

  // ── Actions: Stack ──
  setSelectedStack: (stack) => {
    set({ selectedStack: stack });
    saveToLS(LS_KEYS.STACK, stack);
  },

  toggleStackItem: (item) => {
    const current = get().selectedStack;
    const updated = current.includes(item)
      ? current.filter((s) => s !== item)
      : [...current, item];
    set({ selectedStack: updated });
    saveToLS(LS_KEYS.STACK, updated);
  },

  addCustomStack: (item) => {
    if (!item.trim()) return;
    const trimmed = item.trim();
    const current = get().selectedStack;
    if (!current.includes(trimmed)) {
      const updated = [...current, trimmed];
      set({ selectedStack: updated });
      saveToLS(LS_KEYS.STACK, updated);
    }
  },

  // ── Actions: Skill ──
  setSkillLevel: (level) => {
    set({ skillLevel: level });
    saveToLS(LS_KEYS.SKILL, level);
  },

  // ── Actions: Filters ──
  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  // ── Actions: Token ──
  setGithubToken: (token) => {
    set({ githubToken: token });
    saveToLS(LS_KEYS.TOKEN, token);
  },

  // ── Actions: Issues ──
  setIssues: (issues) => set({ issues, isLoading: false, error: null, hasSearched: true }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false, hasSearched: true }),

  // ── Actions: Saved ──
  saveIssue: (issue) => {
    const current = get().savedIssues;
    if (!current.find((i) => i.id === issue.id)) {
      const updated = [issue, ...current];
      set({ savedIssues: updated });
      saveToLS(LS_KEYS.SAVED, updated);
    }
  },

  removeSavedIssue: (issueId) => {
    const updated = get().savedIssues.filter((i) => i.id !== issueId);
    set({ savedIssues: updated });
    saveToLS(LS_KEYS.SAVED, updated);
  },

  isIssueSaved: (issueId) => {
    return get().savedIssues.some((i) => i.id === issueId);
  },

  setSavedPanelOpen: (open) => set({ savedPanelOpen: open }),

  // ── Actions: Feedback ──
  showFeedback: (issueId) => set({ feedbackIssueId: issueId }),
  hideFeedback: () => set({ feedbackIssueId: null }),

  submitFeedback: (issueId, vote) => {
    const updated = { ...get().feedbackMap, [issueId]: vote };
    set({ feedbackMap: updated, feedbackIssueId: null });
    saveToLS(LS_KEYS.FEEDBACK, updated);
  },
}));

export default useStore;

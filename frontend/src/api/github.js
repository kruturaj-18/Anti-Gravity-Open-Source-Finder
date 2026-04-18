// ── GitHub REST API Layer ─────────────────────────────────────────────

const GITHUB_API = 'https://api.github.com';

// Label sets for each skill level
const SKILL_LABELS = {
  beginner: ['"good first issue"', '"low hanging fruit"', '"easy"', '"starter"', '"beginner friendly"'],
  intermediate: ['"help wanted"', '"up for grabs"', '"contributions welcome"'],
  advanced: ['"help wanted"', '"complex"', '"enhancement"'],
};

/**
 * Build the GitHub search query string.
 * @param {string[]} stack  - tech tags
 * @param {string}   skill  - 'beginner' | 'intermediate' | 'advanced'
 * @param {object}   filters
 */
const buildQuery = (stack, skill, filters) => {
  const parts = [
    'is:issue',
    'is:open',
    'no:assignee',
  ];

  // Add label filters
  const labels = SKILL_LABELS[skill] || SKILL_LABELS.beginner;
  const labelQuery = labels.map((l) => `label:${l}`).join(' ');
  parts.push(`(${labelQuery})`);

  // Add language filters from stack
  const languageMap = {
    javascript: 'language:JavaScript',
    typescript: 'language:TypeScript',
    python: 'language:Python',
    rust: 'language:Rust',
    go: 'language:Go',
    java: 'language:Java',
    'c++': 'language:C++',
    'c#': 'language:C#',
    ruby: 'language:Ruby',
    php: 'language:PHP',
    swift: 'language:Swift',
    kotlin: 'language:Kotlin',
    dart: 'language:Dart',
    scala: 'language:Scala',
    'r': 'language:R',
    julia: 'language:Julia',
    elixir: 'language:Elixir',
    haskell: 'language:Haskell',
    lua: 'language:Lua',
    shell: 'language:Shell',
    html: 'language:HTML',
    css: 'language:CSS',
  };

  // Framework → topic map (GitHub topics)
  const topicMap = {
    react: 'topic:react',
    vue: 'topic:vue',
    angular: 'topic:angular',
    nextjs: 'topic:nextjs',
    svelte: 'topic:svelte',
    django: 'topic:django',
    flask: 'topic:flask',
    fastapi: 'topic:fastapi',
    express: 'topic:express',
    nestjs: 'topic:nestjs',
    laravel: 'topic:laravel',
    rails: 'topic:rails',
    spring: 'topic:spring',
    'node.js': 'topic:nodejs',
  };

  const langParts = [];
  const topicParts = [];

  stack.forEach((tech) => {
    const key = tech.toLowerCase();
    if (languageMap[key]) langParts.push(languageMap[key]);
    else if (topicMap[key]) topicParts.push(topicMap[key]);
    else langParts.push(`language:${tech}`);
  });

  // Use first language if multiple (GitHub search limitation)
  if (langParts.length > 0) parts.push(langParts[0]);
  if (topicParts.length > 0) parts.push(topicParts[0]);

  // Stale filter: issues with recent activity
  if (filters.staleDays && filters.staleDays > 0 && filters.staleDays < 365) {
    const staleCutoff = new Date();
    staleCutoff.setDate(staleCutoff.getDate() - filters.staleDays);
    const isoDate = staleCutoff.toISOString().split('T')[0];
    parts.push(`updated:>${isoDate}`);
  }

  // Min stars on the issue (use reactions as proxy)
  if (filters.minStars === 100) {
    parts.push('reactions:>10');
  }

  return parts.join(' ');
};

/**
 * Fetch repo details (stars, description) for an issue.
 * Returns { stars, description } or null on error.
 */
const fetchRepoDetails = async (repoFullName, headers) => {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${repoFullName}`, { headers });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      stars: data.stargazers_count,
      description: data.description,
      topics: data.topics || [],
      forks: data.forks_count,
      openIssues: data.open_issues_count,
    };
  } catch {
    return null;
  }
};

/**
 * Main search function – calls GitHub Search Issues API.
 * @param {string[]} stack
 * @param {string}   skill
 * @param {object}   filters
 * @param {string}   token   - optional PAT
 */
export const searchGitHubIssues = async (stack, skill, filters, token = '') => {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) headers['Authorization'] = `token ${token}`;

  // If no stack selected, use a broad default search
  const effectiveStack = stack.length > 0 ? stack : ['JavaScript'];

  const query = buildQuery(effectiveStack, skill, filters);

  const params = new URLSearchParams({
    q: query,
    sort: 'updated',
    order: 'desc',
    per_page: '24',
  });

  const url = `${GITHUB_API}/search/issues?${params}`;

  const res = await fetch(url, { headers });

  if (!res.ok) {
    if (res.status === 403) {
      const remaining = res.headers.get('X-RateLimit-Remaining');
      if (remaining === '0') {
        throw new Error('GitHub API rate limit reached. Add a GitHub token to increase your limit to 5,000/hour.');
      }
    }
    if (res.status === 422) {
      throw new Error('Search query is too complex. Try removing some filters or using fewer tech tags.');
    }
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    return [];
  }

  // Enrich with repo details (batch, limit to first 12 unique repos)
  const repoNames = [...new Set(data.items.map((i) => i.repository_url.replace(`${GITHUB_API}/repos/`, '')))];
  const repoDetailsMap = {};

  // Fetch repo details in parallel (limited)
  const repoPromises = repoNames.slice(0, 12).map(async (name) => {
    const details = await fetchRepoDetails(name, headers);
    if (details) repoDetailsMap[name] = details;
  });

  await Promise.allSettled(repoPromises);

  return data.items.map((item) => {
    const repoFullName = item.repository_url.replace(`${GITHUB_API}/repos/`, '');
    const repoData = repoDetailsMap[repoFullName] || {};
    const [owner, repo] = repoFullName.split('/');

    return {
      id: item.id,
      number: item.number,
      title: item.title,
      url: item.html_url,
      body: item.body || '',
      labels: item.labels.map((l) => ({ name: l.name, color: l.color })),
      comments: item.comments,
      reactions: item.reactions?.total_count || 0,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      repo: repo,
      owner: owner,
      repoFullName,
      repoUrl: `https://github.com/${repoFullName}`,
      stars: repoData.stars ?? null,
      repoDescription: repoData.description ?? '',
      topics: repoData.topics ?? [],
      forks: repoData.forks ?? null,
    };
  });
};

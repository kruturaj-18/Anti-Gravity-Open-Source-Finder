# Anti Gravity – Open Source Finder

**Discover your next open source contribution. Zero friction. Zero data leaks.**

Anti Gravity helps developers find **beginner-friendly GitHub issues** tailored to their **tech stack**, **skill level**, and **interests** — without ever storing or selling their personal data.

*“Like a job board, but for meaningful open source contributions — and we forget you the moment you leave.”*

## 🚀 Key Features

- **Tech Stack Picker**: Select your preferred technologies (React, Python, Rust, Go, etc.).
- **Skill Level Slider**: Filter by `Beginner`, `Intermediate`, or `Advanced` levels.
- **Advanced Search Filters**: Filter by issue freshness, minimum stars, and exclude repositories with strict CLA requirements.
- **SaaS-Grade UX**: Modern, space-themed dark mode with glassmorphism and smooth animations.
- **Privacy First**: No account required, no tracking, and all data stays in your browser's local storage.
- **Zero-Data Refresh**: Queries the GitHub API fresh every time, with no cache of your searches.

## 🛡️ Privacy & Trust (Non-Negotiable)

- **No user accounts required** – works via session-based state.
- **No tracking pixels, no analytics** – zero telemetry.
- **Data stored locally** – cleared on tab close if preferred, or persists only in your browser's local storage.
- **GDPR + CCPA compliant by design** – because there’s no PII (Personally Identifiable Information) to begin with.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React + Vite |
| **State Management** | Zustand + local storage |
| **API Integration** | GitHub REST API |
| **Styling** | Vanilla CSS (Custom Design System) |
| **Design** | Space/Gravity Theme (Deep Indigo, Neon Purple accents) |

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kruturaj-18/Anti-Gravity-Open-Source-Finder.git
   cd Anti-Gravity-Open-Source-Finder
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔑 GitHub API Limits

By default, the GitHub API allows **60 requests per hour** for unauthenticated requests. 
To increase this limit to **5,000 requests per hour**, you can optionally enter a **Personal Access Token (classic)** in the "🔑 Token" section of the app. 
> [!NOTE]
> Your token is stored only in your browser's local storage and is never sent to our servers.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

## 📄 License

This project is open-source. See the [Privacy Policy](frontend/src/components/Footer.jsx) for our commitment to your data.

---

Built with ⚡ for the open source community.

# Progressly — Personal Growth Platform

Progressly combines a personal journal, portfolio, learning tracker, goals, and a local demo networking space.

## Run in VS Code
1. Open this folder in VS Code.
2. Open Terminal and run `npm install`.
3. Run `npm run dev` and open the local address shown by Vite.
4. Run `npm run build` to check the production build.

## Tech used
- HTML5, CSS3, responsive CSS
- JavaScript and JSX
- React components, props, state (`useState`), effects (`useEffect`), Context API
- React Router for pages and nested layout
- Forms, controlled inputs, search/filter, localStorage and JSON
- Lucide React icons

Redux Toolkit and React Redux have been removed. Shared app data and achievement tracking use the Context API and React state. No TypeScript is used.

## Team division (3 members)

### Member 1 — App shell, navigation and account
**Files:** `src/main.jsx`, `src/components/Login.jsx`, `src/components/Navbar.jsx`, `src/components/Profile.jsx`, `src/components/Privacy.jsx`
**Responsibilities:** login/register UI, navigation and routing, common layout, profile editing, theme/settings/privacy screens, 404 page.
**Topics:** JSX, components, props, state, forms, React Router, responsive layout.

### Member 2 — Learning dashboard and journal
**Files:** `src/components/Dashboard.jsx`, `src/components/Journal.jsx`, `src/components/Skills.jsx`
**Responsibilities:** dashboard summaries, journal create/search/filter/delete, skill tracking and forms.
**Topics:** controlled forms, arrays/objects, events, conditional rendering, search/filter, Context API, localStorage.

### Member 3 — Goals, projects and workspace features
**Files:** `src/pages/WorkspacePages.jsx`, `src/context/AppContext.jsx`, `src/index.css`
**Responsibilities:** goals and milestones, project showcase, achievements, connections, notifications, explore/search/settings pages, shared state and persistence, visual styling.
**Topics:** Context API, state management, CRUD patterns, forms, localStorage/JSON, CSS Grid/Flexbox/media queries.

## Collaboration notes
- Agree on component props and shared state actions before editing.
- Work in separate branches and merge through GitHub.
- Avoid editing the same shared file at the same time; Member 1 owns routing, Member 2 owns the learning components, and Member 3 owns context/workspace styling.
- Connections are demo/local entries only; the app does not contact real users.

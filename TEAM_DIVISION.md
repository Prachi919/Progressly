# Progressly — division of work for 3 team members

The split is by feature ownership so each person has a clear, mostly independent area.

## Member 1 — App structure and account experience
- `src/main.jsx`
- `src/components/Login.jsx`
- `src/components/Navbar.jsx`
- `src/components/Profile.jsx`
- `src/components/Privacy.jsx`
- Owns routing, shared shell, login/register, profile editing, privacy and 404.

## Member 2 — Learning and personal tracking
- `src/components/Dashboard.jsx`
- `src/components/Journal.jsx`
- `src/components/Skills.jsx`
- Owns dashboard, journal CRUD/search/filter, and skills tracking.

## Member 3 — Goals and workspace state
- `src/pages/WorkspacePages.jsx`
- `src/context/AppContext.jsx`
- `src/index.css`
- Owns goals/milestones, projects, achievements, connections, notifications, search/explore/settings, shared Context API state, localStorage persistence and styling.

## Shared integration rules
1. Keep the current CSS class names and JSX structure when changing functionality so the website's appearance stays consistent.
2. Communicate prop names and context action types before integrating changes.
3. Use Git branches and merge one feature at a time.
4. Member 3 coordinates changes to `AppContext.jsx`; other members should request new shared state/actions instead of editing it independently.
5. Run `npm run build` before merging.

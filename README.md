# SiteTrade — Frontend (Vite + React)

A frontend-only website marketplace where users can list and browse websites for sale. All data is mocked — there is no backend yet.

## Tech Stack
- React.js + Vite
- Tailwind CSS
- React Router DOM
- Lucide React (icons)

## 1. Install dependencies

```bash
cd sitetrade
npm install
```

## 2. Run the project (development)

```bash
npm run dev
```

This starts a local dev server (usually at `http://localhost:5173`).

## 3. Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## 4. Where the mock data lives

- **Website listings:** `src/data/websites.js` — an array of website objects (id, name, image, screenshots, category, description, fullDescription, technology, age, hosting, url, price, sellerName, sellerEmail, createdAt). Edit this array directly, or add new objects, to change what appears on Home, Explore, and Website Details.
- **Admin users:** `src/data/users.js` — used by the Admin → Users page.
- **Categories & technologies (for filters):** also exported from `src/data/websites.js` as `categories` and `technologies`.

"My Websites" and "Dashboard" currently show the first few items from `src/data/websites.js` as a stand-in for "the logged-in user's listings" (see `src/pages/Dashboard.jsx` and `src/pages/MyWebsites.jsx`). Login/Register are mocked with `localStorage` only — no real authentication yet.

## 5. Project structure

```
src/
├── components/     Reusable UI: Navbar, Footer, WebsiteCard, SearchBar,
│                   FilterSidebar, Button, Modal, StatsCard, DashboardSidebar,
│                   EmptyState, WebsiteForm
├── data/           Mock data (websites.js, users.js)
├── layouts/        MainLayout (public pages), DashboardLayout, AdminLayout
├── pages/          One file per route
├── utils/          validate.js — shared form validation helpers
├── App.jsx         Route definitions
└── main.jsx        App entry point
```

## 6. Where the backend will connect later

Everything currently reads from `src/data/*.js`. When a backend is ready:
- Replace the static imports (`import { websites } from "@/data/websites"`) with API calls (e.g. `fetch`/`axios`) inside `useEffect`, or migrate to a data-fetching library.
- `Login.jsx` / `Register.jsx` currently write a mock object to `localStorage`; swap this for a real auth request and token storage.
- `WebsiteForm.jsx`'s `onSubmit` and the delete actions in `MyWebsites.jsx` / `AdminUsers.jsx` / `AdminWebsites.jsx` currently update local React state only — these are the places to wire up POST/PUT/DELETE requests.
- The "Contact Seller" modal in `WebsiteDetails.jsx` currently just shows a success message — this is where an email-sending API call would go.

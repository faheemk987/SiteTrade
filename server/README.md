# SiteTrade Backend

A clean, beginner-friendly Node.js + Express + MongoDB backend for the SiteTrade website marketplace. Built to plug directly into the existing SiteTrade React (Vite) frontend.

## 1. Folder Structure

```
server/
├── config/
│   └── db.js                 MongoDB Atlas connection
├── controllers/
│   ├── authController.js     register, login, get current user
│   ├── websiteController.js  create/list/get/update/delete listings
│   ├── userController.js     profile, my-websites
│   └── adminController.js    users, websites, stats
├── middleware/
│   ├── authMiddleware.js     verifies JWT, attaches req.user
│   ├── adminMiddleware.js    restricts routes to role === "admin"
│   └── errorMiddleware.js    404 handler + centralized error responses
├── models/
│   ├── User.js
│   └── Website.js
├── routes/
│   ├── authRoutes.js
│   ├── websiteRoutes.js
│   ├── userRoutes.js
│   └── adminRoutes.js
├── utils/
│   └── generateToken.js      signs a 7-day JWT (userId + role)
├── .env                      (not committed — see below)
├── .gitignore
├── package.json
└── server.js
```

## 2. Install dependencies

```bash
cd server
npm install
```

## 3. Environment variables

Create a `.env` file in `server/` (a `.env.example` is included as a template):

```
PORT=5000
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
CLIENT_URL=http://localhost:5173
```

- `MONGO_URI` — see MongoDB Atlas setup below.
- `JWT_SECRET` — any long random string (e.g. generate one with `openssl rand -base64 32`).
- `CLIENT_URL` — the frontend origin allowed by CORS. Change this to your deployed frontend URL (e.g. a Vercel URL) in production.

**Never commit `.env`** — it's already listed in `.gitignore`.

## 4. MongoDB Atlas setup

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Database Access**, create a database user with a username/password.
3. Under **Network Access**, add your IP (or `0.0.0.0/0` for development) to the IP access list.
4. Click **Connect → Drivers**, copy the connection string, and paste it into `MONGO_URI` in your `.env`. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/sitetrade?retryWrites=true&w=majority
   ```
5. Replace `<username>`, `<password>`, and the cluster URL with your actual values, and pick a database name (e.g. `sitetrade`).

## 5. Start the backend

```bash
npm run dev     # development (auto-restarts on file changes, via nodemon)
npm start       # production
```

You should see:
```
MongoDB connected successfully: <your-cluster-host>
SiteTrade backend running on port 5000
```

Visit `http://localhost:5000/` — you should see:
```json
{ "message": "SiteTrade Backend is Running" }
```

## 6. API Endpoints

All responses follow this shape:
- Success: `{ "success": true, "message": "...", "data": {...} }` (list endpoints also include `"count"`)
- Error: `{ "success": false, "message": "..." }`

### Auth — `/api/auth`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create an account |
| POST | `/api/auth/login` | Public | Log in, get a JWT |
| GET  | `/api/auth/me` | Private | Get the current logged-in user |

**Register** request body:
```json
{ "name": "Faheem", "email": "faheem@example.com", "password": "password123" }
```

**Login** request body:
```json
{ "email": "faheem@example.com", "password": "password123" }
```

Both return:
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": { "id": "...", "name": "Faheem", "email": "faheem@example.com", "role": "user", "token": "<JWT>" }
}
```

### Websites — `/api/websites`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/websites` | Public | List all websites (supports filters below) |
| GET | `/api/websites/:id` | Public | Get one website + basic seller info |
| POST | `/api/websites` | Private | Create a listing (seller = logged-in user) |
| PUT | `/api/websites/:id` | Private (owner/admin) | Update a listing |
| DELETE | `/api/websites/:id` | Private (owner/admin) | Delete a listing |

Query params for `GET /api/websites` (combinable):
- `?search=blog` — matches name, description, or category
- `?category=Blog`
- `?technology=React`
- `?minPrice=1000&maxPrice=5000`

**Create/Update** request body:
```json
{
  "name": "TechBlog Pro",
  "url": "https://example.com",
  "category": "Blog",
  "description": "A modern technology blog.",
  "fullDescription": "A complete technology blog built for publishing articles.",
  "age": "2 years",
  "frontendTechnology": "React",
  "backendTechnology": "Node.js",
  "database": "MongoDB",
  "technology": ["React", "Node.js", "MongoDB"],
  "hosting": "Vercel",
  "screenshots": ["image-url-1", "image-url-2"],
  "price": 5000,
  "sellerEmail": "seller@example.com"
}
```

### Users — `/api/users`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users/profile` | Private | Get your profile |
| PUT | `/api/users/profile` | Private | Update your name/email (not role) |
| GET | `/api/users/my-websites` | Private | Your own listings — powers "My Websites" |

### Admin — `/api/admin`
All routes require a logged-in **admin** user.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/users` | List all users |
| DELETE | `/api/admin/users/:id` | Delete a user (and their listings) |
| GET | `/api/admin/websites` | List all listings |
| DELETE | `/api/admin/websites/:id` | Delete any listing |
| GET | `/api/admin/stats` | `{ totalUsers, totalWebsites, activeListings }` |

To make a user an admin, update their document directly in MongoDB Atlas (set `role: "admin"`) — there's no public endpoint for this, by design.

## 7. Authenticating requests

After login/register, store the returned `token` (e.g. in `localStorage` on the frontend) and send it on every protected request:

```
Authorization: Bearer <token>
```

## 8. Testing the API

Use [Postman](https://www.postman.com/) or `curl`. Suggested test order:

1. **Register** a user → copy the returned `token`.
2. **Login** with the same credentials → confirm you get a token back.
3. **GET `/api/auth/me`** with `Authorization: Bearer <token>` → confirm your user comes back.
4. **POST `/api/websites`** with the token → create a listing.
5. **GET `/api/websites`** (no token needed) → confirm your listing appears; try `?search=`, `?category=`, `?minPrice=`/`?maxPrice=`.
6. **GET `/api/websites/:id`** with the id from step 4.
7. **PUT `/api/websites/:id`** with your token → update a field.
8. Register a **second** user, try to `PUT`/`DELETE` the first user's website with the second user's token → expect `403 Forbidden`.
9. Try any `/api/admin/*` route with a non-admin token → expect `403 Forbidden`.
10. Try a protected route with **no token**, and then with a **malformed token** → expect `401 Unauthorized` in both cases.
11. **GET `/api/users/my-websites`** → confirm only your own listings are returned.

## 9. Connecting the React frontend

In the frontend project, add a `.env` (Vite) with:
```
VITE_API_URL=http://localhost:5000/api
```

Then replace the static imports from `src/data/websites.js` with real requests, e.g.:
```js
const res = await fetch(`${import.meta.env.VITE_API_URL}/websites`);
const { data: websites } = await res.json();
```

- `Login.jsx` / `Register.jsx` → POST to `/api/auth/login` / `/api/auth/register`, store `data.token` (e.g. in `localStorage`) instead of the current mock object.
- `SellWebsite.jsx` (via `WebsiteForm.jsx`) → POST to `/api/websites` with the JWT in the `Authorization` header.
- `EditWebsite.jsx` → PUT to `/api/websites/:id`.
- `MyWebsites.jsx` → GET `/api/users/my-websites`; delete action → DELETE `/api/websites/:id`.
- `Profile.jsx` → GET/PUT `/api/users/profile`.
- `AdminUsers.jsx` / `AdminWebsites.jsx` / `AdminDashboard.jsx` → the corresponding `/api/admin/*` routes.
- The "Contact Seller" form stays frontend-only for now (e.g. via EmailJS) — no backend endpoint is needed for it yet, per the current scope.

## 10. Deployment preparation (Render + MongoDB Atlas)

1. Push this `server/` folder to its own GitHub repository (or a subfolder of your monorepo).
2. On [Render](https://render.com), create a **New Web Service**, connect the repo, and set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. Add environment variables in Render's dashboard (Settings → Environment): `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (set this to your deployed frontend's URL), and `PORT` (Render sets this automatically, but the app already reads `process.env.PORT`).
4. In MongoDB Atlas → Network Access, make sure Render's outbound IPs are allowed (or leave `0.0.0.0/0` open for simplicity while testing).
5. Once deployed, update the frontend's `VITE_API_URL` to point at the Render URL (e.g. `https://sitetrade-backend.onrender.com/api`) and redeploy the frontend.

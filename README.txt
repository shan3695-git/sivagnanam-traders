========================================
 SIVAGNANAM TRADERS — Setup & Deployment
========================================

STEP 1: Install dependencies
  npm install

STEP 2: Create PostgreSQL database
  psql -U postgres -c "CREATE DATABASE sivagnanam_traders;"

STEP 3: Create tables
  psql -U postgres -d sivagnanam_traders -f setup_db.sql

STEP 4: Configure the database connection
  Set DB_PASSWORD in your local environment, or set DATABASE_URL
  to a TLS-enabled PostgreSQL connection string. Never commit credentials.

STEP 5: Start the server
  npm run start:web

STEP 6: Open in browser
  http://localhost:3000

VERCEL WEB DEPLOYMENT
  1. Push this project to a GitHub repository. Keep the repository private
     if it contains business source or customer-related configuration.
  2. Import that repository from the Vercel dashboard.
  3. Add DATABASE_URL in Vercel Project Settings > Environment Variables.
     Use a hosted PostgreSQL provider and its TLS-enabled connection string.
  4. Create the database with setup_db.sql before opening the deployed site.
     The Vercel function creates/updates the expenses table automatically;
     the other application tables must exist from setup_db.sql.
  5. Redeploy after setting environment variables.

  Vercel hosts the web version; it does not run the Electron desktop window.
  The current API has no login/authentication. Do not publish this deployment
  to the public internet with real customer or financial records until access
  control is added or Vercel Deployment Protection is enabled.

==============================
Files in this project:
  server.js      - Express server with all API routes
  api/[...path].js - Vercel serverless API entry point
  db.js          - PostgreSQL connection pool (DATABASE_URL or local settings)
  siva.html      - Main application UI
  setup_db.sql   - Run once to create all tables
  main.js        - Electron desktop entry (optional)
  manifest.json  - PWA manifest
  package.json   - npm dependencies
  vercel.json    - Vercel root-page rewrite

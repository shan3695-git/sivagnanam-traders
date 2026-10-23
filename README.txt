========================================
 SIVAGNANAM TRADERS — PostgreSQL Setup
========================================

STEP 1: Install dependencies
  npm install

STEP 2: Create PostgreSQL database
  psql -U postgres -c "CREATE DATABASE sivagnanam_traders;"

STEP 3: Create tables
  psql -U postgres -d sivagnanam_traders -f setup_db.sql

STEP 4: Edit your credentials in db.js
  Open db.js and set:
    host, port, database, user, password

STEP 5: Start the server
  npm start

STEP 6: Open in browser
  http://localhost:3000

==============================
Files in this project:
  server.js      - Express server with all API routes
  db.js          - PostgreSQL connection pool
  siva.html      - Main application UI
  setup_db.sql   - Run once to create all tables
  main.js        - Electron desktop entry (optional)
  manifest.json  - PWA manifest
  package.json   - npm dependencies

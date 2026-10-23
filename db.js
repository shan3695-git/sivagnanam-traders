const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const poolConfig = connectionString
  ? { connectionString }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME || 'sivagnanam_traders',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || undefined
    };

const pool = new Pool({ ...poolConfig, connectionTimeoutMillis: 5000 });

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err.message);
});

module.exports = pool;

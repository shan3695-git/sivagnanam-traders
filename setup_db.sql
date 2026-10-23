-- ============================================
-- Sivagnanam Traders - PostgreSQL Setup
-- Run this file once to create all tables
-- Command: psql -U postgres -d your_db_name -f setup_db.sql
-- ============================================

CREATE TABLE IF NOT EXISTS stocks (
  id        SERIAL PRIMARY KEY,
  date      DATE NOT NULL,
  type      VARCHAR(100) NOT NULL,
  qty       NUMERIC NOT NULL DEFAULT 0,
  price     NUMERIC NOT NULL DEFAULT 0,
  mrp       NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id        SERIAL PRIMARY KEY,
  date      DATE NOT NULL,
  name      VARCHAR(200) NOT NULL,
  phone     VARCHAR(30),
  address   TEXT,
  gstin     VARCHAR(50),
  deposit   NUMERIC DEFAULT 0,
  old_balance NUMERIC DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE customers ADD COLUMN IF NOT EXISTS old_balance NUMERIC DEFAULT 0;

CREATE TABLE IF NOT EXISTS sales (
  id            SERIAL PRIMARY KEY,
  date          DATE NOT NULL,
  customer_name VARCHAR(200) NOT NULL,
  cylinder_type VARCHAR(100),
  cylinders     NUMERIC NOT NULL DEFAULT 0,
  return_cyl    NUMERIC NOT NULL DEFAULT 0,
  price         NUMERIC NOT NULL DEFAULT 0,
  total         NUMERIC NOT NULL DEFAULT 0,
  paid          NUMERIC NOT NULL DEFAULT 0,
  balance       NUMERIC NOT NULL DEFAULT 0,
  tax_type      VARCHAR(10) NOT NULL DEFAULT 'cgsg',
  created_at    TIMESTAMP DEFAULT NOW()
);

ALTER TABLE sales ADD COLUMN IF NOT EXISTS tax_type VARCHAR(10) NOT NULL DEFAULT 'cgsg';

CREATE TABLE IF NOT EXISTS stock_returns (
  id            SERIAL PRIMARY KEY,
  date          DATE NOT NULL,
  customer_name VARCHAR(200),
  cylinder_type VARCHAR(100),
  qty           NUMERIC NOT NULL DEFAULT 0,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS deposits (
  id            SERIAL PRIMARY KEY,
  date          DATE NOT NULL,
  customer_name VARCHAR(200),
  amount        NUMERIC NOT NULL DEFAULT 0,
  note          TEXT,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expenses (
  id             SERIAL PRIMARY KEY,
  title          VARCHAR(200) NOT NULL,
  category       VARCHAR(100) NOT NULL,
  amount         NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  date           DATE NOT NULL,
  payment_method VARCHAR(100) NOT NULL DEFAULT 'Cash',
  description    TEXT NOT NULL DEFAULT '',
  created_at     TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS expenses_date_id_idx ON expenses (date DESC, id DESC);

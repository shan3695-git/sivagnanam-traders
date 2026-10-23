const express = require('express');
const path    = require('path');
const pool    = require('./db');
const app     = express();
const PORT    = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'siva.html'));
});

// ─── STOCKS ──────────────────────────────────────────────
app.get('/api/stocks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stocks ORDER BY date DESC, id DESC');
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/stocks', async (req, res) => {
  const { date, type, qty, price, mrp } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO stocks (date, type, qty, price, mrp) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [date, type, qty, price, mrp || 0]
    );
    res.json(result.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/stocks/:id', async (req, res) => {
  const { date, type, qty, price, mrp } = req.body;
  try {
    const result = await pool.query(
      'UPDATE stocks SET date=$1, type=$2, qty=$3, price=$4, mrp=$5 WHERE id=$6 RETURNING *',
      [date, type, qty, price, mrp || 0, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/stocks/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM stocks WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── CUSTOMERS ───────────────────────────────────────────
app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY date DESC, id DESC');
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/customers', async (req, res) => {
  const { date, name, phone, address, gstin, deposit, old_balance } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO customers (date, name, phone, address, gstin, deposit, old_balance) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [date, name, phone, address, gstin || '', deposit || 0, old_balance || 0]
    );
    res.json(result.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/customers/:id', async (req, res) => {
  const { date, name, phone, address, gstin, deposit, old_balance } = req.body;
  try {
    const result = await pool.query(
      'UPDATE customers SET date=$1, name=$2, phone=$3, address=$4, gstin=$5, deposit=$6, old_balance=$7 WHERE id=$8 RETURNING *',
      [date, name, phone, address, gstin || '', deposit || 0, old_balance || 0, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM customers WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── SALES ───────────────────────────────────────────────
app.get('/api/sales', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sales ORDER BY date DESC, id DESC');
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/sales', async (req, res) => {
  const { date, customer_name, cylinder_type, tax_type, cylinders, return_cyl, price, total, paid, balance } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO sales (date, customer_name, cylinder_type, tax_type, cylinders, return_cyl, price, total, paid, balance)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [date, customer_name, cylinder_type || '', tax_type || 'cgsg', cylinders, return_cyl || 0, price, total, paid, balance]
    );
    res.json(result.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/sales/:id', async (req, res) => {
  const { date, customer_name, cylinder_type, tax_type, cylinders, return_cyl, price, total, paid, balance } = req.body;
  try {
    const result = await pool.query(
      `UPDATE sales SET date=$1, customer_name=$2, cylinder_type=$3, tax_type=$4, cylinders=$5,
       return_cyl=$6, price=$7, total=$8, paid=$9, balance=$10 WHERE id=$11 RETURNING *`,
      [date, customer_name, cylinder_type || '', tax_type || 'cgsg', cylinders, return_cyl || 0, price, total, paid, balance, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/sales/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM sales WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── STOCK RETURNS ────────────────────────────────────────
app.get('/api/stock-returns', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stock_returns ORDER BY date DESC, id DESC');
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/stock-returns', async (req, res) => {
  const { date, customer_name, cylinder_type, qty } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO stock_returns (date, customer_name, cylinder_type, qty) VALUES ($1,$2,$3,$4) RETURNING *',
      [date, customer_name || '', cylinder_type || '', qty]
    );
    res.json(result.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/stock-returns/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM stock_returns WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── DEPOSITS ────────────────────────────────────────────
app.get('/api/deposits', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM deposits ORDER BY date DESC, id DESC');
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/deposits', async (req, res) => {
  const { date, customer_name, amount, note } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO deposits (date, customer_name, amount, note) VALUES ($1,$2,$3,$4) RETURNING *',
      [date, customer_name || '', amount, note || '']
    );
    res.json(result.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── EXPENSES ────────────────────────────────────────────
app.get('/api/expenses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses ORDER BY date DESC, id DESC');
    res.json(result.rows);
  } catch (e) {
    console.error('Unable to load expenses:', e.message);
    res.status(500).json({ error: 'Unable to load expenses from the database.' });
  }
});

app.post('/api/expenses', async (req, res) => {
  const { title, category, amount, date, paymentMethod, description } = req.body;
  const numericAmount = Number(amount);
  const validDate = typeof date === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(date)
    && !Number.isNaN(Date.parse(`${date}T00:00:00Z`))
    && new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;

  if (typeof title !== 'string' || !title.trim() || title.trim().length > 200) {
    return res.status(400).json({ error: 'Expense title is required and must be 200 characters or fewer.' });
  }
  if (typeof category !== 'string' || !category.trim() || category.trim().length > 100) {
    return res.status(400).json({ error: 'Expense category is required and must be 100 characters or fewer.' });
  }
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: 'Expense amount must be a positive number.' });
  }
  if (!validDate) {
    return res.status(400).json({ error: 'A valid expense date is required in YYYY-MM-DD format.' });
  }
  if (paymentMethod !== undefined && (typeof paymentMethod !== 'string' || paymentMethod.length > 100)) {
    return res.status(400).json({ error: 'Payment method must be 100 characters or fewer.' });
  }
  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ error: 'Expense description must be text.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO expenses (title, category, amount, date, payment_method, description)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title.trim(), category.trim(), numericAmount, date, (paymentMethod || 'Cash').trim(), (description || '').trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    console.error('Unable to save expense:', e.message);
    res.status(500).json({ error: 'Unable to save expense to the database.' });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'A valid expense ID is required.' });
  }

  try {
    const result = await pool.query('DELETE FROM expenses WHERE id=$1 RETURNING id', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Expense not found.' });
    }
    res.json({ success: true });
  } catch (e) {
    console.error('Unable to delete expense:', e.message);
    res.status(500).json({ error: 'Unable to delete expense from the database.' });
  }
});

// ─── BACKUP (export all data as JSON) ────────────────────
app.get('/api/backup', async (req, res) => {
  try {
    const [stocks, sales, customers, deposits, stockReturns, expenses] = await Promise.all([
      pool.query('SELECT * FROM stocks ORDER BY id'),
      pool.query('SELECT * FROM sales ORDER BY id'),
      pool.query('SELECT * FROM customers ORDER BY id'),
      pool.query('SELECT * FROM deposits ORDER BY id'),
      pool.query('SELECT * FROM stock_returns ORDER BY id'),
      pool.query('SELECT * FROM expenses ORDER BY id'),
    ]);
    res.json({
      stocks:       stocks.rows,
      sales:        sales.rows,
      customers:    customers.rows,
      deposits:     deposits.rows,
      stockReturns: stockReturns.rows,
      expenses:     expenses.rows
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

let databaseInitialization;

function initializeDatabase() {
  if (!databaseInitialization) {
    databaseInitialization = (async () => {
      await pool.query('SELECT 1');
      await pool.query('ALTER TABLE customers ADD COLUMN IF NOT EXISTS old_balance NUMERIC NOT NULL DEFAULT 0');
      await pool.query("ALTER TABLE sales ADD COLUMN IF NOT EXISTS tax_type VARCHAR(10) NOT NULL DEFAULT 'cgsg'");
      await pool.query(`
        CREATE TABLE IF NOT EXISTS expenses (
          id             SERIAL PRIMARY KEY,
          title          VARCHAR(200) NOT NULL,
          category       VARCHAR(100) NOT NULL,
          amount         NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
          date           DATE NOT NULL,
          payment_method VARCHAR(100) NOT NULL DEFAULT 'Cash',
          description    TEXT NOT NULL DEFAULT '',
          created_at     TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);
      await pool.query('CREATE INDEX IF NOT EXISTS expenses_date_id_idx ON expenses (date DESC, id DESC)');
    })().catch((error) => {
      databaseInitialization = undefined;
      throw error;
    });
  }
  return databaseInitialization;
}

async function startServer() {
  await initializeDatabase();

  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, () => {
      console.log(`PostgreSQL connected; Sivagnanam Traders running at http://localhost:${PORT}`);
      resolve(server);
    });
    server.once('error', reject);
  });
}

startServer.app = app;
startServer.initializeDatabase = initializeDatabase;

if (require.main === module) {
  startServer().catch((err) => {
    console.error('Unable to start Sivagnanam Traders:', err.message);
    process.exitCode = 1;
  });
}

module.exports = startServer;

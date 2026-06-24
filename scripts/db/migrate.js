const fs = require('fs');
const { Client } = require('pg');

async function run() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Please set DATABASE_URL environment variable.');
    process.exit(1);
  }

  const sqlPath = './supabase/migrations/001_initial_schema.sql';
  if (!fs.existsSync(sqlPath)) {
    console.error('Migration file not found:', sqlPath);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');
  const client = new Client({ connectionString: databaseUrl });

  try {
    await client.connect();
    console.log('Connected to database, running migration...');
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    console.log('Migration applied successfully.');
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Migration failed:', err.message || err);
    process.exitCode = 2;
  } finally {
    await client.end();
  }
}

run();

import { Pool } from 'pg';

const pool = new Pool({
  user: 'openpg',
  host: 'localhost',
  database: 'crud',
  password: 'openpgpwd',
  port: 5432,
});

export default pool;

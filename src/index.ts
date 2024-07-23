import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './db';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/items', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error', err);
    }
  }
});

app.get('/items/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error', err);
    }
  }
});

app.post('/items', async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error', err);
    }
  }
});

app.put('/items/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error', err);
    }
  }
});

app.delete('/items/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error', err);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

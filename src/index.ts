import express, { Application, Request, Response } from 'express';
import sequelize from './config/database';
import userRouter from './routes/user';

const app: Application = express();
const PORT = 3000;

app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('Connection to MySQL has been established successfully.');
    return sequelize.sync(); // This will create the table if it doesn't exist (and do nothing if it already exists)
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });

app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

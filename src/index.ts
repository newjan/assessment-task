import express, { Express, Request, Response } from 'express';
import dotenv from "dotenv";
import { connect, disconnect } from './connect';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 4001;

connect()

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
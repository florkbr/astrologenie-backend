import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

const app: Express = express();

app.use(morgan(isDev ? 'dev' : 'combined'));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
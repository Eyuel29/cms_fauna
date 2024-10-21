import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import routes from './routes';
import morgan from 'morgan';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use('/', routes);
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

export default app;

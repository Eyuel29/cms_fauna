import express, { Request, Response } from "express";
import { faunaClient, q } from './fauna_client';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;

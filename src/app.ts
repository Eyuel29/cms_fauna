import express,{ Request, Response } from "express";
import routes from './routes';
import morgan from 'morgan';
import dotenv from 'dotenv';
import errorHandler from "./middlewares/ErrorHandler";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(morgan("tiny"));
app.use(express.json());

app.use('/', 
    express.Router()
    .use('/api', routes)
);

app.use(errorHandler);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

export default app;
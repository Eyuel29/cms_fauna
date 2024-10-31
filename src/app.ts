import express, {Request, Response} from "express";
import morgan from 'morgan';
import dotenv from 'dotenv';
import errorHandler from "./middlewares/errorHandler";
import router from "./routes";
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(morgan("tiny"));
app.use(express.json());

app.use('/', (req: Request, res: Response) =>{
    res.redirect('/api');
});
app.use('/api', router);

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;
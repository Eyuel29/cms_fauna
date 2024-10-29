import express, {Request, Response} from "express";
import morgan from 'morgan';
import dotenv from 'dotenv';
import errorHandler from "./middlewares/errorHandler";
import router from "./routes";
import session from "express-session";
const app = express();

dotenv.config();
app.use(morgan("tiny"));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSIONS_SECRET ?? "",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 60000
        }
    })
);

app.use('/', (req: Request, res: Response) => res.redirect('/api'));
app.use('/api', router);

app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => console.log(`Server running at http://localhost:${port}`));

export default app;
import express, {Request, Response} from "express";
import morgan from 'morgan';
import dotenv from 'dotenv';
import errorHandler from "./middlewares/errorHandler";
import router from "./routes";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(morgan("tiny"));
app.use(express.json());

app.use('/api', router);
// app.all('/', (req: Request, res: Response) =>{
//     res.send("OK");
// });

app.use(errorHandler);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
export default app;
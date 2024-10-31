import {Client} from 'fauna';
import dotenv from 'dotenv';
dotenv.config();


const faunaClient = new Client(
    {secret: process.env.FAUNA_SERVER_KEY || ""}
);

export default faunaClient;

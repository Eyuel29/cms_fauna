import faunadb from 'faunadb';
import dotenv from 'dotenv';

dotenv.config();

const q = faunadb.query;
const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET || 'YOUR_FAUNA_SECRET'
});

export { faunaClient, q };

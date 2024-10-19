import { Router, Request, Response } from 'express';
import { faunaClient, q } from './fauna_client';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
      res.send("Hii");
    } catch (error) {
      res.status(500).send(error);
    }
});

router.get('/posts', async (req: Request, res: Response) => {
  try {
    const result = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('posts'))),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    );
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});


const createCollection = async () => {
  try {
    const result = await faunaClient.query(
      q.CreateCollection({ name: 'posts' })
    );
    console.log('Collection created:', result);
  } catch (error) {
    console.log('Error creating collection:', error);
  }
}


export default router;

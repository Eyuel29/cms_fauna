import { Router, Request, Response } from 'express';
import { faunaClient, q } from './fauna_client';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
      res.status(200).json({
        success : true,
        message : "HI :)"
      }); 
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error
      });
    }
});

router.get('/blog', async (req: Request, res: Response) => {
  try {
    const result = await faunaClient.query(q.Collection("blog"));
    res.send(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    });
    console.log(error);
    
  }
});

interface BlogPostBody {
  title: string;
  content: string;
}

router.post('/blog', async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(401).json({
        success: false,
        message: "Please provide the required title and content!"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Blog post created successfully",
      data: { title, content }
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    });
  }
});

export default router;

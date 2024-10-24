import { Router, Request, Response } from 'express';
import blogController from './controllers/blog_controller';
const router = Router();
  
router.post('/blog/create', blogController.createBlog);
router.get('/blogs', blogController.getAllBlogs);
router.get('/blog/:id', blogController.getSingleBlog);
router.put('/blog/:id', blogController.updateBlog);
router.delete('/blog/:id', blogController.deleteBlog);
router.post('/blog/upvote/:id', blogController.upVoteBlog);
router.post('/blog/downvote/:id', blogController.downVoteBlog);
router.delete('/blog/:id', blogController.deleteReaction);
router.post('/blog/comment/:id', blogController.commentOnBlog);
router.delete('/blog/comments/:id/:commentId', blogController.deleteComment);   

router.all('/', async (req: Request, res: Response) => {
  res.status(201).json({status: "OK"});
});

export default router;
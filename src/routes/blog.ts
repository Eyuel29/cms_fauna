import { Router } from 'express';
import blogController from '../controllers/blog_controller';
const blogRouter = Router();
  
blogRouter.post('/create', blogController.createBlog);
blogRouter.get('/all', blogController.getAllBlogs);
blogRouter.get('/:id', blogController.getSingleBlog);
blogRouter.put('/:id', blogController.updateBlog);
blogRouter.delete('/:id', blogController.deleteBlog);

export default blogRouter;
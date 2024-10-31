import { Router } from 'express';
import blogController from '../controllers/blog_controller';
const blogRouter = Router();
  
blogRouter.post('/create', blogController.createBlog);
blogRouter.get('/index', blogController.getAllBlogs);
blogRouter.get('/show/:id', blogController.getSingleBlog);
blogRouter.put('/update/:id', blogController.updateBlog);
blogRouter.delete('/delete/:id', blogController.deleteBlog);

export default blogRouter;
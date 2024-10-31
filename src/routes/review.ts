import { Router } from 'express';
import reviewController from '../controllers/review_controller';
const reviewRouter = Router();
  
reviewRouter.post('/create', reviewController.createReview);
reviewRouter.get('/index', reviewController.getAllReview);
reviewRouter.put('/update/:id', reviewController.updateReview);
reviewRouter.delete('/delete/:id', reviewController.deleteReview);

export default reviewRouter;
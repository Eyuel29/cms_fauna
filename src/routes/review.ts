import { Router } from 'express';
import reviewController from '../controllers/review_controller';
const reviewRouter = Router();
  
reviewRouter.post('/create', reviewController.createReview);
reviewRouter.get('/all', reviewController.getAllReview);
reviewRouter.put('/:id', reviewController.updateReview);
reviewRouter.delete('/:id', reviewController.deleteReview);

export default reviewRouter;
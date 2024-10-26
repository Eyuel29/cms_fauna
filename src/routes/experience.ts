import { Router } from 'express';
import experienceController from '../controllers/experience_controller';

const experienceRouter = Router();
  
experienceRouter.post('/create', experienceController.createExprience);
experienceRouter.get('/all', experienceController.getAllExpriences);
experienceRouter.put('/:id', experienceController.updateExprience);
experienceRouter.delete('/:id', experienceController.deleteExprience);

export default experienceRouter;
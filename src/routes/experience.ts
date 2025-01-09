import { Router } from 'express';
import experienceController from '../controllers/experience_controller';

const experienceRouter = Router();
  
experienceRouter.post('/create', experienceController.createExprience);
experienceRouter.get('/index', experienceController.getAllExpriences);
experienceRouter.put('/update/:id', experienceController.updateExprience);
experienceRouter.delete('/delete/:id', experienceController.deleteExprience);

export default experienceRouter;
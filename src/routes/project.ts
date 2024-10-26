import { Router } from 'express';
import projectController from '../controllers/project_controller';
const projectRouter = Router();

projectRouter.post('/create', projectController.createProject);
projectRouter.get('/all', projectController.getAllProject);
projectRouter.put('/:id', projectController.updateProject);
projectRouter.delete('/:id', projectController.deleteProject);

export default projectRouter;
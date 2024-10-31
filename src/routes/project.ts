import { Router } from 'express';
import projectController from '../controllers/project_controller';
const projectRouter = Router();

projectRouter.post('/create', projectController.createProject);
projectRouter.get('/index', projectController.getAllProject);
projectRouter.put('/update/:id', projectController.updateProject);
projectRouter.delete('/delete/:id', projectController.deleteProject);

export default projectRouter;
import { Router } from 'express';
import blogRouter from '../routes/blog';
import certificateRouter from '../routes/certificate';
import experienceRouter from '../routes/experience';
import projectRouter from '../routes/project';
import reviewRouter from '../routes/review';
const router = Router();

router.use('/blog',blogRouter);
router.use('/certificate',certificateRouter);
router.use('/exprience',experienceRouter);
router.use('/project',projectRouter);
router.use('/review',reviewRouter);

export default router;
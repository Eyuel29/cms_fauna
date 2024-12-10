import { Router } from 'express';
import blogRouter from '../routes/blog';
import certificateRouter from '../routes/certificate';
import experienceRouter from '../routes/experience';
import projectRouter from '../routes/project';
import reviewRouter from '../routes/review';
import verifyAuth from '../middlewares/verify_auth';
const router = Router();

router.use('/blog', verifyAuth, blogRouter);
router.use('/certificate',certificateRouter);
router.use('/exprience',experienceRouter);
router.use('/project',projectRouter);
router.use('/review',reviewRouter);

export default router;
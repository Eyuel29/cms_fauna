import { Router } from 'express';
import blogRouter from '../routes/blog';
import certificateRouter from '../routes/certificate';
import experienceRouter from '../routes/experience';
import projectRouter from '../routes/project';
import reviewRouter from '../routes/review';
import verifyAuth from '../middlewares/verify_auth';
const router = Router();

router.use('/blog', verifyAuth, blogRouter);
router.use('/certificate', verifyAuth,certificateRouter);
router.use('/exprience',verifyAuth, experienceRouter);
router.use('/project', verifyAuth, projectRouter);
router.use('/review', verifyAuth, reviewRouter);

export default router;
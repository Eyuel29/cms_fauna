import { Router } from 'express';
import certificateController from '../controllers/certificates_controller';
import { validateCerfiticate } from '../middlewares/validate_files';
const certificateRouter = Router();
  
certificateRouter.post('/create',validateCerfiticate, certificateController.createCertificate);
certificateRouter.get('/index', certificateController.getAllCertificates);
certificateRouter.delete('delete/:id', certificateController.deleteCertificate);

export default certificateRouter;
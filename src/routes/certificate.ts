import { Router } from 'express';
import certificateController from '../controllers/certificates_controller';
const certificateRouter = Router();
  
certificateRouter.post('/create', certificateController.createCertificate);
certificateRouter.get('/all', certificateController.getAllCertificates);
certificateRouter.delete('/:id', certificateController.deleteCertificate);

export default certificateRouter;
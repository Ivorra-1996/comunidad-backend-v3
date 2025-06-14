import express from 'express';
import {
  uploadFoto,
  uploadLogo,
  uploadCV,
  getFiles
} from '../controllers/files';

import { withErrorHandling } from './utils';
import { validateToken } from '../middlewares/validador';
import {multer} from '../middlewares/multer';


const router = express.Router();

router.post('/logo', multer.single("uploadLogo"), withErrorHandling(uploadLogo));
router.post('/cv/', validateToken, multer.single("uploadCV"), withErrorHandling(uploadCV));
router.post('/foto/',validateToken, multer.single("uploadFoto"), withErrorHandling(uploadFoto));
router.get('/', withErrorHandling(getFiles));

export default router;

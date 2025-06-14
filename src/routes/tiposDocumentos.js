import express from 'express';
import {
  getAll,
  getById,
  updateByIdController,
  deleteById,
  createTipoDocumento 
} from '../controllers/tiposDocumentos';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/', withErrorHandling(createTipoDocumento));
router.get('/', withErrorHandling(getAll))
      .get('/:id', withErrorHandling(getById));
router.put('/', withErrorHandling(updateByIdController));
router.delete('/:id', withErrorHandling(deleteById));


export default router;

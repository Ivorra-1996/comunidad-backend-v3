import express from 'express';
import {
  createContrato,
  getAll,
  getContratoById,
  updateContratoById,
  deleteContratoById
} from '../controllers/contratos';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/', withErrorHandling(createContrato));
router.get('/', withErrorHandling(getAll))
      .get('/:id', withErrorHandling(getContratoById));
router.put('/:id', withErrorHandling(updateContratoById));
router.delete('/:id', withErrorHandling(deleteContratoById));

export default router;
import express from 'express';
import {
  createEstudio,
  getAll,
  getEstudioById,
  updateEstudio,
  deleteEstudio
} from '../controllers/estudios';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/', withErrorHandling(createEstudio));
router.get('/', withErrorHandling(getAll))
      .get('/:id', withErrorHandling(getEstudioById));
router.put('/:id', withErrorHandling(updateEstudio));
router.delete('/:id', withErrorHandling(deleteEstudio));
export default router;
import express from 'express';
import {
  createCarrera,
  getAll,
  getCarreraById,
  updateCarreraById,
  deleteCarreraById
} from '../controllers/carreras';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/', withErrorHandling(createCarrera));
router.get('/', withErrorHandling(getAll))
      .get('/:id', withErrorHandling(getCarreraById));
router.put('/:id', withErrorHandling(updateCarreraById));
router.delete('/:id', withErrorHandling(deleteCarreraById));

export default router;
import express from 'express';
import {
  getAll,
  getById,
  updateByIdController,
  deleteById,
  createdEstado 
} from '../controllers/estados.js';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/', withErrorHandling(createdEstado));
router.get('/', withErrorHandling(getAll))
      .get('/:id', withErrorHandling(getById));
router.put('/', withErrorHandling(updateByIdController));
router.delete('/:id', withErrorHandling(deleteById));


export default router;

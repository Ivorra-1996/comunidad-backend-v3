import express from 'express';
import {
  createIdioma,
  getAll,
  getIdiomaById,
  updateIdiomaById,
  deleteIdiomaById
} from '../controllers/idiomas';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/', withErrorHandling(createIdioma));
router.get('/', withErrorHandling(getAll))
      .get('/:id', withErrorHandling(getIdiomaById));
router.put('/:id', withErrorHandling(updateIdiomaById));
router.delete('/:id', withErrorHandling(deleteIdiomaById));

export default router;
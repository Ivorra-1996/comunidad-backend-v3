import express from 'express';
import {
  createNivelIdioma,
  getAll,
  getNivelIdiomaById,
  updateNivelIdioma,
  deleteNivelIdioma
} from '../controllers/nivelesIdiomas';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/', withErrorHandling(createNivelIdioma));
router.get('/', withErrorHandling(getAll))
      .get("/:id", withErrorHandling(getNivelIdiomaById));
router.put('/:id', withErrorHandling(updateNivelIdioma));
router.delete('/:id', withErrorHandling(deleteNivelIdioma));

export default router;
import express from 'express';
import {
  createCiudad,
  getAll,
  getCiudadById,
  updateCiudadById,
  deleteCiudadById
} from '../controllers/ciudades';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/', withErrorHandling(createCiudad));
router.get('/', withErrorHandling(getAll))
      .get('/:id', withErrorHandling(getCiudadById));
router.put('/:id', withErrorHandling(updateCiudadById));
router.delete('/:id', withErrorHandling(deleteCiudadById));


export default router;
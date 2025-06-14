import express from 'express';
import {
  createJornada,
  getAll,
  getJornadaById,
  updateJornada,
  deleteJornada
} from '../controllers/jornadas';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/', withErrorHandling(createJornada));
router.get('/', withErrorHandling(getAll))
      .get('/:id', withErrorHandling(getJornadaById));
router.put('/:id', withErrorHandling(updateJornada));
router.delete('/:id', withErrorHandling(deleteJornada));

export default router;
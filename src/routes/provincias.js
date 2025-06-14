import express from 'express';
import {
  getConFiltros,
  getProvinciaById
} from '../controllers/provincias';
import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/', withErrorHandling(getConFiltros))
      .get('/:id', withErrorHandling(getProvinciaById));

export default router;
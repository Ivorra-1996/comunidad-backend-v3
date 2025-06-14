import express from 'express';
import {
  getOfertasPorFiltros,
  getIdOferta,
  getOfertasPorIdEmpresa,
  createOferta,
  deleteOferta,
  updateOfertas,
  getOfertas
} from '../controllers/ofertas';
import { withErrorHandling } from './utils';

const router = express.Router();

// Obtener todas las ofertas
router.get('/all/', withErrorHandling(getOfertas));
// Obtener una oferta por ID
router.get('/:id', withErrorHandling(getIdOferta));
// Obtener ofertas filtradas
router.get('/', withErrorHandling(getOfertasPorFiltros));
// Obtener ofertas por ID de empresa
router.get('/cuit/:id', withErrorHandling(getOfertasPorIdEmpresa));
// Crear una nueva oferta
router.post('/', withErrorHandling(createOferta));
// Actualizar una oferta por ID
router.put('/idOferta/:id', withErrorHandling(updateOfertas));
// Eliminar una oferta por ID
router.delete('/idOferta/:id', withErrorHandling(deleteOferta));

export default router;
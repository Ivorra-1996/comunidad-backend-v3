import express from 'express';
import {
  getConFiltros,
  getPorId,
  getPorIdUsuario,
  deleteEmpresa,
  postEmpresa,
  updateEmpresa,
  getEmpresas,
  patchEmpresa

} from '../controllers/empresas';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/', withErrorHandling(postEmpresa));
router.get('/', withErrorHandling(getConFiltros))
      .get('/all/', withErrorHandling(getEmpresas))
      .get('/cuit/:id', withErrorHandling(getPorId))
      .get('/idUsuario/:id', withErrorHandling(getPorIdUsuario));
router.put('/cuit/:id', withErrorHandling(updateEmpresa));
router.patch('/cuit/:id', withErrorHandling(patchEmpresa));
router.delete('/cuit/:id', withErrorHandling(deleteEmpresa));

export default router;
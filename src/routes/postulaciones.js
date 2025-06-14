import express from 'express';
import {
  postPostulaciones,
  getConFiltros,
  getPorIdOferta,
  getPorIdPostulante,
  getPorId,
  deletePostulacion,
  updatePostulaciones,
  activarPostulante,
  getPorIdOfertaTodas,
  marcarContactado
} from '../controllers/postulaciones';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/', withErrorHandling(postPostulaciones));
router.get('/todas/', withErrorHandling(getConFiltros))
      .get('/:id', withErrorHandling(getPorId))
      .get('/oferta/:id', withErrorHandling(getPorIdOferta))
      .get('/postulante/:id', withErrorHandling(getPorIdPostulante));
router.get('/ofertatodas/:id', withErrorHandling(getPorIdOfertaTodas));
router.put('/:id', withErrorHandling(updatePostulaciones));
router.put('/activar/:id', withErrorHandling(activarPostulante));
router.put('/contactado/:id', withErrorHandling(marcarContactado));
router.delete('/:id', withErrorHandling(deletePostulacion));

export default router;

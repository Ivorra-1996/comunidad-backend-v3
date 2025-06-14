import express from 'express';
import {
  getAll,
  signIn,
  signUp,
  deleteUsuario,
  updateUsuarioByMail,
  getUserId,
  updateUsuariobyId
} from '../controllers/usuarios';
import { withErrorHandling } from './utils';

const router = express.Router();

// Existe un bug, si vos usas el metodo put y le cambias a un usuario email por uno que ya esta en la base y queda duplicado...
// Eso es malisimo.

router.post('/signin', withErrorHandling(signIn))
      .post('/signup', withErrorHandling(signUp));
router.get('/', withErrorHandling(getAll))
      .get('/:id', withErrorHandling(getUserId));
router.put('/:usuario', withErrorHandling(updateUsuarioByMail));
router.delete('/:id', withErrorHandling(deleteUsuario));

export default router;
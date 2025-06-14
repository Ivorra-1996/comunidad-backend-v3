import express from 'express';
import{
    createAptitudOferta,
    getAll,
    getIdOferta,
    updateAptitudOferta,
    deleteAptitudIdOferta,
    deleteAptitudId
} from "../controllers/aptitudesOfertas.js";
import { withErrorHandling } from './utils';

const router = express.Router();

router.post("/", withErrorHandling(createAptitudOferta));
router.get("/", withErrorHandling(getAll))
      .get("/:id", withErrorHandling(getIdOferta));
router.put("/:id", withErrorHandling(updateAptitudOferta));
router.delete("/:id", withErrorHandling(deleteAptitudId))
      .delete("/oferta/:id", withErrorHandling(deleteAptitudIdOferta));//Borra todas las aptitudes con el if Oferta.

export default router;
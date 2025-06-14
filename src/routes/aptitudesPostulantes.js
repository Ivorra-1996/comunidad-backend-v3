import express from 'express';
import{
    createAptitudPostulante,
    getAll,
    getIdUsuario,
    updateAptitudPostulante,
    deleteByIdAptitudPostulante,
    deleteAptitudByIdPostulante 
} from "../controllers/aptitudesPostulantes.js";
import { withErrorHandling } from './utils';

const router = express.Router();

router.post("/", withErrorHandling(createAptitudPostulante));
router.get("/", withErrorHandling(getAll))
      .get("/:id", withErrorHandling(getIdUsuario));
router.put("/:id", withErrorHandling(updateAptitudPostulante));
router.delete("/:id", withErrorHandling(deleteByIdAptitudPostulante))
      .delete("/dni/:id", withErrorHandling(deleteAptitudByIdPostulante));

export default router;
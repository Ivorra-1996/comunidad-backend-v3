import express from 'express';
import{
    createAbm,
    getAll,
    getAbmById,
    updateAbm,
    deleteAbm
} from "../controllers/abmModels.js";
import { withErrorHandling } from './utils.js';

const router = express.Router();

router.post("/", withErrorHandling(createAbm));
router.get("/", withErrorHandling(getAll))
      .get("/:id", withErrorHandling(getAbmById));
router.put("/:id", withErrorHandling(updateAbm));
router.delete("/:id", withErrorHandling(deleteAbm));

export default router;
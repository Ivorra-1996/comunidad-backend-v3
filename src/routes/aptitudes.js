import express from 'express';
import{
    createAptitud,
    getAll,
    getAptitud,
    updateAptitud,
    deleteAptitud
} from "../controllers/aptitudes.js";
import { withErrorHandling } from './utils';

const router = express.Router();

router.post("/", withErrorHandling(createAptitud));
router.get("/", withErrorHandling(getAll))
      .get("/:id", withErrorHandling(getAptitud));
router.put("/:id", withErrorHandling(updateAptitud));
router.delete("/:id", withErrorHandling(deleteAptitud));

export default router;
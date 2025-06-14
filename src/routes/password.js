import express from 'express';
import{
    resetPasswordRequestController,
    resetPasswordController,
} from "../controllers/auth.controller";

import { withErrorHandling } from './utils';

const router = express.Router();

router.post("/auth/requestResetPassword", withErrorHandling(resetPasswordRequestController))
      .post("/auth/resetPassword", withErrorHandling(resetPasswordController));
  
export default router;
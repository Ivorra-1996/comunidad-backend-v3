const {
    requestPasswordReset,
    resetPassword,
  } = require("../services/auth.service");
  
export const resetPasswordRequestController = async (req, res) => {
    const requestPasswordResetService = await requestPasswordReset(req.body.usuario,res);
    return res.json(requestPasswordResetService);
};
  
export const resetPasswordController = async (req, res) => {
    const resetPasswordService = await resetPassword(
      req.body.userId,
      req.body.token,
      req.body.password,
      res
    );
    return res.json(resetPasswordService);
};
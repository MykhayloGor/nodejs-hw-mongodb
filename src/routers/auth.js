import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserController,
  registerUserController,
  refreshSessionController,
  logoutUserController,
  sendResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

import { registerUserSchema, loginUserSchema } from '../validation/auth.js';

import {
  sendResetPasswordEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';


const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/auth/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/auth/logout', ctrlWrapper(logoutUserController));

authRouter.post('/auth/refresh', ctrlWrapper(refreshSessionController));

authRouter.post(
  '/auth/send-reset-email',
  validateBody(sendResetPasswordEmailSchema),
  ctrlWrapper(sendResetPasswordEmailController),
);

authRouter.post(
  '/auth/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;

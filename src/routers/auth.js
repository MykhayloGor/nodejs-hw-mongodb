import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { validateBody } from '../middlewares/validateBody';
import {
  loginUserController,
    registerUserController,
    refreshSessionController,
  logoutUserController
} from '../controllers/auth.js';

import { registerUserSchema } from '../validation/auth.js';
import { loginUserSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post(
  '/auth/login',
  validateBody(loginUserSchema),
  loginUserController,
);
authRouter.post('/auth/logout', logoutUserController);
authRouter.post('/auth/refresh-session', refreshSessionController);

export default authRouter;

import {
  loginUser,
  registerUser,
  refreshSession,
  logoutUser,
//   sendResetPasswordEmail,
    resetPassword,
} from '../services/auth.js';

import { createJwtToken } from '../utils/jwt.js';  // ← Add this
import { getEnvVar } from '../utils/getEnvVar.js';  // ← Add this
import { User } from '../db/models/user.js';       // ← Add this
import createHttpError from 'http-errors';         // ← Should exist

const setupSessionCookies = (session, res) => {
  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSessionCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionToken, sessionId } = req.cookies;

  await logoutUser(sessionId, sessionToken);

  res.clearCookie('sessionToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const refreshSessionController = async (req, res) => {
  const { sessionToken, sessionId } = req.cookies;

  const session = await refreshSession(sessionId, sessionToken);

  setupSessionCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// export const sendResetPasswordEmailController = async (req, res) => {
//   const { email } = req.body;

//   await sendResetPasswordEmail(email);

//   res.json({
//     status: 200,
//     message: 'Reset password email has been successfully sent.',
//     data: {},
//   });
// };

export const resetPasswordController = async (req, res) => {
  const { token, password } = req.body;

  await resetPassword(token, password);

  res.json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};


export const sendResetPasswordEmailController = async (req, res) => {
    const { email } = req.body;
  
    // TEST MODE - return token instead of sending email
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, 'User not found!');
    }
  
    const resetToken = createJwtToken({ email });
    const appDomain = getEnvVar('APP_DOMAIN');
    const resetLink = `${appDomain}/reset-password?token=${resetToken}`;
  
    res.json({
      status: 200,
      message: 'Reset token generated successfully (TEST MODE)',
      data: {
        resetToken,
        resetLink,
        email
      },
    });
  };
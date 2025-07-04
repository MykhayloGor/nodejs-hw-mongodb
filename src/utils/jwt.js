import jwt from 'jsonwebtoken';
import { getEnvVar } from './getEnvVar.js';

export const createJwtToken = (payload) => {
  const secret = getEnvVar('JWT_SECRET');
  return jwt.sign(payload, secret, { expiresIn: '5m' });
};

export const verifyJwtToken = (token) => {
  const secret = getEnvVar('JWT_SECRET');
  return jwt.verify(token, secret);
};
import { randomUUID } from 'node:crypto';

export const requestId = (req, res, next) => {
  req.id = randomUUID();
  next();
};
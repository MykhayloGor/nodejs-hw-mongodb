import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';

import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const startServer = () => {
  const app = express();

  app.set('json spaces', 2);

  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Use the contacts router
  app.use(contactsRouter);

  // 404 handler middleware
  app.use(notFoundHandler);

  // Error handler middleware
  app.use(errorHandler);

  const PORT = getEnvVar('PORT', 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
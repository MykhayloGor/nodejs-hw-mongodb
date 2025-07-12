import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestId } from './middlewares/requestId.js';
import { ENV_VARS } from './constants/envVars.js';
import { PERMANENT_UPLOAD_DIR } from './constants/paths.js';
import { setupSwagger } from './middlewares/swagger.js';

export const startServer = () => {
  const app = express();

  app.set('json spaces', 2);

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(requestId);

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('/api-docs', setupSwagger());

  app.use('/uploads', express.static(PERMANENT_UPLOAD_DIR));

  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

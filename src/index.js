import { initMongoConnection } from './db/models/initMongoConnection.js';
import { startServer } from './server.js';

await initMongoConnection();
startServer();

import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  const user = getEnvVar('MONGODB_USER');
  const password = getEnvVar('MONGODB_PASSWORD');
  const host = getEnvVar('MONGODB_URL');
  const db = getEnvVar('MONGODB_DB');
  const uri = `mongodb+srv://${user}:${password}@${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(uri);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

import createHttpError from 'http-errors';
import { getEnvVar } from './getEnvVar.js';
import { saveToCloudinary } from './saveToCloudinary.js';
import { saveFileToLocal } from './saveToLocal.js';

export const saveFile = async (file) => {
  if (getEnvVar('FILE_SAVING_STRATEGY') === 'cloudinary') {
    return await saveToCloudinary(file);
  } else if (getEnvVar('FILE_SAVING_STRATEGY') === 'local') {
    return await saveFileToLocal(file);
  }
  throw createHttpError(500, 'Unknown file storage policy');
};
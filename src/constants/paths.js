import path from 'node:path';
import os from 'node:os';

export const TEMPLATE_DIR = path.join(process.cwd(), 'templates');
export const TEMP_UPLOAD_DIR = os.tmpdir();
export const PERMANENT_UPLOAD_DIR = path.join(process.cwd(), 'uploads');

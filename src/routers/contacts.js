import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactByIdController,
} from '../controllers/contacts.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { validateBody } from '../middlewares/validateBody.js';

import { isValidId } from '../middlewares/isValid.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate';
import { upload } from '../middlewares/upload.js';

const contactsRouter = Router();

contactsRouter.use('/contacts', authenticate);

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/contacts',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/contacts/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);

export default contactsRouter;

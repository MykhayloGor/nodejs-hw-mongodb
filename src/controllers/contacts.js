import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContactById,
  uploadContactPhoto,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import {
  parseSortParams,
  parseFilterParams,
} from '../utils/parseContactsParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const userId = req.user._id;
  let contact = await createContact({
    ...req.body,
    userId,
  });
  if (req.file) {
    contact = await uploadContactPhoto(contact._id, userId, req.file);
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  let result = await updateContact(contactId, req.body, userId);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  if (req.file) {
    result = await uploadContactPhoto(contactId, userId, req.file);
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await deleteContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

export const uploadContactPhotoController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const file = req.file;

  const contact = await uploadContactPhoto(contactId, userId, file);

  res.json({
    status: 200,
    message: 'Contact photo uploaded successfully!',
    data: contact,
  });
};

import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const [contacts, totalItems] = await Promise.all([
    Contact.find(filter).skip(skip).limit(limit).sort(sortOptions),
    Contact.countDocuments(filter),
  ]);

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      runValidators: true,
      ...options,
    },
  );

  return result;
};

export const deleteContactById = async (contactId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
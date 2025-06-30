import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  console.log('=== DEBUG INFO ===');
  console.log('userId received:', userId);
  console.log('userId type:', typeof userId);
  console.log('filter received:', filter);

  const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const searchFilter = { 
    ...filter, 
    userId: userId
  };

  console.log('searchFilter built:', searchFilter);

  const [contacts, totalItems] = await Promise.all([
    Contact.find(searchFilter).skip(skip).limit(limit).sort(sortOptions),
    Contact.countDocuments(searchFilter),
  ]);

  console.log('Query returned', contacts.length, 'contacts');
  console.log('First contact userId:', contacts[0]?.userId);
  console.log('==================');

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      runValidators: true,
      ...options,
    },
  );

  return result;
};

export const deleteContactById = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};

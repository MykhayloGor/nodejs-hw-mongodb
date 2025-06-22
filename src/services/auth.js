import { User } from '../db/models/user.js';

export const registerUser = async (payload) => {
  return await User.create(payload);
};

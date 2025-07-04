import { model, Schema, Types } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    photo: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Contact = model('contact', contactSchema);

import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, email: true, unique: true, required: true,  },
    password: { type: String, required: true },
    createdAt: {},
    updatedAt: {},
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


userSchema.methods.toJSON = function () {
    const user = this.toObject();
  
    delete user.password;
  
    return user;
  };

export const User = model('user', userSchema);

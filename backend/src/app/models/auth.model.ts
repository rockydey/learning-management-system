/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TRegisterUser } from '../types/auth.type';
import bcrypt from 'bcrypt';
import config from '../config';

const registerUserSchema = new Schema<TRegisterUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      trim: true,
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      trim: true,
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    profileImg: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

registerUserSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

registerUserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TRegisterUser>('User', registerUserSchema);

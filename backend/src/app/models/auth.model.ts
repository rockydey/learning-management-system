/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TRegisterUser, UserModel } from '../types/auth.type';
import bcrypt from 'bcrypt';
import config from '../config';

const registerUserSchema = new Schema<TRegisterUser, UserModel>(
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
    purchaseCourse: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
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

registerUserSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

registerUserSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TRegisterUser, UserModel>('User', registerUserSchema);

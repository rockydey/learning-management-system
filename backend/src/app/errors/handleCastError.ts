import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../types/error.types';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Id or format.',
    errorSources,
  };
};

export default handleCastError;

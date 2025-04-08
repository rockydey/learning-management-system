import { Types } from 'mongoose';

export type TLecture = {
  title: string;
  videoURL: string;
  pdfLinks?: string[];
  locked?: boolean;
};

export type TModule = {
  title: string;
  moduleNumber: number;
  course: Types.ObjectId;
  lectures: TLecture[];
};

import mongoose from 'mongoose';

import './config.js';

const mongoUrl = process.env.MONGO_URI as string;

export const connectMongo = async (): Promise<void> => {
  if (!mongoUrl) {
    throw new Error('MONGO_URI is required');
  }

  await mongoose.connect(mongoUrl);
  console.log('Connected to MongoDB');
};


export default mongoose;

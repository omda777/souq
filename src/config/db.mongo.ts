import mongoose from 'mongoose';

import './config.js';

const mongoUrl = process.env.MONGO_URI as string;

export const connectMongo = async() => {
    await mongoose.connect(mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });
};

export { mongoose };
export default connectMongo;
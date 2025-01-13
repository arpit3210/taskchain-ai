import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
};

export default connectDB;
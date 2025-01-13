import mongoose from 'mongoose';

// Use import.meta.env for Vite environment variables
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb+srv://arpitsinghthakur321:064EkDhktztpzvzs@cluster0.jnsifwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGODB_URI) {
  throw new Error('Please define the VITE_MONGODB_URI environment variable inside .env.local');
}

interface CachedMongoose {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  var mongoose: CachedMongoose;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongoDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(m => m.connection);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default connectMongoDB;
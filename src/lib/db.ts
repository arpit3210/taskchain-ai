// import * as mongoose from 'mongoose';

// const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || import.meta.env.MONGODB_URI;

// // Singleton pattern to ensure only one connection
// class DatabaseConnection {
//   private static instance: DatabaseConnection;
//   private connection: mongoose.Connection | null = null;

//   private constructor() {}

//   public static getInstance(): DatabaseConnection {
//     if (!DatabaseConnection.instance) {
//       DatabaseConnection.instance = new DatabaseConnection();
//     }
//     return DatabaseConnection.instance;
//   }

//   public async connect(): Promise<boolean> {
//     if (!MONGODB_URI) {
//       console.error('❌ MongoDB URI is not defined');
//       return false;
//     }

//     try {
//       // Check if already connected
//       if (this.connection && this.connection.readyState === 1) {
//         console.log('Already connected to MongoDB');
//         return true;
//       }

//       // Connect to MongoDB
//       const conn = await mongoose.connect(MONGODB_URI, {
//         serverSelectionTimeoutMS: 5000,
//         socketTimeoutMS: 45000,
//       });

//       this.connection = conn.connection;

//       // Setup connection event listeners
//       this.connection.on('connected', () => {
//         console.log('Mongoose connected to DB');
//       });

//       this.connection.on('error', (err) => {
//         console.error('Mongoose connection error:', err);
//       });

//       this.connection.on('disconnected', () => {
//         console.log('Mongoose disconnected');
//       });

//       return true;
//     } catch (error) {
//       console.error('❌ MongoDB Connection Failed:', error);
//       return false;
//     }
//   }

//   public getConnection(): mongoose.Connection | null {
//     return this.connection;
//   }
// }

// export const connectDB = async (): Promise<boolean> => {
//   const dbConnection = DatabaseConnection.getInstance();
//   return await dbConnection.connect();
// };
import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    // Prepare for change/deprecation in Mongoose 7
    mongoose.set('strictQuery', false);

    // Connect to MongoDB
    const connection = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`MONGODB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

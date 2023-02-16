import mongoose, { Document } from 'mongoose';

// create a schema
interface User extends Document {
    name: string;
    email: string;
    password: string;
  }
  
  const userSchema = new mongoose.Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  // create a model
  const User = mongoose.model<User>('User', userSchema);
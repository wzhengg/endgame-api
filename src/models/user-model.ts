import { Schema, Types, model } from 'mongoose';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  cart: { product: Types.ObjectId; quantity: number }[];
}

const userSchema = new Schema<User>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default model<User>('User', userSchema);

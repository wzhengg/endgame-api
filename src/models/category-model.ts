import { Schema, model } from 'mongoose';

interface Category {
  name: string;
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true },
});

export default model<Category>('Category', categorySchema);

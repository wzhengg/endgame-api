import { Schema, Types, model } from 'mongoose';

interface Product {
  name: string;
  price: number;
  category: Types.ObjectId;
  images: string[];
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  images: [String],
});

export default model<Product>('Product', productSchema);

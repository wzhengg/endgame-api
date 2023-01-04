import express from 'express';

import connectDB from './config/db';
import { errorHandler } from './middleware/error-middleware';

import categoryRoutes from './routes/category-routes';
import productRoutes from './routes/product-routes';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use(errorHandler);

export default app;

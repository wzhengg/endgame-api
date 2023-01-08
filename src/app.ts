import express from 'express';
import cors from 'cors';

import connectDB from './config/db';
import { errorHandler } from './middleware/error-middleware';

import categoryRoutes from './routes/category-routes';
import productRoutes from './routes/product-routes';
import userRoutes from './routes/user-routes';

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;

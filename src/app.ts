import express from 'express';

import connectDB from './config/db';
import { errorHandler } from './middleware/error-middleware';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('hi'));

app.use(errorHandler);

export default app;

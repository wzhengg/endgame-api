import express from 'express';
import connectDB from './config/db';

connectDB();

const app = express();

app.get('/', (req, res) => res.send('hi'));

export default app;

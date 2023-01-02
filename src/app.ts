import express from 'express';
import connectDB from './config/db';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('hi'));

export default app;

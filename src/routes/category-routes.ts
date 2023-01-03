import express from 'express';
import { getCategories } from '../controllers/category-controller';

const router = express.Router();

// GET request for all categories
router.get('/', getCategories);

export default router;

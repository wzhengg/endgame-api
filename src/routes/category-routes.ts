import express from 'express';
import { body } from 'express-validator';
import {
  createCategory,
  getCategories,
} from '../controllers/category-controller';

const router = express.Router();

// GET request for all categories
router.get('/', getCategories);

// POST request for creating a category
router.post('/', [
  body('name', 'Category name is required').trim().notEmpty().escape(),
  createCategory,
]);

export default router;

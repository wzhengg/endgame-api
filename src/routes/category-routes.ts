import express from 'express';
import { body, param } from 'express-validator';
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/category-controller';

const router = express.Router();

// GET request for all categories
router.get('/', getCategories);

// POST request for creating a category
router.post(
  '/',
  body('name', 'Category name is required').trim().notEmpty().escape(),
  createCategory
);

// GET request for a specific category
router.get('/:id', param('id').exists().isMongoId(), getCategory);

// PUT request for updating a category
router.put(
  '/:id',
  param('id').exists().isMongoId(),
  body('name', 'Category name is required').trim().notEmpty().escape(),
  updateCategory
);

export default router;

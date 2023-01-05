import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validation-middleware';
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category-controller';

const router = express.Router();

// GET request for all categories
router.get('/', getCategories);

// POST request for creating a category
router.post(
  '/',
  body('name', 'Category name is required').trim().notEmpty().escape(),
  validateRequest,
  createCategory
);

// GET request for a specific category
router.get(
  '/:id',
  param('id').exists().isMongoId(),
  validateRequest,
  getCategory
);

// PUT request for updating a category
router.put(
  '/:id',
  param('id').exists().isMongoId(),
  body('name', 'Category name is required').trim().notEmpty().escape(),
  validateRequest,
  updateCategory
);

// DELETE request for deleting a category
router.delete(
  '/:id',
  param('id').exists().isMongoId(),
  validateRequest,
  deleteCategory
);

export default router;

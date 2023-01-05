import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validation-middleware';
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product-controller';

const router = express.Router();

// GET request for all products
router.get('/', getProducts);

// POST request for creating a product
router.post(
  '/',
  body('name', 'Product name is required').trim().notEmpty().escape(),
  body('price')
    .trim()
    .notEmpty()
    .withMessage('Product price is required')
    .isCurrency()
    .withMessage('Product price must be valid')
    .escape(),
  body('category').notEmpty().isMongoId(),
  body('images').trim().notEmpty().isURL().escape(),
  validateRequest,
  createProduct
);

// GET request for a specific product
router.get(
  '/:id',
  param('id').exists().isMongoId(),
  validateRequest,
  getProduct
);

// PUT request for updating a product
router.put(
  '/:id',
  param('id').exists().isMongoId(),
  body('name', 'Product name is required').trim().notEmpty().escape(),
  body('price')
    .trim()
    .notEmpty()
    .withMessage('Product price is required')
    .isCurrency()
    .withMessage('Product price must be valid')
    .escape(),
  body('category').notEmpty().isMongoId(),
  body('images').trim().notEmpty().isURL().escape(),
  validateRequest,
  updateProduct
);

// DELETE request for deleting a product
router.delete(
  '/:id',
  param('id').exists().isMongoId(),
  validateRequest,
  deleteProduct
);

export default router;

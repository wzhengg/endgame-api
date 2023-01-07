import express from 'express';
import { validateRequest } from '../middleware/validation-middleware';
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  paramValidation,
  bodyValidation,
} from '../controllers/product-controller';

const router = express.Router();

// GET request for all products
router.get('/', getProducts);

// POST request for creating a product
router.post('/', bodyValidation(), validateRequest, createProduct);

// GET request for a specific product
router.get('/:id', paramValidation(), validateRequest, getProduct);

// PUT request for updating a product
router.put(
  '/:id',
  paramValidation(),
  bodyValidation(),
  validateRequest,
  updateProduct
);

// DELETE request for deleting a product
router.delete('/:id', paramValidation(), validateRequest, deleteProduct);

export default router;

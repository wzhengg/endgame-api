import express from 'express';
import { getProducts } from '../controllers/product-controller';

const router = express.Router();

// GET request for all products
router.get('/', getProducts);

export default router;

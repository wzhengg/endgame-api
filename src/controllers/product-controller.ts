import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Product from '../models/product-model';
import Category from '../models/category-model';

async function getProducts(req: Request, res: Response) {
  const products = await Product.find();
  res.json(products);
}

async function createProduct(req: Request, res: Response) {
  // Find validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Find category with provided id
  const category = await Category.findById(req.body.category);

  // Send 404 response if category with provided id doesn't exist
  if (!category) {
    res.status(404);
    throw new Error(`Could not find category with id '${req.body.category}'`);
  }

  // Create product
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    images: [req.body.images],
  });

  res.json(product);
}

async function getProduct(req: Request, res: Response) {
  // Find validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  // Find product with provided id
  const product = await Product.findById(id);

  // Send 404 response if product with provided id doesn't exist
  if (!product) {
    res.status(404);
    throw new Error(`Could not find product with id '${id}'`);
  }

  res.json(product);
}

export { getProducts, createProduct, getProduct };
